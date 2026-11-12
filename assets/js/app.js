const CHECK_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
const SHIELD_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>';

function qs(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function getEscaper() {
  return window.LaphedusUI?.escapeHtml ?? (v => String(v ?? ''));
}

function getFallbackIcon(app) {
  return app.fallback_icon_url || 'assets/image/laphedus-store-logo.svg?v=20261112-2';
}

function renderBreadcrumb(app) {
  const esc = getEscaper();
  return `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <a href="index.html#apps">Apps</a>
      <span class="breadcrumb-sep" aria-hidden="true">/</span>
      <span aria-current="page">${esc(app.name)}</span>
    </nav>
  `;
}

function renderLegalActions(app, primarySecondaryLabel) {
  const isAccountless = app.has_account === false;
  return [
    `<a class="btn" href="privacy.html?app=${encodeURIComponent(app.slug)}">${getEscaper()(primarySecondaryLabel ?? 'Privacy Policy')}</a>`,
    app.has_terms ? `<a class="btn" href="terms.html?app=${encodeURIComponent(app.slug)}">Terms of Use</a>` : '',
    app.has_support ? `<a class="btn" href="support.html?app=${encodeURIComponent(app.slug)}">Support</a>` : '',
    isAccountless ? '' : `<a class="btn" href="account-deletion.html?app=${encodeURIComponent(app.slug)}">Account Deletion</a>`
  ].filter(Boolean).join('');
}

function renderPrimaryAction(app) {
  const esc = getEscaper();
  if (app.app_store_url) {
    return `<a class="btn primary" href="${esc(app.app_store_url)}" target="_blank" rel="noopener">${esc(app.primary_cta_label ?? 'Download on App Store')}</a>`;
  }
  if (app.play_store_url) {
    return `<a class="btn primary" href="${esc(app.play_store_url)}" target="_blank" rel="noopener">${esc(app.primary_cta_label ?? 'Get on Google Play')}</a>`;
  }
  if (app.external_url) {
    return `<a class="btn primary" href="${esc(app.external_url)}" target="_blank" rel="noopener">${esc(app.external_label ?? 'Open Details')}</a>`;
  }
  return `<a class="btn primary" href="#overview">${esc(app.primary_cta_label ?? 'Explore App Features')}</a>`;
}

function renderScreenshotButton(src, appName, index, totalCount) {
  const esc = getEscaper();
  return `
    <button
      type="button"
      class="screen-trigger"
      data-lightbox-index="${index}"
      aria-label="Enlarge ${esc(appName)} preview ${index + 1} of ${totalCount}"
    >
      <img
        class="generic-screen"
        src="${esc(src)}"
        alt="${esc(appName)} preview ${index + 1}"
        loading="lazy"
        onerror="this.closest('article')?.remove();"
      />
      <span class="screen-zoom-hint" aria-hidden="true">Zoom</span>
    </button>
  `;
}

function renderMoreAppsStrip(currentApp, allApps) {
  const esc = getEscaper();
  const others = allApps.filter(a => a.slug !== currentApp.slug).slice(0, 3);
  if (!others.length) return '';

  return `
    <section class="more-apps-section" aria-label="More apps by Laphedus">
      <div class="more-apps-head">
        <div>
          <p class="stamper-section-label">Studio Portfolio</p>
          <h2>Explore more apps</h2>
        </div>
        <a class="btn subtle" href="index.html#apps">View All Apps &rarr;</a>
      </div>
      <div class="more-apps-grid">
        ${others.map(other => {
          const fallbackIcon = esc(getFallbackIcon(other));
          return `
            <a class="more-app-card" href="app.html?slug=${encodeURIComponent(other.slug)}">
              <img
                class="app-squircle-icon"
                src="${esc(other.icon_url)}"
                alt="${esc(other.name)} icon"
                loading="lazy"
                onerror="this.onerror=null;this.src='${fallbackIcon}';"
              />
              <div class="more-app-info">
                <span>${esc(other.category || 'App')} · ${esc(other.platform || 'Mobile')}</span>
                <strong>${esc(other.name)}</strong>
              </div>
            </a>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderShowcasePage(app, allApps) {
  const esc = getEscaper();
  const fallbackIcon = esc(getFallbackIcon(app));
  const legalActions = renderLegalActions(app, app.secondary_cta_label ?? 'Privacy Policy');
  const primaryAction = renderPrimaryAction(app);
  const screens = Array.isArray(app.screenshots) ? app.screenshots : [];
  const screenCols = Math.min(Math.max(screens.length, 1), 3);

  const metaItems = app.showcase_meta ?? [
    app.platform || (app.slug === 'breathe-calm' ? 'iOS (SwiftUI)' : 'iOS & Android'),
    'Local-first',
    app.slug === 'breathe-calm' ? 'Zero Tracking' : 'Album-based',
    app.status ? app.status : ''
  ].filter(Boolean);

  const hasPillars = (app.benefits && app.benefits.length > 0) || (app.trust_points && app.trust_points.length > 0);

  return `
    ${renderBreadcrumb(app)}

    <section class="stamper-showcase">
      <div class="stamper-showcase-copy">
        <p class="stamper-eyebrow">${[app.eyebrow ?? 'Digital memories, kept simple', app.platform, app.status].filter(Boolean).map(esc).join(' &middot; ')}</p>
        <h1 class="stamper-display">${esc(app.hero_title ?? app.name)}</h1>
        <p class="stamper-summary">${esc(app.hero_description ?? app.short_description)}</p>
        <div class="stamper-actions">
          ${primaryAction}
          ${legalActions}
        </div>
        <div class="stamper-inline-meta">
          ${metaItems.map(item => `<span>${esc(item)}</span>`).join('')}
        </div>
      </div>
      <div class="stamper-visual">
        <div class="stamper-logo-shell">
          <img
            class="stamper-logo"
            src="${esc(app.icon_url)}"
            alt="${esc(app.name)} icon"
            onerror="this.onerror=null;this.src='${fallbackIcon}';"
          />
        </div>
      </div>
    </section>

    <section id="overview" class="stamper-story-grid">
      <article class="stamper-story-card stamper-story-card-wide">
        <p class="stamper-section-label">Overview</p>
        <h2>${esc(app.overview_title ?? (app.slug === 'breathe-calm' ? 'A quiet sanctuary for your daily headspace and calm.' : 'Built for people who want their memories to feel collected, not buried.'))}</h2>
        <p>${esc(app.intro ?? app.long_description)}</p>
      </article>

      ${(app.highlights ?? []).slice(0, 3).map(item => `
        <article class="stamper-story-card">
          <p class="stamper-section-label">Feature</p>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.description)}</p>
        </article>
      `).join('')}
    </section>

    ${hasPillars ? `
      <section class="showcase-pillars">
        ${app.benefits?.length ? `
          <article class="pillar-card">
            <p class="stamper-section-label">Why It Stands Out</p>
            <h3>Designed for everyday clarity</h3>
            <ul class="pillar-list">
              ${app.benefits.map(text => `<li><span class="pillar-icon">${CHECK_SVG}</span><span>${esc(text)}</span></li>`).join('')}
            </ul>
          </article>
        ` : ''}
        ${app.trust_points?.length ? `
          <article class="pillar-card">
            <p class="stamper-section-label">Privacy &amp; Trust</p>
            <h3>Respectful by architecture</h3>
            <ul class="pillar-list">
              ${app.trust_points.map(text => `<li><span class="pillar-icon">${SHIELD_SVG}</span><span>${esc(text)}</span></li>`).join('')}
            </ul>
          </article>
        ` : ''}
      </section>
    ` : ''}

    <section class="stamper-flow">
      <div class="stamper-flow-head">
        <p class="stamper-section-label">How It Works</p>
        <h2>${esc(app.flow_title ?? (app.slug === 'breathe-calm' ? 'Three mindful steps to ease tension.' : 'Three simple steps from photo to keepsake.'))}</h2>
      </div>
      <div class="stamper-flow-steps">
        ${(app.how_it_works ?? []).slice(0, 3).map((item, index) => `
          <article class="stamper-flow-step">
            <span class="stamper-flow-number">0${index + 1}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.description)}</p>
          </article>
        `).join('')}
      </div>
    </section>

    ${screens.length > 0 ? `
      <section class="generic-gallery">
        <div class="generic-gallery-head">
          <p class="stamper-section-label">Preview</p>
          <h2>Experience the Interface</h2>
          <p>Click any screen below to inspect it up close.</p>
        </div>
        <div class="generic-gallery-grid generic-gallery-cols-${screenCols}">
          ${screens.map((src, index) => `
            <article class="generic-gallery-card">
              ${renderScreenshotButton(src, app.name, index, screens.length)}
            </article>
          `).join('')}
        </div>
      </section>
    ` : ''}

    ${app.cta_title ? `
      <section class="showcase-cta-banner">
        <div class="showcase-cta-copy">
          <p class="stamper-section-label">${esc(app.name)}</p>
          <h2>${esc(app.cta_title)}</h2>
          ${app.cta_description ? `<p>${esc(app.cta_description)}</p>` : ''}
        </div>
        <div class="stamper-actions">
          ${primaryAction}
          <a class="btn" href="index.html#apps">All Apps</a>
        </div>
      </section>
    ` : ''}

    ${renderMoreAppsStrip(app, allApps)}
  `;
}

function renderGenericPage(app, allApps) {
  const esc = getEscaper();
  const fallbackIcon = esc(getFallbackIcon(app));
  const primaryAction = app.app_store_url
    ? `<a class="btn primary" href="${esc(app.app_store_url)}" target="_blank" rel="noopener">Download on App Store</a>`
    : app.play_store_url
      ? `<a class="btn primary" href="${esc(app.play_store_url)}" target="_blank" rel="noopener">Get on Google Play</a>`
      : app.external_url
        ? `<a class="btn primary" href="${esc(app.external_url)}" target="_blank" rel="noopener">${esc(app.external_label ?? 'Open Details')}</a>`
        : `<a class="btn primary" href="#overview">Explore Overview</a>`;

  const legalActions = renderLegalActions(app, 'Privacy Policy');
  const screens = Array.isArray(app.screenshots) ? app.screenshots : [];
  const leadScreens = screens.slice(0, 3);
  const extraScreens = screens.slice(3);
  const leadCols = Math.min(Math.max(leadScreens.length, 1), 3);

  return `
    ${renderBreadcrumb(app)}

    <section class="generic-app-shell">
      <section class="generic-showcase">
        <div class="generic-showcase-copy">
          <p class="stamper-eyebrow">${[app.category ?? 'App', app.platform, app.status].filter(Boolean).map(esc).join(' &middot; ')}</p>
          <h1 class="generic-display">${esc(app.name)}</h1>
          <p class="generic-summary">${esc(app.short_description)}</p>
          <div class="stamper-actions">
            ${primaryAction}
            ${legalActions}
          </div>
          <div class="stamper-inline-meta">
            ${app.platform ? `<span>${esc(app.platform)}</span>` : ''}
            <span>${esc(app.category ?? 'Mobile App')}</span>
            <span>${app.has_account === false ? 'No Account Required' : 'Account Controls'}</span>
          </div>
        </div>
        <div class="generic-visual">
          <div class="generic-logo-shell">
            <img
              class="generic-logo"
              src="${esc(app.icon_url)}"
              alt="${esc(app.name)} icon"
              onerror="this.onerror=null;this.src='${fallbackIcon}';"
            />
          </div>
        </div>
      </section>

      <section id="overview" class="generic-story-grid">
        <article class="generic-story-card generic-story-card-wide">
          <p class="stamper-section-label">Overview</p>
          <h2>${esc(app.name)} at a glance</h2>
          <p>${esc(app.long_description)}</p>
        </article>
      </section>

      <section class="generic-facts-grid" aria-label="App highlights">
        <article class="generic-fact-card">
          <p class="stamper-section-label">Platform</p>
          <h3>${esc(app.platform ?? 'Mobile')}</h3>
          <p>Built and maintained by Laphedus for responsive everyday performance.</p>
        </article>
        <article class="generic-fact-card">
          <p class="stamper-section-label">Privacy &amp; Data</p>
          <h3>${app.has_account === false ? 'Accountless Use' : 'Transparent Controls'}</h3>
          <p>Dedicated privacy policy${app.has_account === false ? ' with no mandatory account setup.' : ' and user data deletion workflow.'}</p>
        </article>
        <article class="generic-fact-card">
          <p class="stamper-section-label">Resources</p>
          <h3>Legal &amp; Support</h3>
          <p>Review <a href="privacy.html?app=${encodeURIComponent(app.slug)}">Privacy</a>${app.has_terms ? `, <a href="terms.html?app=${encodeURIComponent(app.slug)}">Terms</a>` : ''}, or reach <a href="support.html?app=${encodeURIComponent(app.slug)}">Support</a>.</p>
        </article>
      </section>

      ${leadScreens.length > 0 ? `
        <section class="generic-gallery">
          <div class="generic-gallery-head">
            <p class="stamper-section-label">Preview</p>
            <h2>Screenshots</h2>
            <p>Click any screenshot to inspect it at full scale.</p>
          </div>
          <div class="generic-gallery-grid generic-gallery-cols-${leadCols}">
            ${leadScreens.map((src, index) => `
              <article class="generic-gallery-card">
                ${renderScreenshotButton(src, app.name, index, screens.length)}
              </article>
            `).join('')}
          </div>
          ${extraScreens.length > 0 ? `
            <div class="generic-gallery-grid generic-gallery-cols-${Math.min(extraScreens.length, 3)} generic-gallery-extra">
              ${extraScreens.map((src, index) => `
                <article class="generic-gallery-card">
                  ${renderScreenshotButton(src, app.name, index + 3, screens.length)}
                </article>
              `).join('')}
            </div>
          ` : ''}
        </section>
      ` : ''}

      ${renderMoreAppsStrip(app, allApps)}
    </section>
  `;
}

function initLightbox(screenshots, appName) {
  if (!Array.isArray(screenshots) || screenshots.length === 0) return;

  const modal = document.createElement('div');
  modal.className = 'lightbox';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', `${appName} screenshot preview`);

  modal.innerHTML = `
    <div class="lightbox-backdrop" data-lightbox-close></div>
    <div class="lightbox-dialog">
      <div class="lightbox-toolbar">
        <span class="lightbox-counter"></span>
        <button type="button" class="lightbox-close" data-lightbox-close aria-label="Close preview">&times;</button>
      </div>
      <div class="lightbox-stage">
        <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous screenshot">&#8249;</button>
        <img class="lightbox-image" src="" alt="" />
        <button type="button" class="lightbox-nav lightbox-next" aria-label="Next screenshot">&#8250;</button>
      </div>
      <p class="lightbox-caption"></p>
    </div>
  `;

  document.body.appendChild(modal);

  const imgEl = modal.querySelector('.lightbox-image');
  const counterEl = modal.querySelector('.lightbox-counter');
  const captionEl = modal.querySelector('.lightbox-caption');
  const prevBtn = modal.querySelector('.lightbox-prev');
  const nextBtn = modal.querySelector('.lightbox-next');
  const closeBtn = modal.querySelector('.lightbox-close');

  let currentIndex = 0;
  let lastTrigger = null;

  const updateSlide = () => {
    const src = screenshots[currentIndex];
    imgEl.src = src;
    imgEl.alt = `${appName} screenshot ${currentIndex + 1}`;
    counterEl.textContent = `${currentIndex + 1} / ${screenshots.length}`;
    captionEl.textContent = `${appName} — Screen ${currentIndex + 1}`;
    prevBtn.hidden = screenshots.length <= 1;
    nextBtn.hidden = screenshots.length <= 1;
  };

  const open = (index, trigger) => {
    currentIndex = (index + screenshots.length) % screenshots.length;
    lastTrigger = trigger || null;
    updateSlide();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  };

  document.getElementById('app-detail')?.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-lightbox-index]');
    if (!trigger) return;
    const idx = Number(trigger.getAttribute('data-lightbox-index'));
    if (!Number.isNaN(idx)) open(idx, trigger);
  });

  modal.querySelectorAll('[data-lightbox-close]').forEach(el => el.addEventListener('click', close));
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    updateSlide();
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % screenshots.length;
    updateSlide();
  });

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft' && screenshots.length > 1) {
      currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
      updateSlide();
    }
    if (event.key === 'ArrowRight' && screenshots.length > 1) {
      currentIndex = (currentIndex + 1) % screenshots.length;
      updateSlide();
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const rawSlug = qs('slug');
  const slug = window.LaphedusUI?.normalizeAppSlug ? window.LaphedusUI.normalizeAppSlug(rawSlug) : rawSlug;
  const container = document.getElementById('app-detail');
  const fallback = document.getElementById('app-detail-fallback');

  if (!slug) {
    if (fallback) fallback.hidden = false;
    if (container) container.innerHTML = '';
    return;
  }

  try {
    let apps = window.LAPHEDUS_APPS;
    if (!Array.isArray(apps)) {
      const response = await fetch('./data/apps.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('apps.json could not be loaded');
      apps = await response.json();
    }
    const app = apps.find(entry => entry.slug === slug);
    if (!app) throw new Error('App not found');

    document.title = `${app.name} - Laphedus`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', app.short_description);
    document.body.classList.add('app-detail-page', `app-theme-${app.slug}`);

    const hasRichShowcase = app.slug === 'stamper' || app.slug === 'breathe-calm' || Boolean(app.highlights);
    container.className = `app-detail app-detail-${hasRichShowcase ? 'stamper' : 'generic'}`;
    container.innerHTML = hasRichShowcase ? renderShowcasePage(app, apps) : renderGenericPage(app, apps);

    initLightbox(app.screenshots ?? [], app.name);
    if (fallback) fallback.hidden = true;
  } catch (error) {
    console.error(error);
    if (fallback) fallback.hidden = false;
    if (container) container.innerHTML = '';
  }
});
