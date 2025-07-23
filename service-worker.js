const CACHE_NAME = 'chess-coach-v2';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/media.css',
  '/animations.css',
  '/manifest.json',
  '/offline.html',
  '/multilang/intensives.json',
  '/multilang/pricing.json',
  '/multilang/translations.json',
  '/svg/knight_preloader.svg',
  '/favicon-96.png',
  '/preloader/preloader.css',
  '/images/icon-192.png',
  '/images/chess-bg.svg',
  '/images/icon-512.png'
];

// Установка SW и кэширование
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log('[SW] Кэшируем файлы');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Очистка старых кэшей
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            // console.log('[SW] Удаляем старый кэш', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    // для HTML страниц
    event.respondWith(
      fetch(event.request).catch(() => {
        // console.log('[SW] offline fallback → offline.html');
        return caches.match('/offline.html');
      })
    );
  } else {
    // для остальных запросов
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
