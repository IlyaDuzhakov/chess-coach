
const CACHE_NAME = 'chess-coach-v1';

const FILES_TO_CACHE = [
 '/',
  '/index.html',
  '/style.css',
  '/media.css',
  '/animations.css',
  '/manifest.json',
  '/offline.html',
  '/svg/knight_preloader.svg',
  '/favicon-96.png',
  '/preloader/preloader.css',      
  '/images/icon-192.png',
  '/images/desert-2.webp',
  '/images/chess-bg.svg',
  '/images/icon-512.png',
  '/svg/faqs-icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Кэшируем оффлайн-страницу');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // активировать сразу
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Удаляем старый кэш', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // сразу применить
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    // для страниц
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
  } else {
    // для картинок, стилей и т.д.
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
