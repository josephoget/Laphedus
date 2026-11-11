document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('app-grid');
  const filtersEl = document.getElementById('app-filters');
  const fallback = document.getElementById('app-grid-fallback');
  const esc = window.LaphedusUI?.escapeHtml ?? (v => String(v ?? ''));

  const getIconFallback = (app) => app.fallback_icon_url || 'assets/image/laphedus-store-logo.svg';

  const getStoreButton = (app, isFeatured = false) => {
    const label = isFeatured ? 'View Details' : 'Details';
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
    const preview = Array.isArray(app.screenshots) && app.screenshots.length > 0 ? app.screenshots[0] : '';

    return `
      <article class="card app-accent-${esc(app.slug)}">
        ${preview ? `
          <a class="card-preview" href="app.html?slug=${encodeURIComponent(app.slug)}" tabindex="-1" aria-hidden="true">
            <img
              src="${esc(preview)}"
              alt=""
              loading="lazy"
              onerror="this.closest('.card-preview')?.remove();"
            />
          </a>
        ` : ''}
        <div class="card-top">
          <img
            class="app-squircle-icon"
            src="${esc(app.icon_url)}"
            alt="${esc(app.name)} icon"
            loading="lazy"
            onerror="this.onerror=null;this.src='${fallbackIcon}';"
          />
          <div class="card-top-info">
            <div class="card-badges">
              <span class="card-category">${esc(app.category || 'App')}</span>
              ${renderPlatformPill(app)}
              ${renderStatusPill(app)}
            </div>
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
    const res = await fetch('data/apps.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('apps.json could not be loaded');
    const apps = await res.json();

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
