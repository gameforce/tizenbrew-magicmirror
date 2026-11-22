// Injected into the MagicMirror page by TizenBrew (evaluateScriptOnDocumentStart).
// 1.0.1: diagnostic overlay. Shows the engine version and any JS errors as text on screen,
// because the 2019 TV's web engine may be too old for MagicMirror 2.37.
(function () {
  var lines = [];
  function show() {
    var box = document.getElementById('tbmm-diag');
    if (!box && document.body) {
      box = document.createElement('pre');
      box.id = 'tbmm-diag';
      box.style.cssText = 'position:fixed;left:0;bottom:0;z-index:99999;margin:0;padding:8px;max-height:60%;overflow:hidden;' +
        'background:rgba(0,0,0,.85);color:#ff0;font:14px monospace;white-space:pre-wrap;width:100%';
      document.body.appendChild(box);
    }
    if (box) box.textContent = lines.join('\n');
  }
  function log(s) { lines.push(s); if (lines.length > 30) lines.shift(); show(); }

  log('UA: ' + navigator.userAgent);
  window.addEventListener('error', function (e) {
    var where = e.filename ? (' @ ' + e.filename.replace(location.origin, '') + ':' + e.lineno + ':' + e.colno) : '';
    log('ERROR: ' + (e.message || (e.target && (e.target.src || e.target.href)) || e) + where);
  }, true);
  window.addEventListener('unhandledrejection', function (e) { log('PROMISE: ' + (e.reason && (e.reason.stack || e.reason.message) || e.reason)); });
  document.addEventListener('DOMContentLoaded', function () {
    log('DOMContentLoaded; style.cursor hidden');
    var st = document.createElement('style'); st.textContent = '* { cursor: none !important; }'; document.head.appendChild(st);
  });
  window.addEventListener('load', function () {
    setTimeout(function () {
      var mods = document.querySelectorAll('.module');
      log('load+5s: .module elements=' + mods.length + ', visible text chars=' + (document.body.innerText || '').length +
          ', MM=' + (typeof MM) + ', Module=' + (typeof Module) + ', io=' + (typeof io));
    }, 5000);
  });
  setTimeout(function () { location.reload(); }, 6 * 60 * 60 * 1000);
})();
