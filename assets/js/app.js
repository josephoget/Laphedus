function qs(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderList(items, className, renderer) {
  if (!Array.isArray(items) || items.length === 0) return '';
  return `<div class="${className}">${items.map(renderer).join('')}</div>`;
}

function renderStamperPage(app) {
  const legalActions = [
    `<a class="btn" href="privacy.html?app=${encodeURIComponent(app.slug)}">${app.secondary_cta_label ?? 'Privacy Policy'}</a>`,
    app.has_support ? `<a class="btn" href="support.html?app=${encodeURIComponent(app.slug)}">Support</a>` : '',
    app.has_terms ? `<a class="btn" href="terms.html?app=${encodeURIComponent(app.slug)}">Terms of Use</a>` : ''
  ].filter(Boolean).join('');

  return `
    <section class="stamper-showcase">
      <div class="stamper-showcase-copy">
        <p class="stamper-eyebrow">${app.eyebrow ?? 'Digital memories, kept simple'}</p>
        <h1 class="stamper-display">${app.hero_title ?? app.name}</h1>
        <p class="stamper-summary">${app.hero_description ?? app.short_description}</p>
        <div class="stamper-actions">
          <a class="btn primary" href="${app.play_store_url}" target="_blank" rel="noopener">${app.primary_cta_label ?? 'Open on Google Play'}</a>
          ${legalActions}
        </div>
        <div class="stamper-inline-meta">
          <span>Android</span>
          <span>Local-first</span>
          <span>Album-based</span>
        </div>
      </div>
      <div class="stamper-visual">
        <div class="stamper-logo-shell">
          <img class="stamper-logo" src="${app.icon_url}" alt="${app.name} icon" />
        </div>
      </div>
    </section>

    <section class="stamper-story-grid">
      <article class="stamper-story-card stamper-story-card-wide">
        <p class="stamper-section-label">Overview</p>
        <h2>Built for people who want their memories to feel collected, not buried.</h2>
        <p>${app.intro ?? app.long_description}</p>
      </article>

      ${(app.highlights ?? []).slice(0, 3).map(item => `
        <article class="stamper-story-card">
          <p class="stamper-section-label">Feature</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `).join('')}
    </section>

    <section class="stamper-flow">
      <div class="stamper-flow-head">
        <p class="stamper-section-label">How It Works</p>
        <h2>Three simple steps from photo to keepsake.</h2>
      </div>
      <div class="stamper-flow-steps">
        ${(app.how_it_works ?? []).slice(0, 3).map((item, index) => `
          <article class="stamper-flow-step">
            <span class="stamper-flow-number">0${index + 1}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderGenericPage(app) {
  const primaryAction = app.play_store_url
    ? `<a class="btn primary" href="${app.play_store_url}" target="_blank" rel="noopener">Open on Google Play</a>`
    : app.external_url
      ? `<a class="btn primary" href="${app.external_url}">${app.external_label ?? 'Open Details'}</a>`
      : '';
  const isAccountless = app.has_account === false;
  const legalActions = [
    `<a class="btn" href="privacy.html?app=${encodeURIComponent(app.slug)}">Privacy Policy</a>`,
    app.has_terms ? `<a class="btn" href="terms.html?app=${encodeURIComponent(app.slug)}">Terms of Use</a>` : '',
    app.has_support ? `<a class="btn" href="support.html?app=${encodeURIComponent(app.slug)}">Support</a>` : '',
    isAccountless ? '' : `<a class="btn" href="account-deletion.html?app=${encodeURIComponent(app.slug)}">Account Deletion</a>`
  ].filter(Boolean).join('');

  return `
    <section class="generic-app-shell">
      <section class="generic-showcase">
        <div class="generic-showcase-copy">
          <p class="stamper-eyebrow">${app.category ?? 'App'}</p>
          <h1 class="generic-display">${app.name}</h1>
          <p class="generic-summary">${app.short_description}</p>
          <div class="stamper-actions">
            ${primaryAction}
            ${legalActions}
            <a class="btn" href="index.html">Other Apps</a>
          </div>
        </div>
        <div class="generic-visual">
          <div class="generic-logo-shell">
            <img class="generic-logo" src="${app.icon_url}" alt="${app.name} icon" />
          </div>
        </div>
      </section>

      <section class="generic-story-grid">
        <article class="generic-story-card generic-story-card-wide">
          <p class="stamper-section-label">Overview</p>
          <h2>${app.name} at a glance</h2>
          <p>${app.long_description}</p>
        </article>

        ${((app.screenshots ?? []).slice(0, 3)).map((src, index) => `
          <article class="generic-story-card generic-story-card-image">
            <img class="generic-screen" src="${src}" alt="${app.name} screenshot ${index + 1}" loading="lazy" />
          </article>
        `).join('')}
      </section>

      ${(app.screenshots ?? []).length > 3 ? `
        <section class="generic-gallery">
          <div class="generic-gallery-head">
            <p class="stamper-section-label">Preview</p>
            <h2>More from the app</h2>
          </div>
          <div class="generic-gallery-grid">
            ${(app.screenshots ?? []).slice(3).map((src, index) => `
              <article class="generic-gallery-card">
                <img class="generic-screen" src="${src}" alt="${app.name} gallery image ${index + 4}" loading="lazy" />
              </article>
            `).join('')}
          </div>
        </section>
      ` : ''}
    </section>
  `;
}

document.addEventListener('DOMContentLoaded', async () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const slug = qs('slug');
  const container = document.getElementById('app-detail');
  const fallback = document.getElementById('app-detail-fallback');

  if (!slug) {
    fallback.hidden = false;
    container.innerHTML = '';
    return;
  }

  try {
    const response = await fetch('data/apps.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('apps.json could not be loaded');

    const apps = await response.json();
    const app = apps.find(entry => entry.slug === slug);
    if (!app) throw new Error('App not found');

    document.title = `${app.name} - LaphedusApp`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', app.short_description);
    document.body.classList.add('app-detail-page', `app-theme-${app.slug}`);

    container.className = `app-detail app-detail-${app.slug === 'stamper' ? 'stamper' : 'generic'}`;
    container.innerHTML = app.slug === 'stamper' ? renderStamperPage(app) : renderGenericPage(app);

    fallback.hidden = true;
  } catch (error) {
    console.error(error);
    fallback.hidden = false;
    container.innerHTML = '';
  }
});
