document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('app-grid');
  const filtersEl = document.getElementById('app-filters');
  const fallback = document.getElementById('app-grid-fallback');
  const heroStage = document.getElementById('hero-stage');
  const esc = window.LaphedusUI?.escapeHtml ?? (v => String(v ?? ''));

  const getIconFallback = (app) => app.fallback_icon_url || 'assets/image/laphedus-store-logo.svg';

  const getStoreButton = (app, isFeatured = false) => {
    const label = isFeatured ? 'Explore App' : 'Details';
    const detailsBtn = `<a class="btn primary" href="app.html?slug=${encodeURIComponent(app.slug)}">${label}</a>`;

    if (app.app_store_url) {
      return `${detailsBtn}<a class="btn" href="${esc(app.app_store_url)}" target="_blank" rel="noopener">App Store</a>`;
    }
    if (app.play_store_url) {
      return `${detailsBtn}<a class="btn" href="${esc(app.play_store_url)}" target="_blank" rel="noopener">Google Play</a>`;
    }
    if (app.external_url) {
      return `${detailsBtn}<a class="btn" href="${esc(app.external_url)}" target="_blank" rel="noopener">${esc(app.external_label ?? 'Open')}</a>`;
    }
    return `${detailsBtn}<a class="btn subtle" href="privacy.html?app=${encodeURIComponent(app.slug)}">Privacy</a>`;
  };

  const renderPlatformPill = (app) => {
    if (!app.platform) return '';
    const slug = app.platform.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<span class="meta-pill meta-pill-${esc(slug)}">${esc(app.platform)}</span>`;
  };

  const renderStatusPill = (app) => {
    if (!app.status) return '';
    return `<span class="meta-pill meta-pill-status">${esc(app.status)}</span>`;
  };

  const initHeroStage = (apps) => {
    if (!heroStage) return;
    const spotlightSlugs = ['breathe-calm', 'stamper', 'dinamik-ada'];
    const showcaseApps = spotlightSlugs
      .map(slug => apps.find(a => a.slug === slug))
      .filter(Boolean);
    if (!showcaseApps.length) return;

    const tabsEl = heroStage.querySelector('.hero-stage-tabs');
    const viewportEl = heroStage.querySelector('.hero-stage-viewport');
    if (!tabsEl || !viewportEl) return;

    let currentSlug = showcaseApps[0].slug;

    const renderStage = (slug) => {
      const app = showcaseApps.find(a => a.slug === slug) || showcaseApps[0];
      const screen = (app.screenshots && app.screenshots[0]) || 'assets/image/laphedus-store-banner.svg';
      const fallbackIcon = esc(getIconFallback(app));

      tabsEl.querySelectorAll('.hero-stage-tab').forEach(btn => {
        const active = btn.getAttribute('data-slug') === app.slug;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });

      viewportEl.innerHTML = `
        <div class="hero-stage-bar">
          <div class="hero-stage-identity">
            <img
              src="${esc(app.icon_url)}"
              alt="${esc(app.name)} icon"
              width="38"
              height="38"
              onerror="this.onerror=null;this.src='${fallbackIcon}';"
            />
            <div>
              <strong>${esc(app.name)}</strong>
              <span>${esc(app.category || 'App')} · ${esc(app.platform || 'Mobile')}</span>
            </div>
          </div>
          <a class="hero-stage-link" href="app.html?slug=${encodeURIComponent(app.slug)}">Open &rarr;</a>
        </div>
        <a class="hero-stage-frame app-accent-${esc(app.slug)}" href="app.html?slug=${encodeURIComponent(app.slug)}" aria-label="View ${esc(app.name)}">
          <img src="${esc(screen)}" alt="${esc(app.name)} interface preview" />
        </a>
        <p class="hero-stage-caption">${esc(app.short_description)}</p>
      `;
    };

    tabsEl.innerHTML = showcaseApps.map(app => `
      <button
        type="button"
        role="tab"
        class="hero-stage-tab${app.slug === currentSlug ? ' is-active' : ''}"
        data-slug="${esc(app.slug)}"
        aria-selected="${app.slug === currentSlug ? 'true' : 'false'}"
      >${esc(app.name.split(' - ')[0])}</button>
    `).join('');

    tabsEl.addEventListener('click', (event) => {
      const btn = event.target.closest('.hero-stage-tab');
      if (!btn) return;
      const nextSlug = btn.getAttribute('data-slug');
      if (!nextSlug || nextSlug === currentSlug) return;
      currentSlug = nextSlug;
      renderStage(currentSlug);
    });

    renderStage(currentSlug);
  };

  const renderFeaturedCard = (app) => {
    const fallbackIcon = esc(getIconFallback(app));
    const screens = Array.isArray(app.screenshots) ? app.screenshots.slice(0, 2) : [];
    const highlights = Array.isArray(app.highlights) ? app.highlights.slice(0, 3) : [];

    return `
      <article class="card card-featured app-accent-${esc(app.slug)}">
        <div class="card-featured-content">
          <div class="card-badges">
            <span class="meta-pill meta-pill-featured">Featured</span>
            ${renderPlatformPill(app)}
            <span class="card-category">${esc(app.category || 'App')}</span>
            ${renderStatusPill(app)}
          </div>
          <div class="card-top card-top-featured">
            <img
              class="app-squircle-icon app-squircle-lg"
              src="${esc(app.icon_url)}"
              alt="${esc(app.name)} icon"
              loading="eager"
              onerror="this.onerror=null;this.src='${fallbackIcon}';"
            />
            <div class="card-top-info">
              <h3 class="card-title card-title-featured">${esc(app.name)}</h3>
              <p class="card-desc card-desc-featured">${esc(app.short_description)}</p>
            </div>
          </div>
          ${highlights.length ? `
            <ul class="featured-highlights">
              ${highlights.map(item => `<li>${esc(item.title)}</li>`).join('')}
            </ul>
          ` : ''}
          <div class="card-actions">
            ${getStoreButton(app, true)}
          </div>
        </div>
        ${screens.length ? `
          <div class="card-featured-visual">
            ${screens.map((src, index) => `
              <a class="featured-screen-frame" href="app.html?slug=${encodeURIComponent(app.slug)}" aria-label="${esc(app.name)} preview ${index + 1}">
                <img src="${esc(src)}" alt="${esc(app.name)} preview ${index + 1}" loading="lazy" />
              </a>
            `).join('')}
          </div>
        ` : ''}
      </article>
    `;
  };

  const renderStandardCard = (app) => {
    const fallbackIcon = esc(getIconFallback(app));

    return `
      <article class="card card-studio app-accent-${esc(app.slug)}">
        <a class="card-stage" href="app.html?slug=${encodeURIComponent(app.slug)}" aria-label="View ${esc(app.name)} details">
          <div class="card-stage-top">
            <span class="card-category">${esc(app.category || 'App')}</span>
            <div class="card-stage-pills">
              ${renderPlatformPill(app)}
              ${renderStatusPill(app)}
            </div>
          </div>
          <div class="card-stage-icon-wrap">
            <img
              class="app-squircle-icon app-squircle-stage"
              src="${esc(app.icon_url)}"
              alt="${esc(app.name)} icon"
              loading="lazy"
              onerror="this.onerror=null;this.src='${fallbackIcon}';"
            />
          </div>
        </a>
        <div class="card-body">
          <h3 class="card-title">${esc(app.name)}</h3>
          <p class="card-desc">${esc(app.short_description)}</p>
          <div class="card-actions">
            ${getStoreButton(app)}
          </div>
        </div>
      </article>
    `;
  };

  try {
    const res = await fetch('data/apps.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('apps.json could not be loaded');
    const apps = await res.json();

    initHeroStage(apps);

    const categories = ['All', ...new Set(apps.map(app => app.category).filter(Boolean))];
    let activeCategory = 'All';

    const renderApps = () => {
      if (activeCategory === 'All') {
        const featuredApp = apps.find(app => app.featured) || null;
        const otherApps = featuredApp ? apps.filter(app => app.slug !== featuredApp.slug) : apps;
        grid.className = 'app-grid';
        grid.innerHTML = (featuredApp ? renderFeaturedCard(featuredApp) : '') + otherApps.map(renderStandardCard).join('');
      } else {
        const filtered = apps.filter(app => app.category === activeCategory);
        grid.className = 'app-grid app-grid-filtered';
        grid.innerHTML = filtered.map(renderStandardCard).join('');
      }
    };

    if (filtersEl) {
      filtersEl.innerHTML = categories.map(cat => `
        <button
          type="button"
          class="filter-pill${cat === activeCategory ? ' is-active' : ''}"
          data-category="${esc(cat)}"
          aria-pressed="${cat === activeCategory ? 'true' : 'false'}"
        >${esc(cat)}</button>
      `).join('');

      filtersEl.addEventListener('click', (event) => {
        const btn = event.target.closest('.filter-pill');
        if (!btn) return;
        const nextCat = btn.getAttribute('data-category');
        if (!nextCat || nextCat === activeCategory) return;

        activeCategory = nextCat;
        filtersEl.querySelectorAll('.filter-pill').forEach(pill => {
          const isMatch = pill.getAttribute('data-category') === activeCategory;
          pill.classList.toggle('is-active', isMatch);
          pill.setAttribute('aria-pressed', String(isMatch));
        });
        renderApps();
      });
    }

    renderApps();
    if (fallback) fallback.hidden = true;
  } catch (err) {
    console.error(err);
    if (fallback) fallback.hidden = false;
  }
});
