// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'restaurant-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.


// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll([
  '../', // Alias for index.html
  '../index.html',
  '../restaurant.html',
  '../css/styles.css',
  '../css/responsive.css',
  '../js/main.js',
  '../js/dbhelper.js',
  '../js/restaurant_info.js',
  '../data/restaurants.json',
  '../img/1.jpg',
  '../img/2.jpg',
  '../img/3.jpg',
  '../img/4.jpg',
  '../img/5.jpg',
  '../img/6.jpg',
  '../img/7.jpg',
  '../img/8.jpg',
  '../img/9.jpg',
  '../img/10.jpg'

]))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !PRECACHE.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
      })
    );
  }
});