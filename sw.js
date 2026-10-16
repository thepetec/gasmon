// Offline support.
// The page itself: fetched fresh when there's signal (3 s limit), otherwise served from the phone.
// Other files: served from the phone, refreshed in the background.
// To release an update: change CACHE here AND APP_VERSION in index.html.
const CACHE = "gasfield-2.3";
const ASSETS = ["./", "./index.html", "./xlsx.full.min.js", "./firebase.js", "./jszip.min.js", "./ggt012.js", "./GGT012.xltx", "./manifest.webmanifest",
                "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  // cache: "reload" skips the browser's own HTTP cache so a new version never stores old files.
  e.waitUntil(caches.open(CACHE).then(cache => Promise.all(ASSETS.map(url =>
    fetch(new Request(url, { cache: "reload" })).then(res => {
      if (!res.ok) throw new Error("Failed to cache " + url);
      return cache.put(url, res);
    })
  ))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
}

async function pageNetworkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await withTimeout(fetch(req.url, { cache: "no-cache", credentials: "same-origin" }), 3000);
    if (res && res.ok) { await cache.put("./index.html", res.clone()); return res; }
  } catch (err) { /* no signal or too slow: use the saved copy */ }
  return (await cache.match("./index.html")) ||
    new Response("Offline and not saved on this phone yet. Open once with signal.",
                 { status: 503, headers: { "Content-Type": "text/plain" } });
}

async function assetStaleWhileRevalidate(e, req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req, { ignoreSearch: true });
  const fresh = fetch(req.url, { cache: "no-cache" })
    .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
    .catch(() => null);
  if (cached) { e.waitUntil(fresh); return cached; }
  return (await fresh) || new Response("", { status: 504 });
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") e.respondWith(pageNetworkFirst(req));
  else e.respondWith(assetStaleWhileRevalidate(e, req));
});
