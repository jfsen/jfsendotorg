const CACHE_NAME = "jfsen-v2";

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/favicon/favicon.svg",
  "/favicon/favicon.ico",
  "/favicon/apple-touch-icon.png",
  "/favicon/android-chrome-192x192.png",
  "/favicon/android-chrome-512x512.png",
  "/images/foto.jpg",
  "/images/og-image.png",
  "/images/Wince.jpeg",
  "/images/Python-exercises.jpeg",
  "/images/rpi.jpg",
  "/images/streamline.png",
  "/images/nextcloud.png",
  "/images/notfallplan.svg",
  "/images/quilt.svg",
  "/images/excel-uebungen.jpeg",
];

// Install: pre-cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      ),
  );
  self.clients.claim();
});

// Fetch: cache-first, network fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => cached || fetch(event.request)),
  );
});
