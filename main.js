// Injected into the MagicMirror page by TizenBrew (after load).
// The page is served through mm-legacy-proxy (transpiled for the TV's Tizen 5.0 engine).
(function () {
  var st = document.createElement('style');
  st.textContent = '* { cursor: none !important; }';
  (document.head || document.documentElement).appendChild(st);
  // Hard reload every 6 h clears any stale state (MagicMirror reconnects its socket by itself).
  setTimeout(function () { location.reload(); }, 6 * 60 * 60 * 1000);
})();
