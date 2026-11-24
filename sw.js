/* 스크랩북 — 앱 설치용 서비스 워커
 * - 화면(index.html 등): 네트워크 먼저, 끊겼을 때만 저장해 둔 화면.
 * - 기사·개인 기록(api.github.com, 비공개 저장소): 여기서 캐시하지 않는다.
 *   (읽은 기사는 앱이 이 기기 브라우저 저장소에만 따로 보관한다)
 */
var CACHE = "scrapbook-shell-v2";
var ASSETS = ["./", "./index.html", "./manifest.json", "./icon-v2-192.png", "./icon-v2-512.png", "./icon-v2-512-maskable.png"];
self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(ASSETS.map(function (u) { return c.add(new Request(u, { cache: "reload" })).catch(function () {}); }));
  }).catch(function () {}));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url; try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.indexOf("/scrapbook/") !== 0) return;
  e.respondWith(fetch(req, { cache: "no-store" }).then(function (res) {
    if (res && res.ok) { var c = res.clone(); caches.open(CACHE).then(function (x) { x.put(req.mode === "navigate" ? "./index.html" : req, c); }); }
    return res;
  }).catch(function () {
    return caches.match(req.mode === "navigate" ? "./index.html" : req).then(function (hit) {
      return hit || new Response("<meta charset=utf-8><p style='font:15px system-ui;padding:2rem'>인터넷에 연결되면 다시 열어 주세요.</p>", { headers: { "Content-Type": "text/html; charset=utf-8" } });
    });
  }));
});
