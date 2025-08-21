const CACHE_NAME = "my-site-cache-v1";

// Files to cache (add all your important assets here)
const urlsToCache = [
  "/",                // Root
  "/index.html",
  "/FAQ.html",
  "/reels.html",
  "/booking.html",
  "/gallary.html",

  // CSS files
  "/index.css",
  "/faq.css",
  "/reels.css",
  "/gallary.css",

  // JS files
  "/index-script.js",
  "/faqScript.js",
  "/reelscript.js",
  "/book-script.js",
  "/set-min-date.js",
  "/security.js",

  // Icons (PWA manifest)
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png"
  "/icons/favicon-16x16.png"
 "/icons/favicon-32x32.png"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch from cache first, then fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update cache when service worker is activated
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
