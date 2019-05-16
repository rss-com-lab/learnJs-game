self.addEventListener('install', event => {
  console.log('Установлен');
});

self.addEventListener('activate', event => {
  console.log('Активирован');
});

self.addEventListener('fetch', event => {
  console.log('Происходит запрос на сервер');
});

const CACHE = 'offline-fallback-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(cache => cache.addAll(['/img/background']))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(networkOrCache(event.request).catch(() => useFallback()));
});

function networkOrCache(request) {
  return fetch(request)
    .then(response => (response.ok ? response : fromCache(request)))
    .catch(() => fromCache(request));
}

// Наш Fallback
const FALLBACK =
  '<div style="text-align: center;">\n' +
  '    <h1>Learn JS</h1>\n' +
  '    <h2>You are offline</h2>\n' +
  '</div>';

function useFallback() {
  return Promise.resolve(
    new Response(FALLBACK, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    }),
  );
}

function fromCache(request) {
  return caches
    .open(CACHE)
    .then(cache =>
      cache
        .match(request)
        .then(matching => matching || Promise.reject('no-match')),
    );
}
