/* ===========================================================================
   DEV.K — COMMAND CENTRE · behaviour layer
   ---------------------------------------------------------------------------
   A single, dependency-free ES module. Everything here is progressive
   enhancement: with JavaScript disabled the site remains fully navigable and
   every piece of content is readable. Nothing is fetched from a third party.

   Modules
     clock        local device time in the status layer
     nav          mobile console sheet + focus management
     reveal       entrance transitions (disabled for reduced-motion users)
     filters      mission / tool / log filtering with live result counts
     form         contact validation + honest delivery states
     misc         current year, copy-to-clipboard, back-to-top
   =========================================================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const MOBILE = () => window.matchMedia('(max-width: 63.99rem)').matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------------------------------------------------------------------------
   1. Local clock — reads the visitor's own device time. No server, no requests.
   ------------------------------------------------------------------------ */
function initClock() {
  const parts = $$('[data-clock], [data-clock-inline]');
  if (!parts.length) return;

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'local';
  const zoneLabel = () => {
    try {
      return (
        new Intl.DateTimeFormat('en-GB', { timeZoneName: 'short' })
          .formatToParts(new Date())
          .find((p) => p.type === 'timeZoneName')?.value || timeZone.split('/').pop()
      );
    } catch {
      return timeZone.split('/').pop();
    }
  };

  const pad = (n) => String(n).padStart(2, '0');

  /** e.g. "IST UTC+05:30", "UTC", "GMT UTC+00:00" — never "UTC · UTC+00:00". */
  const zoneText = () => {
    const zone = zoneLabel();
    const offsetMin = -new Date().getTimezoneOffset();
    const offset = `UTC${offsetMin < 0 ? '-' : '+'}${pad(Math.floor(Math.abs(offsetMin) / 60))}:${pad(Math.abs(offsetMin) % 60)}`;
    const isGeneric = /^(UTC|GMT)/i.test(zone);
    if (isGeneric) return offsetMin === 0 ? 'UTC' : offset;
    return `${zone} ${offset}`;
  };

  const tick = () => {
    const now = new Date();
    const clock = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const label = zoneText();
    parts.forEach((el) => {
      if (el.tagName === 'TIME') {
        el.textContent = clock;
        el.dateTime = now.toISOString();
        el.title = now.toLocaleString();
      } else {
        el.textContent = clock;
      }
    });
    $$('[data-clock-zone]').forEach((el) => {
      el.textContent = label;
    });
  };

  tick();
  let timer = window.setInterval(tick, 1000);
  // Stop the timer while the tab is hidden — a clock nobody is reading
  // should not cost anything.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearInterval(timer);
      timer = null;
    } else if (!timer) {
      tick();
      timer = window.setInterval(tick, 1000);
    }
  });
}

/* ---------------------------------------------------------------------------
   2. Navigation — mobile console sheet with a managed focus state.
   ------------------------------------------------------------------------ */
function initNav() {
  const toggle = $('[data-nav-toggle]');
  const wrap = $('[data-nav-wrap]');
  if (!toggle || !wrap) return;

  const label = $('[data-nav-toggle-label]', toggle);
  const close = (returnFocus = false) => {
    wrap.dataset.open = 'false';
    wrap.setAttribute('inert', '');
    wrap.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    if (label) label.textContent = 'MENU';
    if (returnFocus) toggle.focus();
  };
  const open = () => {
    wrap.dataset.open = 'true';
    wrap.removeAttribute('inert');
    wrap.removeAttribute('aria-hidden');
    toggle.setAttribute('aria-expanded', 'true');
    if (label) label.textContent = 'CLOSE';
    const first = $('a, button', wrap);
    if (first) first.focus({ preventScroll: true });
  };

  const sync = () => {
    if (MOBILE()) close();
    else {
      // Desktop: the navigation is a permanent column, never inert.
      wrap.removeAttribute('inert');
      wrap.removeAttribute('aria-hidden');
      wrap.dataset.open = 'true';
      toggle.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'MENU';
    }
  };

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') close(true);
    else open();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(true);
  });

  wrap.addEventListener('click', (event) => {
    // Following a destination closes the sheet before the next page loads.
    if (event.target.closest('a') && MOBILE()) close();
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(sync, 150);
  });

  sync();
}

/* ---------------------------------------------------------------------------
   3. Entrance transitions — opt-in, one-shot, and never blocking content.
   ------------------------------------------------------------------------ */
function initReveal() {
  const targets = $$('.reveal');
  if (!targets.length) return;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    document.documentElement.classList.add('reveal-off');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  targets.forEach((el) => observer.observe(el));

  // Safety net: if anything is still hidden after 3s (observer missed it,
  // layout shifted, or the user is on an odd viewport), show it.
  window.setTimeout(() => {
    targets.forEach((el) => el.classList.add('is-in'));
  }, 3000);
}

/* ---------------------------------------------------------------------------
   4. Filters — category / status / year groups plus search, over cards or a
      table. Result counts are announced through a polite live region.
   ------------------------------------------------------------------------ */
function initFilters() {
  const bars = $$('[data-filters]');
  if (!bars.length) return;

  bars.forEach((bar) => {
    const scopeId = bar.dataset.filters;
    const status = document.getElementById(`${scopeId}-status`) || $('[data-results-count]')?.closest('[role="status"]');
    const countEls = $$('[data-results-count]', bar.parentElement || document);
    const search = $('[data-filter-search]', bar);
    const reset = $('[data-filter-reset]', bar);
    const chips = $$('[data-filter]', bar);

    // Cards, table rows, or individual nodes inside collapsible branches —
    // whichever this scope contains.
    const list = $(`[data-filter-list]`, bar.parentElement);
    const table = $(`[data-filter-table]`, bar.parentElement);
    const nodeScope = Boolean(list?.hasAttribute('data-filter-nodes'));
    const items = nodeScope
      ? $$('*[data-search]', list)
      : list
        ? $$(':scope > *', list)
        : table
          ? $$('tbody tr', table)
          : [];
    const emptyPanel = $('[data-filter-empty]', bar.parentElement);
    if (!items.length) return;

    const state = {};
    chips.forEach((chip) => {
      if (chip.getAttribute('aria-pressed') === 'true') state[chip.dataset.filter] = chip.dataset.value;
      chip.addEventListener('click', () => {
        state[chip.dataset.filter] = chip.dataset.value;
        chips
          .filter((c) => c.dataset.filter === chip.dataset.filter)
          .forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        apply();
      });
    });

    const totals = items.length;
    const totalEl = $('[data-results-total]');

    function matches(item) {
      for (const [key, value] of Object.entries(state)) {
        if (!value || value === 'ALL') continue;
        const field = item.dataset[key] || '';
        // `skill` holds a token list (a record can use several skills); every
        // other group is a single value.
        if (key === 'skill') {
          if (!field.split(' ').includes(value)) return false;
        } else if (field !== value) {
          return false;
        }
      }
      if (search && search.value.trim()) {
        const needle = search.value.trim().toLowerCase();
        if (!(item.dataset.search || '').includes(needle)) return false;
      }
      return true;
    }

    function apply() {
      let visible = 0;
      items.forEach((item) => {
        const ok = matches(item);
        item.hidden = !ok;
        if (ok) visible += 1;
      });

      // Branch containers follow their nodes: hide empty branches, and open
      // any branch that holds a match so results are never behind a control.
      if (nodeScope) {
        const filtering = Object.values(state).some((v) => v && v !== 'ALL') || Boolean(search?.value.trim());
        const branches = $$('details', list);
        branches.forEach((details) => {
          const shown = $$('.skill-node:not([hidden])', details);
          details.hidden = shown.length === 0;
          if (shown.length && filtering) details.open = true;
        });
        if (!filtering) branches.forEach((d, i) => (d.open = i === 0));
      }

      if (emptyPanel) emptyPanel.hidden = visible !== 0;

      countEls.forEach((el) => (el.textContent = String(visible).padStart(2, '0')));
      if (totalEl) totalEl.textContent = String(totals).padStart(2, '0');
      const active = Object.values(state).some((v) => v && v !== 'ALL') || (search && search.value.trim());
      if (status) status.dataset.filtered = active ? 'true' : 'false';
    }

    if (search) {
      let t;
      search.addEventListener('input', () => {
        window.clearTimeout(t);
        t = window.setTimeout(apply, 120);
      });
      search.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          search.value = '';
          apply();
        }
      });
    }

    if (reset) {
      reset.addEventListener('click', () => {
        chips.forEach((c) => {
          const isAll = c.dataset.value === 'ALL';
          c.setAttribute('aria-pressed', String(isAll));
          if (isAll) state[c.dataset.filter] = 'ALL';
        });
        if (search) search.value = '';
        apply();
        if (status) status.focus?.();
      });
    }

    apply();
  });
}

/* ---------------------------------------------------------------------------
   5. Contact form — client-side validation, then one of three honest states:
        · transmitted   (an endpoint is configured and answered)
        · captured      (safe mode: nothing was sent, and we say so)
        · error         (endpoint configured but the request failed)
   ------------------------------------------------------------------------ */
function initForm() {
  const form = $('[data-contact-form]');
  if (!form) return;

  const status = $('[data-form-status]', form);
  const submit = $('[data-submit]', form);
  const endpoint = form.dataset.endpoint || '';

  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Enter a name of at least 2 characters.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address.'),
    subject: (v) => (v ? '' : 'Choose a subject so the message can be routed.'),
    message: (v) => (v.trim().length >= 20 ? '' : `Add a little more detail — ${Math.max(0, 20 - v.trim().length)} characters to go.`),
    consent: (v, el) => (el.checked ? '' : 'Please confirm how your message will be used.')
  };

  const fieldWrap = (name) => $(`[data-field="${name}"]`, form);
  const errorEl = (name) => $(`[data-error-for="${name}"]`, form);

  function validateField(name, announce = true) {
    const wrap = fieldWrap(name);
    if (!wrap) return true;
    const input = $('[name]', wrap);
    if (!input) return true;
    const message = rules[name]?.(input.value, input) ?? '';
    const error = errorEl(name);
    if (message) {
      wrap.dataset.invalid = 'true';
      wrap.removeAttribute('data-valid');
      input.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = `! ${message}`;
    } else {
      wrap.removeAttribute('data-invalid');
      wrap.dataset.valid = 'true';
      input.removeAttribute('aria-invalid');
      if (error) error.textContent = '';
    }
    if (!announce && error) error.textContent = error.textContent;
    return !message;
  }

  Object.keys(rules).forEach((name) => {
    const wrap = fieldWrap(name);
    if (!wrap) return;
    const input = $('[name]', wrap);
    input.addEventListener('blur', () => {
      if (input.value || input.checked) validateField(name);
    });
    input.addEventListener('input', () => {
      if (wrap.dataset.invalid === 'true') validateField(name);
    });
    input.addEventListener('change', () => {
      if (wrap.dataset.invalid === 'true') validateField(name);
    });
  });

  const setStatus = (state, title, body, extraMarkup = '') => {
    status.dataset.state = state;
    status.innerHTML = `<p class="form__status-title">${title}</p><p>${body}</p>${extraMarkup}`;
    status.focus({ preventScroll: false });
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const invalid = Object.keys(rules).filter((name) => !validateField(name));

    if (invalid.length) {
      setStatus(
        'error',
        '✕ Message not sent — check the highlighted fields',
        `${invalid.length} field${invalid.length === 1 ? '' : 's'} need attention: ${invalid.join(', ')}.`,
        `<p class="util">Nothing was transmitted. Correct the fields above and submit again.</p>`
      );
      const firstWrap = fieldWrap(invalid[0]);
      $('[name]', firstWrap)?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());

    if (!endpoint) {
      // SAFE MODE — no delivery channel is configured on this build.
      setStatus(
        'success',
        '✓ Message captured — not transmitted',
        'Your message passed validation and is held in this browser only. No delivery channel is configured on this build, so nothing was sent and nothing was stored anywhere.',
        `<p class="util">To receive messages, set <code>site.contactEndpoint</code> in <code>content/site.js</code>.</p>
         <div class="btn-row">
           <button class="btn btn--quiet" type="button" data-copy-message>Copy my message</button>
           <a class="btn btn--quiet" href="hq.html">See other channels</a>
         </div>`
      );
      $('[data-copy-message]', status)?.addEventListener('click', async () => {
        const text = `Subject: ${data.subject}\nName: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
        try {
          await navigator.clipboard.writeText(text);
          $('[data-copy-message]', status).textContent = 'Copied';
        } catch {
          $('[data-copy-message]', status).textContent = 'Select and copy manually';
        }
      });
      return;
    }

    submit.setAttribute('aria-disabled', 'true');
    setStatus('pending', '◌ Transmitting…', 'Sending your message to the configured endpoint.');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`Endpoint responded ${response.status}`);
      form.reset();
      $$('[data-field]', form).forEach((wrap) => {
        wrap.removeAttribute('data-valid');
        wrap.removeAttribute('data-invalid');
      });
      setStatus(
        'success',
        '✓ Message transmitted',
        'Thank you — your message has been delivered. A reply usually follows within one or two days.'
      );
    } catch (error) {
      setStatus(
        'error',
        '✕ Delivery failed',
        'The message could not be delivered. It may be a temporary network problem or a misconfigured endpoint.',
        `<p class="util">Try again in a moment, or use another channel listed on the <a href="contact.html">contact page</a>. Technical detail: ${String(
          error.message
        )}</p>`
      );
    } finally {
      submit.removeAttribute('aria-disabled');
    }
  });
}

/* ---------------------------------------------------------------------------
   6. Small conveniences.
   ------------------------------------------------------------------------ */
function initMisc() {
  // Scoped deliberately: content records also carry data-year for filtering.
  $$('[data-current-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

  // Back-to-top: respect reduced motion instead of animating regardless.
  $$('a[href="#main"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const main = $('#main');
      if (!main) return;
      event.preventDefault();
      main.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
      main.focus({ preventScroll: true });
    });
  });
}

/* ---------------------------------------------------------------------------
   Boot
   ------------------------------------------------------------------------ */
function boot() {
  initClock();
  initNav();
  initReveal();
  initFilters();
  initForm();
  initMisc();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
