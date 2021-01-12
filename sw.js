const APP_PREFIX = "pwa_clock";
const VERSION = "v01";
const CACHE_NAME = APP_PREFIX + "_" + VERSION;
const URLS = ["/pwa-clock/", "/pwa-clock/index.html"];

self.addEventListener("fetch", function (e) {
  console.log("fetch request : " + e.request.url);
  e.respondWith(
    caches.match(e.request).then((request) => request || fetch(e.request))
  );
});

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS)));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then((keyList) => {
      const cacheWhitelist = keyList.filter((key) => key.indexOf(APP_PREFIX));
      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(
        keyList.map((key, i) => {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
