const CACHE_APP = "app-story-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/src/push.js",
  "/public/push.js",
  "/webpack.common.js",
  "/webpack.dev.js",
  "/webpack.prod.js",
  "/styles/styles.css",
  "/scripts/index.js",
  "/scripts/idb.js",
  "/scripts/config.js",
  "/scripts/utils/index.js",
  "/scripts/routes/routes.js",
  "/scripts/routes/url-parser.js",
  "/scripts/data/api.js",
  "/scripts/models/auth.models.js",
  "/scripts/models/register.models.js",
  "/scripts/models/story-models.js",
  "/scripts/pages/app.js",
  "/scripts/pages/upload/upload-page.js",
  "/scripts/pages/about/about-page.js",
  "/scripts/pages/home/home-page.js",
  "/scripts/pages/home/offline-page.js",
  "/scripts/pages/home/loginPage.js",
  "/scripts/pages/home/register-page.js",
  "/scripts/presenters/home-presenter.js",
  "/scripts/presenters/loginPresenter.js",
  "/scripts/presenters/register-presenter.js",
  "/scripts/presenters/upload-presenter.js",
  "/public/sw.js",
  "/public/manifest.json",
  "/images/logo-192x192.png",
  "/images/logo-512x512.png",
  "/images/ss-1280x800.png",
  "/images/ss-390x844.png",
];

// instal sw
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_APP)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error("error membuka cache:", error);
      })
  );
});

// aktif sw
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_APP) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch((error) => {
        console.error("error serverWorker activate:", error);
      })
  );
});

// permintaan fetch
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const isPrecachedRequest = ASSETS_TO_CACHE.includes(url.pathname);

  if (isPrecachedRequest) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((networkResponse) => {
            return caches.open(CACHE_APP).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
    );
  } else if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/offline.html"))
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});

//pemberitahuan
self.addEventListener("push", function (event) {
  const data = event.data?.json() || {};

  const title = data.title || "Dicoding Notifikasi";
  const options = data.options || {
    body: "test pemberitahuan baru!",
    icon: "/dist/images/logo.png",
    badge: "/dist/favicon.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
