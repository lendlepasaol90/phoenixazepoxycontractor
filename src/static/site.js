/* Phoenix AZ Epoxy Contractor — progressive enhancement */
(function () {
  'use strict';
  var d = document;
  var root = d.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* Header shadow + mobile CTA visibility */
  var header = $('[data-header]');
  var mobileCta = $('[data-mobile-cta]');
  var onScroll = function () {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (mobileCta) mobileCta.classList.toggle('is-shown', y > 520);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Services dropdown */
  var toggle = $('.nav__toggle');
  var menu = $('#services-menu');
  if (toggle && menu) {
    var item = toggle.parentElement;
    var hoverTimer;
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    if (window.matchMedia('(hover: hover)').matches) {
      item.addEventListener('mouseenter', function () { clearTimeout(hoverTimer); setOpen(true); });
      item.addEventListener('mouseleave', function () { hoverTimer = setTimeout(function () { setOpen(false); }, 180); });
    }
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); } });
    d.addEventListener('click', function (e) { if (!item.contains(e.target)) setOpen(false); });
    menu.addEventListener('focusout', function (e) { if (!item.contains(e.relatedTarget)) setOpen(false); });
  }

  /* Mobile nav */
  var burger = $('[data-burger]');
  var mnav = $('#mobile-nav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mnav.hidden = !open;
    });
  }

  /* Estimate drawer */
  var drawer = $('[data-drawer]');
  var lastFocus = null;
  var focusables = function () { return $$('a[href], button:not([disabled]), input:not([type=hidden]):not([tabindex="-1"]), select, textarea', drawer).filter(function (el) { return el.offsetParent !== null; }); };
  var openDrawer = function () {
    if (!drawer) return;
    lastFocus = d.activeElement;
    drawer.hidden = false;
    d.body.classList.add('no-scroll');
    requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    if (burger && burger.getAttribute('aria-expanded') === 'true') burger.click();
    setTimeout(function () { var f = $('input[name=name]', drawer); if (f) f.focus(); }, 320);
  };
  var closeDrawer = function () {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    d.body.classList.remove('no-scroll');
    setTimeout(function () { drawer.hidden = true; }, reduce ? 0 : 380);
    if (lastFocus) lastFocus.focus();
  };
  $$('[data-open-estimate]').forEach(function (b) { b.addEventListener('click', openDrawer); });
  $$('[data-close-estimate]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
  d.addEventListener('keydown', function (e) {
    if (!drawer || drawer.hidden) return;
    if (e.key === 'Escape') closeDrawer();
    if (e.key === 'Tab') {
      var f = focusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  if (location.hash === '#estimate-form') openDrawer();

  /* Forms */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var validate = function (form) {
    var ok = true;
    var setErr = function (input, msg) {
      var field = input.closest('.field');
      var out = field && $('.field__error', field);
      if (field) field.classList.toggle('has-error', !!msg);
      if (out) out.textContent = msg || '';
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg && ok) { input.focus(); ok = false; }
    };
    var name = form.elements.name, phone = form.elements.phone, email = form.elements.email, type = form.elements.projectType;
    setErr(name, name.value.trim().length < 2 ? 'Enter your name so we know who to ask for.' : '');
    var digits = phone.value.replace(/\D/g, '');
    setErr(phone, digits.length < 10 || digits.length > 11 ? 'Enter a 10-digit phone number, area code included.' : '');
    setErr(email, !emailRe.test(email.value.trim()) ? 'Enter an email address like name@example.com.' : '');
    setErr(type, !type.value ? 'Choose the closest project type. "Not sure yet" works too.' : '');
    return ok;
  };
  $$('[data-estimate-form]').forEach(function (form) {
    form.addEventListener('input', function (e) {
      var f = e.target.closest('.field');
      if (f && f.classList.contains('has-error')) { f.classList.remove('has-error'); var o = $('.field__error', f); if (o) o.textContent = ''; }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = $('.estimate-form__status', form);
      status.className = 'estimate-form__status';
      status.textContent = '';
      if (!validate(form)) return;
      var btn = $('button[type=submit]', form);
      btn.setAttribute('aria-busy', 'true');
      $('.btn__label', btn).textContent = 'Sending…';
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.page = location.pathname;
      fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error(res.j && res.j.error ? res.j.error : 'Request failed');
          form.classList.add('is-sent');
          status.classList.add('is-ok');
          status.textContent = 'Request sent. We have your details and will be in touch to talk through the project.';
          status.setAttribute('tabindex', '-1');
          status.focus();
        })
        .catch(function (err) {
          status.classList.add('is-err');
          status.textContent = (err && err.message && err.message !== 'Failed to fetch' ? err.message + ' ' : 'The request did not go through. ') + 'Please try again in a moment, or call us instead.';
        })
        .then(function () { btn.removeAttribute('aria-busy'); $('.btn__label', btn).textContent = 'Send my request'; });
    });
  });

  /* Before/after slider */
  var initCompare = function (fig) {
    var range = $('.compare__range', fig);
    if (!range || range._ready) return;
    range._ready = true;
    var set = function (v) { fig.style.setProperty('--pos', v + '%'); };
    range.addEventListener('input', function () { set(range.value); });
    set(range.value);
    /* Pointer drag anywhere on the image (mouse, pen and touch) */
    var stage = $('.compare__stage', fig);
    var dragging = false;
    var fromEvent = function (e) {
      var r = stage.getBoundingClientRect();
      var v = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
      range.value = Math.round(v);
      set(v.toFixed(1));
    };
    stage.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true;
      fig.classList.add('is-dragging');
      if (stage.setPointerCapture) stage.setPointerCapture(e.pointerId);
      fromEvent(e);
      e.preventDefault();
    });
    stage.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    var stop = function () { dragging = false; fig.classList.remove('is-dragging'); };
    stage.addEventListener('pointerup', stop);
    stage.addEventListener('pointercancel', stop);
  };
  $$('[data-compare]').forEach(initCompare);
  $$('[data-ba-tabs]').forEach(function (wrap) {
    var tabs = $$('[role=tab]', wrap);
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (o) {
          var sel = o === t;
          o.setAttribute('aria-selected', String(sel));
          o.tabIndex = sel ? 0 : -1;
          var p = d.getElementById(o.getAttribute('aria-controls'));
          if (p) p.hidden = !sel;
        });
      });
    });
    tabKeys(tabs);
  });
  function tabKeys(tabs) {
    tabs.forEach(function (t, i) {
      t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!n) return;
        e.preventDefault();
        var next = tabs[(i + n + tabs.length) % tabs.length];
        next.focus(); next.click();
      });
    });
  }

  /* Coating layer diagram tabs */
  $$('[data-layers]').forEach(function (wrap) {
    var tabs = $$('[role=tab]', wrap);
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (o) {
          var sel = o === t;
          o.setAttribute('aria-selected', String(sel));
          o.tabIndex = sel ? 0 : -1;
          d.getElementById(o.getAttribute('aria-controls')).hidden = !sel;
        });
      });
    });
    tabKeys(tabs);
  });

  /* Reveal on scroll + counters */
  var animateCount = function (el) {
    var end = parseFloat(el.getAttribute('data-count'));
    if (reduce || isNaN(end)) { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); return; }
    var start = performance.now(), dur = 1400, suf = el.getAttribute('data-suffix') || '';
    var step = function (now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        $$('[data-count]', en.target).forEach(animateCount);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal, .reveal-img').forEach(function (el) { io.observe(el); });

    /* Load the footer map only when it approaches the viewport */
    var mapIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var f = $('iframe[data-src]', en.target);
        if (f) { f.src = f.getAttribute('data-src'); f.removeAttribute('data-src'); }
        mapIo.unobserve(en.target);
      });
    }, { rootMargin: '400px 0px' });
    $$('[data-map]').forEach(function (m) { mapIo.observe(m); });
  } else {
    $$('.reveal, .reveal-img').forEach(function (el) { el.classList.add('is-in'); });
    $$('[data-count]').forEach(animateCount);
    $$('iframe[data-src]').forEach(function (f) { f.src = f.getAttribute('data-src'); });
  }

  /* Subtle parallax on full-bleed bands */
  var bands = $$('[data-parallax]');
  if (bands.length && !reduce) {
    var ticking = false;
    var update = function () {
      var vh = window.innerHeight;
      bands.forEach(function (b) {
        var r = b.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
        b.style.transform = 'translate3d(0,' + (p * -14).toFixed(2) + '%,0)';
      });
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* Lightbox */
  var lb;
  $$('[data-lightbox]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!lb) {
        lb = d.createElement('div');
        lb.className = 'lightbox';
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-modal', 'true');
        lb.setAttribute('aria-label', 'Enlarged photo');
        lb.innerHTML = '<button type="button" aria-label="Close photo">&times;</button><figure style="margin:0"><img alt=""><p></p></figure>';
        d.body.appendChild(lb);
        var close = function () { lb.hidden = true; d.body.classList.remove('no-scroll'); if (lb._from) lb._from.focus(); };
        lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'BUTTON') close(); });
        d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) close(); });
      }
      lb._from = btn;
      var im = $('img', lb);
      im.src = btn.getAttribute('data-lightbox');
      im.alt = $('img', btn).alt;
      $('p', lb).textContent = btn.getAttribute('data-caption') || '';
      lb.hidden = false;
      d.body.classList.add('no-scroll');
      $('button', lb).focus();
    });
  });

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
