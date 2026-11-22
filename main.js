// Injected into the MagicMirror page by TizenBrew (after load). Page is served through mm-legacy-proxy on varian.
(function () {
  // Hide the pointer.
  var st = document.createElement('style');
  st.textContent = '* { cursor: none !important; }';
  (document.head || document.documentElement).appendChild(st);

  // 1.3.0: keep the TV from pausing us. Tizen's app screensaver can pause media after a few idle minutes.
  function screensaverOff() {
    try {
      if (window.webapis && webapis.appcommon && webapis.appcommon.setScreenSaver) {
        webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
      }
    } catch (e) { /* not available in this context: the watchdog still covers it */ }
  }
  screensaverOff();
  setInterval(screensaverOff, 60 * 1000);

  // 1.3.0: video watchdog. If the background video pauses, ends without looping, or stops advancing, restart it.
  var lastT = -1, stuck = 0;
  setInterval(function () {
    var v = document.querySelector('video');
    if (!v) return;
    if (v.ended) { v.currentTime = 0; }
    if (v.paused || v.ended) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    if (!v.paused && v.currentTime === lastT) {
      stuck++;
      if (stuck >= 3) { // ~30 s without progress: reload the source at the same position
        var t = v.currentTime, src = v.currentSrc || v.src;
        v.src = src; v.load();
        v.addEventListener('loadedmetadata', function once() { v.removeEventListener('loadedmetadata', once); try { v.currentTime = t; } catch (e) {} v.play(); });
        stuck = 0;
      }
    } else { stuck = 0; }
    lastT = v.currentTime;
  }, 10 * 1000);

  // Hard reload every 6 h clears any stale state (MagicMirror reconnects its socket by itself).
  setTimeout(function () { location.reload(); }, 6 * 60 * 60 * 1000);
})();
