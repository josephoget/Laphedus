document.addEventListener('DOMContentLoaded', async () => {
  const publishedGrid = document.getElementById('published-app-grid');
  const unpublishedGrid = document.getElementById('unpublished-app-grid');
  const publishedSection = document.getElementById('published-apps');
  const unpublishedSection = document.getElementById('unpublished-apps');
  const filtersEl = document.getElementById('app-filters');
  const fallback = document.getElementById('app-grid-fallback');
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

  const renderMetaLine = (app, prefix = '') => {
    const parts = [
      prefix,
      app.category || 'App',
      app.platform || '',
      app.status || ''
    ].filter(Boolean);
    return parts.map(part => esc(part)).join(' &middot; ');
  };

  const renderFeaturedCard = (app) => {
    const fallbackIcon = esc(getIconFallback(app));
    const preview = Array.isArray(app.screenshots) && app.screenshots.length > 0 ? app.screenshots[0] : '';

    return `
      <article class="card card-featured">
        <div class="card-featured-content">
          <p class="card-meta">${renderMetaLine(app, 'Featured')}</p>
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
          <div class="card-actions">
            ${getStoreButton(app, true)}
          </div>
        </div>
        ${preview ? `
          <a class="featured-preview" href="app.html?slug=${encodeURIComponent(app.slug)}" aria-label="${esc(app.name)} interface preview">
            <img src="${esc(preview)}" alt="${esc(app.name)} interface preview" loading="lazy" />
          </a>
        ` : ''}
      </article>
    `;
  };

  const renderStandardCard = (app) => {
    const fallbackIcon = esc(getIconFallback(app));

    return `
      <article class="card">
        <div class="card-top">
          <img
            class="app-squircle-icon"
            src="${esc(app.icon_url)}"
            alt="${esc(app.name)} icon"
            loading="lazy"
            onerror="this.onerror=null;this.src='${fallbackIcon}';"
          />
          <div class="card-top-info">
            <p class="card-meta">${renderMetaLine(app)}</p>
            <h3 class="card-title">${esc(app.name)}</h3>
          </div>
        </div>
        <div class="card-body">
          <p class="card-desc">${esc(app.short_description)}</p>
          <div class="card-actions">
            ${getStoreButton(app)}
          </div>
        </div>
      </article>
    `;
  };

  try {
    let apps = window.LAPHEDUS_APPS;
    if (!Array.isArray(apps)) {
      const res = await fetch('./data/apps.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('apps.json could not be loaded');
      apps = await res.json();
    }

    const categories = ['All', ...new Set(apps.map(app => app.category).filter(Boolean))];
    let activeCategory = 'All';

    const renderApps = () => {
      const filtered = activeCategory === 'All' ? apps : apps.filter(app => app.category === activeCategory);
      const published = filtered.filter(app => app.published === true);
      const unpublished = filtered.filter(app => app.published !== true);
      const featuredApp = activeCategory === 'All' ? published.find(app => app.featured) : null;
      const publishedOthers = featuredApp ? published.filter(app => app.slug !== featuredApp.slug) : published;

      publishedGrid.className = activeCategory === 'All' ? 'app-grid' : 'app-grid app-grid-filtered';
      publishedGrid.innerHTML = (featuredApp ? renderFeaturedCard(featuredApp) : '') + publishedOthers.map(renderStandardCard).join('');
      unpublishedGrid.className = activeCategory === 'All' ? 'app-grid' : 'app-grid app-grid-filtered';
      unpublishedGrid.innerHTML = unpublished.map(renderStandardCard).join('');
      publishedSection.hidden = published.length === 0;
      unpublishedSection.hidden = unpublished.length === 0;
    };

    if (filtersEl) {
      filtersEl.innerHTML = categories.map(cat => `
        <button
          type="button"
          class="filter-tab${cat === activeCategory ? ' is-active' : ''}"
          data-category="${esc(cat)}"
          aria-pressed="${cat === activeCategory ? 'true' : 'false'}"
        >${esc(cat)}</button>
      `).join('');

      filtersEl.addEventListener('click', (event) => {
        const btn = event.target.closest('.filter-tab');
        if (!btn) return;
        const nextCat = btn.getAttribute('data-category');
        if (!nextCat || nextCat === activeCategory) return;

        activeCategory = nextCat;
        filtersEl.querySelectorAll('.filter-tab').forEach(tab => {
          const isMatch = tab.getAttribute('data-category') === activeCategory;
          tab.classList.toggle('is-active', isMatch);
          tab.setAttribute('aria-pressed', String(isMatch));
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
