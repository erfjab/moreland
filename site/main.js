// Rotating word in the hero and the FAQ accordion.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var track = document.querySelector('.rot-track');
  if (track && !reduce) {
    var count = track.children.length - 1; // the last word repeats the first for a seamless loop
    var i = 0;
    setInterval(function () {
      i += 1;
      track.style.transition = 'transform .65s cubic-bezier(.16,1,.3,1)';
      track.style.transform = 'translateY(' + (-1.3 * i) + 'em)';
      if (i === count) {
        setTimeout(function () {
          track.style.transition = 'none';
          track.style.transform = 'translateY(0em)';
          i = 0;
        }, 700);
      }
    }, 2400);
  }

  // Theme: system -> light -> dark, remembered per visitor.
  var btn = document.querySelector('.theme-btn');
  if (btn) {
    var modes = ['system', 'light', 'dark'];
    var names = { system: 'خودکار', light: 'روشن', dark: 'تیره' };
    var read = function () { try { return localStorage.getItem('theme') || 'system'; } catch (e) { return 'system'; } };
    var apply = function (mode) {
      if (mode === 'system') delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = mode;
      btn.dataset.mode = mode;
      btn.setAttribute('aria-label', 'تم: ' + names[mode]);
      btn.title = 'تم: ' + names[mode];
    };
    apply(read());
    btn.addEventListener('click', function () {
      var next = modes[(modes.indexOf(btn.dataset.mode) + 1) % modes.length];
      try { if (next === 'system') localStorage.removeItem('theme'); else localStorage.setItem('theme', next); } catch (e) {}
      apply(next);
    });
  }

  var items = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));
  function setOpen(item, on) {
    item.querySelector('.faq-btn').setAttribute('aria-expanded', on ? 'true' : 'false');
    item.querySelector('.faq-q').style.fontWeight = on ? '800' : '500';
    var ic = item.querySelector('.faq-ic');
    ic.style.color = on ? 'var(--ink)' : 'var(--soft)';
    ic.style.transform = 'rotate(' + (on ? 180 : 0) + 'deg)';
    item.querySelector('.faq-rows').style.gridTemplateRows = on ? '1fr' : '0fr';
    var b = item.querySelector('.faq-body');
    b.style.opacity = on ? '1' : '0';
    b.style.transform = 'translateY(' + (on ? '0px' : '-8px') + ')';
  }
  items.forEach(function (item) {
    item.querySelector('.faq-btn').addEventListener('click', function () {
      var wasOpen = this.getAttribute('aria-expanded') === 'true';
      items.forEach(function (other) { setOpen(other, false); });
      if (!wasOpen) setOpen(item, true);
    });
  });
})();
