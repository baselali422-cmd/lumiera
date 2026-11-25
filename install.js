(function(){
  if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) return;
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(function(){});
  var KEY='lum-install-dismissed', dp=null;
  var isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
  function lg(){try{return localStorage.getItem('lum-lang')==='en'?'en':'ar';}catch(e){return 'ar';}}
  var T={
    ar:{title:'تطبيق لوميرا على موبايلك',text:'ثبّت الموقع كتطبيق بأيقونة لوميرا على الشاشة الرئيسية وارجعله بضغطة واحدة',btn:'تثبيت التطبيق',ios:'على آيفون: من سفاري اضغط زرار مشاركة ثم "إضافة إلى الشاشة الرئيسية"',manual:'من قائمة المتصفح اختار "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"'},
    en:{title:'Lumiera on your phone',text:'Install the site as an app with the Lumiera icon on your home screen',btn:'Install the app',ios:'On iPhone: in Safari tap Share, then "Add to Home Screen"',manual:'From the browser menu choose "Install app" or "Add to Home Screen"'}
  };
  function bar(msg, btn, fn){
    var d=document.createElement('div');
    d.dir='rtl';
    d.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;background:#17130c;color:#e9cf8b;border:1px solid #c9a64c;border-radius:14px;padding:10px 12px;display:flex;align-items:center;gap:10px;font:600 14px/1.5 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.3)';
    var t=document.createElement('span'); t.style.flex='1'; t.textContent=msg; d.appendChild(t);
    if(btn){var b=document.createElement('button'); b.textContent=btn; b.style.cssText='background:linear-gradient(180deg,#e9cf8b,#a8832e);color:#241f14;border:0;border-radius:8px;padding:8px 14px;font:700 14px system-ui,sans-serif'; b.onclick=function(){fn(d)}; d.appendChild(b);}
    var x=document.createElement('button'); x.textContent='\u2715'; x.setAttribute('aria-label','close'); x.style.cssText='background:none;border:0;color:#b8a579;font-size:16px;padding:4px 8px'; x.onclick=function(){localStorage.setItem(KEY,'1'); d.remove();}; d.appendChild(x);
    document.body.appendChild(d);
  }
  function card(){
    if(window.matchMedia('(display-mode: standalone)').matches||navigator.standalone){var ex=document.getElementById('lum-install-card');if(ex)ex.remove();return;}
    var d=document.getElementById('lum-install-card');
    var l=lg(), t=T[l];
    if(d){
      if(d.getAttribute('data-lg')!==l){
        d.setAttribute('data-lg',l); d.dir=l==='en'?'ltr':'rtl';
        d.querySelector('.lum-install-title').textContent=t.title;
        d.querySelector('.lum-install-text').textContent=t.text;
        d.querySelector('.lum-install-btn').textContent=t.btn;
      }
      return;
    }
    d=document.createElement('div');
    d.id='lum-install-card'; d.setAttribute('data-lg',l); d.dir=l==='en'?'ltr':'rtl';
    d.style.cssText='border:0;border-top:2px solid #c9a64c;background:#17130c;padding:22px 16px 26px;margin:24px 0 0;text-align:center;font-family:system-ui,sans-serif';
    d.innerHTML='<div class="lum-install-title" style="font-size:18px;font-weight:700;color:#d4af37;margin:2px 0 6px"></div>'+
      '<div class="lum-install-text" style="color:#b8a579;font-size:13px;line-height:1.8;margin-bottom:4px"></div>'+
      '<button type="button" class="lum-install-btn" style="background:linear-gradient(180deg,#e9cf8b,#a8832e);color:#241f14;border:0;border-radius:8px;padding:12px 32px;margin-top:8px;font-weight:700;font-size:16px;cursor:pointer"></button>'+
      '<div class="lum-install-note" style="display:none;color:#e9cf8b;font-size:12px;line-height:1.8;margin-top:10px"></div>';
    d.querySelector('.lum-install-title').textContent=t.title;
    d.querySelector('.lum-install-text').textContent=t.text;
    var b=d.querySelector('.lum-install-btn'); b.textContent=t.btn;
    b.onclick=function(){
      if(dp){dp.prompt();dp.userChoice.then(function(){});return;}
      var n=d.querySelector('.lum-install-note');
      n.style.display='block';
      n.textContent=isIOS?t.ios:t.manual;
    };
    document.body.appendChild(d);
  }
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault(); dp=e;
    if(localStorage.getItem(KEY))return;
    bar('ثبّت تطبيق لوميرا على موبايلك','تثبيت',function(d){ dp.prompt(); dp.userChoice.then(function(){d.remove();}); });
  });
  if (isIOS && !localStorage.getItem(KEY)) setTimeout(function(){ bar('لتثبيت التطبيق: اضغط مشاركة ثم "إضافة إلى الشاشة الرئيسية"'); }, 4000);
  function start(){
    card();
    new MutationObserver(card).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
