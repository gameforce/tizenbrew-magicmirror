// Injected into the MagicMirror page by TizenBrew.
// Hide the pointer and reload if the page loses its server (e.g. MagicMirror restarted).
(function () {
  var style = document.createElement('style');
  style.textContent = '* { cursor: none !important; }';
  (document.head || document.documentElement).appendChild(style);

  // MagicMirror reconnects its socket itself; a hard reload every 6 h clears any stale state.
  setTimeout(function () { location.reload(); }, 6 * 60 * 60 * 1000);
})();
