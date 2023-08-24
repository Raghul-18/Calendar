const CACHE_NAME = "calendar-app-cache";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "https://unpkg.com/dayjs@1.8.21/dayjs.min.js",
  // Add other URLs you want to cache here
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
