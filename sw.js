const CACHE_NAME = 'sinhala-moolakuru-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/lessons.html',
  '/css/styles.css',
  '/js/script.js',
  '/assets/logo.png',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 