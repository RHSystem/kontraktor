// ZUI KONTRAKTOR service worker
// Naikkan angka versi ini setiap kali kamu mengubah file aplikasi.
const VERSION = 'zui-kontraktor-v13';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './config.js'];
// File dari luar yang aman disimpan untuk offline (Firebase, jsPDF, dan font).
const CDN = ['www.gstatic.com', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Halaman aplikasi: ambil versi terbaru dulu, pakai simpanan kalau offline.
  if (req.mode === 'navigate') {
    // Halaman klien (klien.html) selalu diambil langsung dan tidak menimpa simpanan aplikasi.
    const isApp = url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname);
    if (!isApp) return;
    e.respondWith(
      fetch(req)
        .then(res => { const cp = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', cp)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // File di domain sendiri dan pustaka CDN: pakai simpanan, perbarui di belakang.
  if (url.origin === location.origin || CDN.includes(url.hostname)) {
    e.respondWith(
      caches.open(VERSION).then(c => c.match(req).then(hit => {
        const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
  }
  // Selain itu (login dan database Firebase) dibiarkan langsung ke internet.
});

// Klik notifikasi pengingat: buka atau fokuskan aplikasi.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) if ('focus' in c) return c.focus();
      return self.clients.openWindow(url);
    })
  );
});

// Pengingat di latar belakang (HP yang mendukung periodic background sync).
// Data jatuh tempo disimpan aplikasi di cache 'zk-rem' setiap kali dibuka.
self.addEventListener('periodicsync', e => {
  if (e.tag !== 'zk-due') return;
  e.waitUntil((async () => {
    const c = await caches.open('zk-rem');
    const r = await c.match('./zk-rem.json'); if (!r) return;
    const data = await r.json();
    const d = new Date(), today = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    const last = await c.match('./zk-rem-last'); if (last && (await last.text()) === today) return;
    const items = (data.items || []).filter(x => x.d <= today); if (!items.length) return;
    const en = data.lang === 'en';
    await self.registration.showNotification('ZUI KONTRAKTOR – ' + items.length + (en ? ' items need attention' : ' hal perlu ditindaklanjuti'), {
      body: items.slice(0, 4).map(x => '• ' + x.t).join('\n'), icon: 'icon-192.png', badge: 'icon-192.png', tag: 'zk-due', data: { url: './#beranda' }
    });
    await c.put('./zk-rem-last', new Response(today));
  })());
});
