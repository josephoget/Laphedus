(() => {
  const THEME_STORAGE_KEY = 'laphedus-theme';
  const SUN_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  const MOON_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const APP_SCOPE_CATALOG = [
    { slug: '', label: 'General', pages: ['privacy', 'terms', 'support', 'account-deletion'] },
    { slug: 'breathe-calm', label: 'Breathe & Calm', pages: ['privacy', 'terms', 'support', 'account-deletion'] },
    { slug: 'stamper', label: 'Stamper', pages: ['privacy', 'terms', 'support'] },
    { slug: 'dinamik-ada', label: 'Dynamic Pill', pages: ['privacy', 'terms', 'support'] },
    { slug: 'kayfe', label: 'Kayfe', pages: ['privacy', 'terms', 'support', 'account-deletion'] },
    { slug: 'expensly', label: 'Expensly', pages: ['privacy', 'terms', 'support'] },
    { slug: 'taptap', label: 'TapTap', pages: ['privacy', 'terms', 'support'] },
    { slug: 'nowa4', label: 'Nowa4', pages: ['privacy', 'terms', 'support', 'account-deletion'] }
  ];

  const APP_SLUG_ALIASES = {
    masraf: 'expensly',
    masrafkaydedici: 'expensly'
  };

  function normalizeAppSlug(slug) {
    const clean = String(slug ?? '').trim().toLowerCase();
    return APP_SLUG_ALIASES[clean] || String(slug ?? '').trim();
  }

  const APP_DISPLAY_NAMES = {
    'breathe-calm': 'Breathe & Calm',
    'stamper': 'Stamper - My Stamp Album',
    'dinamik-ada': 'Dynamic Pill',
    'kayfe': 'Kayfe - Coffee Fortune App',
    'expensly': 'Expensly - Expense Tracker',
    'taptap': 'TapTap - Score',
    'nowa4': 'Nowa4'
  };

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (_) {}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
      btn.innerHTML = isDark ? SUN_ICON : MOON_ICON;
    }
  }

  function initThemeToggle() {
    applyTheme(getPreferredTheme());

    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch (_) {}
        applyTheme(next);
      });
    }

    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', (e) => {
        try {
          if (localStorage.getItem(THEME_STORAGE_KEY)) return;
        } catch (_) {}
        applyTheme(e.matches ? 'dark' : 'light');
      });
    }
  }

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && nav.classList.contains('is-open')) {
        closeNav();
      }
    });
  }

  function initCopyButtons() {
    document.querySelectorAll('[data-copy-email]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const value = btn.getAttribute('data-copy-email');
        if (!value) return;
        const labelEl = btn.querySelector('.copy-label') || btn;
        const original = labelEl.textContent;

        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(value);
          } else {
            const input = document.createElement('input');
            input.value = value;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            input.remove();
          }
          labelEl.textContent = 'Copied!';
          btn.classList.add('is-copied');
          setTimeout(() => {
            labelEl.textContent = original;
            btn.classList.remove('is-copied');
          }, 1800);
        } catch (_) {}
      });
    });
  }

  function initAppScopeBar() {
    const bar = document.getElementById('appScopeBar');
    if (!bar) return;

    const path = window.location.pathname || '';
    let pageKey = '';
    if (/privacy(\.html)?$/.test(path)) pageKey = 'privacy';
    else if (/terms(\.html)?$/.test(path)) pageKey = 'terms';
    else if (/support(\.html)?$/.test(path)) pageKey = 'support';
    else if (/account-deletion(\.html)?$/.test(path)) pageKey = 'account-deletion';
    if (!pageKey) return;

    const params = new URLSearchParams(window.location.search);
    const activeSlug = normalizeAppSlug(params.get('app'));

    const appNameEl = document.getElementById('appName');
    if (appNameEl && activeSlug && APP_DISPLAY_NAMES[activeSlug]) {
      appNameEl.textContent = APP_DISPLAY_NAMES[activeSlug];
    }

    const items = APP_SCOPE_CATALOG.filter(entry => entry.pages.includes(pageKey));
    const frag = document.createDocumentFragment();

    items.forEach(entry => {
      const a = document.createElement('a');
      a.className = 'scope-pill' + (entry.slug === activeSlug ? ' is-active' : '');
      a.href = entry.slug ? `${pageKey}.html?app=${encodeURIComponent(entry.slug)}` : `${pageKey}.html`;
      a.textContent = entry.label;
      if (entry.slug === activeSlug) {
        a.setAttribute('aria-current', 'page');
      }
      frag.appendChild(a);
    });

    bar.replaceChildren(frag);
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function appendLinkedText(parent, text) {
    const pattern = /(https?:\/\/[^\s)>,]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      const token = match[0];
      const anchor = document.createElement('a');
      if (match[1]) {
        let cleanUrl = token;
        let trailing = '';
        while (/[.,;:!?)]$/.test(cleanUrl)) {
          if (cleanUrl.endsWith(')') && (cleanUrl.match(/\(/g) || []).length >= (cleanUrl.match(/\)/g) || []).length) {
            break;
          }
          trailing = cleanUrl.slice(-1) + trailing;
          cleanUrl = cleanUrl.slice(0, -1);
        }
        anchor.href = cleanUrl;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.textContent = cleanUrl;
        parent.appendChild(anchor);
        if (trailing) parent.appendChild(document.createTextNode(trailing));
      } else {
        anchor.href = `mailto:${token}`;
        anchor.textContent = token;
        parent.appendChild(anchor);
      }
      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
  }

  function appendStructuredText(parent, text, allowBoldLabel = false) {
    if (allowBoldLabel) {
      const labelMatch = text.match(/^([A-Za-z0-9][A-Za-z0-9\s/&(),'-]{1,42}):\s+(.+)$/);
      if (labelMatch && !/^https?$/i.test(labelMatch[1])) {
        const strong = document.createElement('strong');
        strong.textContent = `${labelMatch[1]}: `;
        parent.appendChild(strong);
        appendLinkedText(parent, labelMatch[2]);
        return;
      }
    }
    appendLinkedText(parent, text);
  }

  function isNumberedHeading(trimmed) {
    return /^\d+\.\s+/.test(trimmed) && trimmed.length <= 90 && !trimmed.endsWith('.');
  }

  function isShortHeading(trimmed, nextTrimmed) {
    if (!trimmed || trimmed.length > 72) return false;
    if (/^[-•]/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) return false;
    if (/[.!?]$/.test(trimmed)) return false;
    if (/^(Email|Brand|Developer|Last\s+updated):/i.test(trimmed)) return false;
    if (/^https?:\/\//i.test(trimmed)) return false;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx > 0 && colonIdx < trimmed.length - 1) {
      if (!/^(Method\s+\d+|Privacy Policy|Breathe & Calm)/i.test(trimmed)) return false;
    }
    return Boolean(nextTrimmed);
  }

  function renderFormattedDocument(container, rawText) {
    if (!container) return;
    const lines = String(rawText ?? '').replace(/\r\n?/g, '\n').split('\n');
    const frag = document.createDocumentFragment();
    const root = document.createElement('div');
    root.className = 'doc-formatted';

    const metaWrap = document.createElement('div');
    metaWrap.className = 'doc-meta-strip';
    let hasMeta = false;

    let listEl = null;
    let listType = null;

    const flushList = () => {
      if (listEl) {
        root.appendChild(listEl);
        listEl = null;
        listType = null;
      }
    };

    const ensureList = (type) => {
      if (!listEl || listType !== type) {
        flushList();
        listEl = document.createElement(type);
        listEl.className = 'doc-list';
        listType = type;
      }
      return listEl;
    };

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const trimmed = rawLine.trim();
      const prevTrimmed = i > 0 ? lines[i - 1].trim() : '';
      let nextTrimmed = '';
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim()) {
          nextTrimmed = lines[j].trim();
          break;
        }
      }

      if (!trimmed) {
        flushList();
        continue;
      }

      if (trimmed === '⚠️' && /^Important Warning/i.test(nextTrimmed)) {
        continue;
      }

      if (i <= 3 && /^(Last\s+updated|Developer):/i.test(trimmed)) {
        flushList();
        const pill = document.createElement('span');
        pill.className = 'doc-meta-pill';
        appendLinkedText(pill, trimmed);
        metaWrap.appendChild(pill);
        hasMeta = true;
        continue;
      }

      if (i === 0 && trimmed.length <= 95 && !trimmed.endsWith('.')) {
        flushList();
        const title = document.createElement('h2');
        title.className = 'doc-doc-title';
        title.textContent = trimmed;
        root.appendChild(title);
        continue;
      }

      if (/^[-•]\s+/.test(trimmed)) {
        const ul = ensureList('ul');
        const li = document.createElement('li');
        appendStructuredText(li, trimmed.replace(/^[-•]\s+/, ''), true);
        ul.appendChild(li);
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed) && trimmed.endsWith('.')) {
        const ol = ensureList('ol');
        const li = document.createElement('li');
        appendStructuredText(li, trimmed.replace(/^\d+\.\s+/, ''), true);
        ol.appendChild(li);
        continue;
      }

      if (isNumberedHeading(trimmed)) {
        flushList();
        const h2 = document.createElement('h2');
        h2.textContent = trimmed;
        root.appendChild(h2);
        continue;
      }

      const isIndented = /^ {4,}/.test(rawLine);
      const nextIsIndented = i + 1 < lines.length && /^ {4,}/.test(lines[i + 1]) && lines[i + 1].trim() !== '' && !/^[-•]/.test(lines[i + 1].trim());
      const prevWasIndented = i > 0 && /^ {4,}/.test(lines[i - 1]) && prevTrimmed !== '' && !/^[-•]/.test(prevTrimmed) && !prevTrimmed.endsWith(':');

      if (isIndented && !trimmed.endsWith(':') && (nextIsIndented || prevWasIndented) && trimmed.length <= 160) {
        const ul = ensureList('ul');
        const li = document.createElement('li');
        appendStructuredText(li, trimmed, true);
        ul.appendChild(li);
        continue;
      }

      if (isShortHeading(trimmed, nextTrimmed) && (!prevTrimmed || prevTrimmed === '⚠️' || /^Method\s+\d+:/i.test(trimmed))) {
        flushList();
        const headingTag = /^(Method\s+\d+:|.*:$)/i.test(trimmed) ? 'h3' : 'h2';
        const h = document.createElement(headingTag);
        h.textContent = trimmed.replace(/:$/, '');
        root.appendChild(h);
        continue;
      }

      flushList();
      const p = document.createElement('p');
      appendStructuredText(p, trimmed, /^(Email|Brand|Developer|Google Play refunds|Apple refunds):/i.test(trimmed));
      root.appendChild(p);
    }

    flushList();
    if (hasMeta) {
      root.insertBefore(metaWrap, root.firstChild);
    }
    frag.appendChild(root);
    container.replaceChildren(frag);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initThemeToggle();
    initMobileNav();
    initCopyButtons();
    initAppScopeBar();
  });

  window.LaphedusUI = {
    escapeHtml,
    normalizeAppSlug,
    renderFormattedDocument,
    APP_DISPLAY_NAMES
  };
})();
