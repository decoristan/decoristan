const CACHE_NAME = "my-site-cache-v2";

// Files to cache
const urlsToCache = [
  "/",                // Root
  "/index.html",
  "/FAQ.html",
  "/reels.html",
  "/booking.html",
  "/gallary.html",
  "/offline.html",    // Offline fallback page

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
  "/icons/android-chrome-512x512.png",
  "/icons/favicon-16x16.png",
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
  self.skipWaiting();
});

// Fetch with offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("/offline.html"))
      );
    })
  );
});

// Update cache on activate
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
  self.clients.claim();
});

// Background Sync Example
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    console.log("Background sync triggered!");
    event.waitUntil(syncData());
  }
});

// Dummy sync function (replace with real logic, e.g., retry form submissions)
async function syncData() {
  // Example: fetch pending requests from IndexedDB and send them to server
  console.log("Syncing data in background...");
  return Promise.resolve();
}
