const VERSION = "v1";

log("Installing Service Worker");

self.addEventListener("install", event =>
  event.waitUntil(installServiceWorker())
);

async function installServiceWorker() {
  log("Service Worker installation started ");
  const cache = await caches.open(getCacheName());
  return cache.addAll([
    "/",
    "/polyfills.js",
    "/runtime.js",
    "/styles.css",
    "/main.js",
    "/assets/bundle.css",
    "/assets/angular-pwa-course.png",
    "/assets/main-page-logo-small-hat.png"
  ]); //will fail if some of files are missed
}

self.addEventListener("activate", () => activatedSW());

self.addEventListener("fetch", event =>
  event.respondWith(cacheThenNetwork(event))
);

async function activatedSW() {
  log("Service Worker activated");
  const cacheKeys = await caches.keys();
  cacheKeys.forEach(cacheKey => {
    if (cacheKey != getCacheName()) {
      caches.delete(cacheKey);
    }
  });
  return clients.claim(); // ??
}
async function cacheThenNetwork(event) {
  const cache = await caches.open(getCacheName());

  const cachedReponse = await cache.match(event.request);
  if (cachedReponse) {
    log("From Cache: " + event.request.url);
    return cachedReponse;
  }
  const networkResponse = await fetch(event.request);
  log("Calling network: " + event.request.url);
  return networkResponse;
}

function getCacheName() {
  return "app-cache-" + VERSION;
}
function log(message, ...data) {
  if (data.length > 0) {
    console.log(VERSION, message, data);
  } else {
    console.log(VERSION, message);
  }
}
