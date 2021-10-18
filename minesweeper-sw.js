self.addEventListener("install", event => {
  console.log("Service Worker installing.");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS))
  );
});

self.addEventListener("activate", event => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", event => {
  // Cache-First Strategy
  event.respondWith(
    caches
      .match(event.request) // check if the request has already been cached
      .then(cached => cached || fetch(event.request)) // otherwise request network
      .then(
        response =>
          cache(event.request, response) // put response in cache
            .then(() => response) // resolve promise with the network response
      )
  );
});

function cache(request, response) {
  if (response.type === "error" || response.type === "opaque") {
    return Promise.resolve(); // do not put in cache network errors
  }

  return caches
    .open(CACHE_NAME)
    .then(cache => cache.put(request, response.clone()));
}

const CACHE_NAME = "V1"
const STATIC_CACHE_URLS = [
  "/minesweeper",
  "/script/minesweeper.js",
  "/style/minesweeper.css",
  "/img/minesweeper/bomb.webp",
  "/img/minesweeper/one.webp",
  "/img/minesweeper/two.webp",
  "/img/minesweeper/three.webp",
  "/img/minesweeper/four.webp",
  "/img/minesweeper/five.webp",
  "/img/minesweeper/six.webp",
  "/img/minesweeper/seven.webp",
  "/img/minesweeper/eight.webp"
];