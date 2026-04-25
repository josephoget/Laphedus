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
    <section class="product-hero product-hero-stamper">
      <div class="product-hero-copy">
        <p class="product-eyebrow">${app.eyebrow ?? ''}</p>
        <h1 class="product-title">${app.hero_title ?? app.name}</h1>
        <p class="product-lead">${app.hero_description ?? app.short_description}</p>
        <div class="product-actions">
          <a class="btn primary" href="${app.play_store_url}" target="_blank" rel="noopener">${app.primary_cta_label ?? 'Open on Google Play'}</a>
          ${legalActions}
        </div>
      </div>
      <aside class="product-hero-card">
        <img class="product-icon" src="${app.icon_url}" alt="${app.name} icon" />
        <div class="product-hero-card-body">
          <h2>${app.name}</h2>
          <p>${app.short_description}</p>
          <ul class="product-inline-points">
            ${(app.trust_points ?? []).map(point => `<li>${point}</li>`).join('')}
          </ul>
        </div>
      </aside>
    </section>

    <section class="product-section product-section-intro">
      <div class="product-section-heading">
        <p class="section-kicker">Why Stamper</p>
        <h2>A softer, more intentional way to keep your memories.</h2>
      </div>
      <p class="product-prose">${app.intro ?? app.long_description}</p>
      ${renderList(app.benefits, 'benefit-list', item => `<article class="benefit-item"><p>${item}</p></article>`)}
    </section>

    <section class="product-section">
      <div class="product-section-heading">
        <p class="section-kicker">Core Experience</p>
        <h2>What you can do with Stamper</h2>
      </div>
      ${renderList(app.highlights, 'feature-grid', item => `
        <article class="feature-card">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `)}
    </section>

    <section class="product-section">
      <div class="product-section-heading">
        <p class="section-kicker">How It Works</p>
        <h2>Three simple steps from photo to collection</h2>
      </div>
      ${renderList(app.how_it_works, 'steps-grid', (item, index) => `
        <article class="step-card">
          <span class="step-number">0${index + 1}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `)}
    </section>

    <section class="product-section product-section-trust">
      <div class="product-section-heading">
        <p class="section-kicker">Privacy and Ownership</p>
        <h2>Built to keep your memories under your control</h2>
      </div>
      <p class="product-prose">${app.long_description}</p>
      ${renderList(app.trust_points, 'trust-list', item => `<article class="trust-item"><p>${item}</p></article>`)}
    </section>

    <section class="product-cta">
      <div>
        <p class="section-kicker">Get Started</p>
        <h2>${app.cta_title ?? app.name}</h2>
        <p>${app.cta_description ?? app.short_description}</p>
      </div>
      <div class="product-actions">
        <a class="btn primary" href="${app.play_store_url}" target="_blank" rel="noopener">${app.primary_cta_label ?? 'Open on Google Play'}</a>
        <a class="btn" href="index.html">Other Apps</a>
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
      <div class="generic-app-header">
        <img class="app-icon" src="${app.icon_url}" alt="${app.name} icon" />
        <div>
          <h1 class="app-title">${app.name}</h1>
          <div class="app-meta">${app.category ?? ''}</div>
          <p class="product-prose">${app.short_description}</p>
        </div>
      </div>

      <div class="app-actions">
        ${primaryAction}
        ${legalActions}
        <a class="btn" href="index.html">Other Apps</a>
      </div>

      <div class="app-section">
        <h3>Overview</h3>
        <p>${app.long_description}</p>
      </div>

      ${(app.screenshots ?? []).length > 0 ? `
        <div class="app-section">
          <h3>Screenshots</h3>
          <div class="screens">
            ${(app.screenshots ?? []).map(src => `<img class="screen" src="${src}" alt="Screenshot" loading="lazy" />`).join('')}
          </div>
        </div>
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
