(function(){
  if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) return;
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(function(){});
  var KEY='lum-install-dismissed', dp=null;
  if (localStorage.getItem(KEY)) return;
  var isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
  function bar(msg, btn, fn){
    var d=document.createElement('div');
    d.dir='rtl';
    d.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;background:#17130c;color:#e9cf8b;border:1px solid #c9a64c;border-radius:14px;padding:10px 12px;display:flex;align-items:center;gap:10px;font:600 14px/1.5 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.3)';
    var t=document.createElement('span'); t.style.flex='1'; t.textContent=msg; d.appendChild(t);
    if(btn){var b=document.createElement('button'); b.textContent=btn; b.style.cssText='background:linear-gradient(180deg,#e9cf8b,#a8832e);color:#241f14;border:0;border-radius:8px;padding:8px 14px;font:700 14px system-ui,sans-serif'; b.onclick=function(){fn(d)}; d.appendChild(b);}
    var x=document.createElement('button'); x.textContent='\u2715'; x.setAttribute('aria-label','close'); x.style.cssText='background:none;border:0;color:#b8a579;font-size:16px;padding:4px 8px'; x.onclick=function(){localStorage.setItem(KEY,'1'); d.remove();}; d.appendChild(x);
    document.body.appendChild(d);
  }
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault(); dp=e;
    bar('ثبّت تطبيق لوميرا على موبايلك','تثبيت',function(d){ dp.prompt(); dp.userChoice.then(function(){d.remove();}); });
  });
  if (isIOS) setTimeout(function(){ bar('لتثبيت التطبيق: اضغط مشاركة ثم "إضافة إلى الشاشة الرئيسية"'); }, 4000);
})();
