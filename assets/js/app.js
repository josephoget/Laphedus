function qs(name) {
  const p = new URLSearchParams(window.location.search);
  return p.get(name);
}

function renderDefaultApp(app) {
  const primaryAction = app.play_store_url
    ? `<a class="btn primary" href="${app.play_store_url}" target="_blank" rel="noopener">Open on Google Play</a>`
    : app.external_url
      ? `<a class="btn primary" href="${app.external_url}">${app.external_label ?? 'Open Details'}</a>`
      : '';
  const isAccountless = app.has_account === false;
  const backAction = app.slug === 'dinamik-ada'
    ? ''
    : `<a class="btn" href="index.html">Other Apps</a>`;
  const legalActions = [
    `<a class="btn" href="privacy.html?app=${encodeURIComponent(app.slug)}">Privacy Policy</a>`,
    app.has_terms ? `<a class="btn" href="terms.html?app=${encodeURIComponent(app.slug)}">Terms of Use</a>` : '',
    app.has_support ? `<a class="btn" href="support.html?app=${encodeURIComponent(app.slug)}">Support</a>` : '',
    isAccountless ? '' : `<a class="btn" href="account-deletion.html?app=${encodeURIComponent(app.slug)}">Account Deletion</a>`
  ].filter(Boolean).join('');

  return `
    <div>
      <img class="app-icon" src="${app.icon_url}" alt="${app.name} icon" />
    </div>
    <div>
      <h1 class="app-title">${app.name}</h1>
      <div class="app-meta">${app.category ?? ''}</div>

      <div class="app-actions">
        ${primaryAction}
        ${backAction}
        ${legalActions}
      </div>

      <div class="app-section">
        <h3>Summary</h3>
        <p>${app.short_description}</p>
      </div>

      <div class="app-section">
        <h3>Details</h3>
        <p>${app.long_description}</p>
      </div>

      <div class="app-section">
        <h3>Screenshots</h3>
        <div class="screens">
          ${(app.screenshots ?? []).map(src => `<img class="screen" src="${src}" alt="Screenshot" loading="lazy" />`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderStamperPage(app) {
  const playAction = app.play_store_url
    ? `<a class="btn primary" href="${app.play_store_url}" target="_blank" rel="noopener">View on Google Play</a>`
    : '';

  return `
    <div class="stamper-shell">
      <section class="stamper-hero">
        <div class="stamper-hero-copy">
          <div class="stamper-badge">Minimal memory albums</div>
          <h1 class="stamper-title">${app.name}</h1>
          <p class="stamper-lead">
            Turn photos into stamp-style keepsakes, organize them in albums, and keep your memories in a calm,
            focused, easy-to-understand experience.
          </p>
          <div class="stamper-actions">
            ${playAction}
            <a class="btn" href="privacy.html?app=${encodeURIComponent(app.slug)}">Privacy Policy</a>
            <a class="btn" href="index.html">All Apps</a>
          </div>
          <div class="stamper-inline-points">
            <span>Create from your own photos</span>
            <span>Organize with albums</span>
            <span>No account required</span>
          </div>
        </div>
        <div class="stamper-hero-card">
          <div class="stamper-icon-frame">
            <img class="stamper-app-icon" src="${app.icon_url}" alt="${app.name} icon" />
          </div>
          <div class="stamper-card-copy">
            <span class="stamper-eyebrow">${app.category ?? 'Photos and Memories'}</span>
            <strong>Built for people who want photo memories to feel more intentional</strong>
            <p>
              Stamper is not a generic gallery. It is a focused product for turning moments into personal,
              collectible, album-based memories.
            </p>
          </div>
          <div class="stamper-card-meta">Android · Local-first · Google Play Billing</div>
        </div>
      </section>

      <section class="stamper-overview">
        <div class="stamper-overview-copy">
          <span class="stamper-kicker">Overview</span>
          <h2>A focused app for turning photos into collectible memories</h2>
          <p>
            Stamper helps users move beyond ordinary photo storage. Instead of leaving moments buried in a gallery,
            it turns selected photos into stamp-style keepsakes and lets them live inside albums that feel more
            personal, organized, and worth returning to.
          </p>
        </div>
        <div class="stamper-columns">
          <div class="stamper-column">
            <h3>What you can do</h3>
            <p>Create stamps from photos, group them into albums, and build a growing memory collection.</p>
          </div>
          <div class="stamper-column">
            <h3>Why it feels different</h3>
            <p>It is calmer than a generic gallery app and more intentional than simple photo storage.</p>
          </div>
          <div class="stamper-column">
            <h3>Why users trust it</h3>
            <p>Core usage stays local-first, simple, and privacy-conscious without requiring an account.</p>
          </div>
        </div>
      </section>
    </div>
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
    const res = await fetch('data/apps.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('apps.json could not be loaded');
    const apps = await res.json();
    const app = apps.find(a => a.slug === slug);

    if (!app) throw new Error('App not found');

    document.title = `${app.name} - LaphedusApp`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', app.short_description);
    const isStamper = app.slug === 'stamper';
    const headerPrivacyLink = document.querySelector('.nav a[href="privacy.html"]');
    document.body.classList.toggle('page-stamper', isStamper);
    container.classList.toggle('app-detail--stamper', isStamper);
    if (headerPrivacyLink) {
      headerPrivacyLink.setAttribute('href', isStamper ? `privacy.html?app=${encodeURIComponent(app.slug)}` : 'privacy.html');
    }
    container.innerHTML = isStamper ? renderStamperPage(app) : renderDefaultApp(app);

    fallback.hidden = true;
  } catch (err) {
    console.error(err);
    fallback.hidden = false;
    container.innerHTML = '';
  }
});
