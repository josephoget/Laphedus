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
  return `
    <div class="stamper-shell">
      <section class="stamper-hero">
        <div class="stamper-hero-copy">
          <div class="stamper-badge">Local-first memory crafting</div>
          <h1 class="stamper-title">${app.name}</h1>
          <p class="stamper-lead">
            Turn quiet everyday moments into collectible stamp memories with a page that feels warm,
            tactile, and intentionally curated from the very first glance.
          </p>
          <div class="stamper-actions">
            <a class="btn primary" href="privacy.html?app=${encodeURIComponent(app.slug)}">Privacy</a>
            <a class="btn stamper-secondary" href="index.html">All Apps</a>
          </div>
          <div class="stamper-notes">
            <div class="stamper-note">
              <strong>Gentle by default</strong>
              <span>No cluttered dashboard, no heavy-handed UI, just a focused memory album feel.</span>
            </div>
            <div class="stamper-note">
              <strong>Made for keepsakes</strong>
              <span>Every section frames Stamper as a crafted collection rather than a utility app.</span>
            </div>
          </div>
        </div>
        <div class="stamper-hero-card">
          <div class="stamper-orb stamper-orb-one"></div>
          <div class="stamper-orb stamper-orb-two"></div>
          <div class="stamper-paper">
            <div class="stamper-icon-wrap">
              <img class="stamper-app-icon" src="${app.icon_url}" alt="${app.name} icon" />
            </div>
          </div>
          <div class="stamper-card-copy">
            <span class="stamper-eyebrow">${app.category ?? 'Photos and Memories'}</span>
            <strong>A digital album with an artisanal tone</strong>
            <p>
              Built for users who want stamp-style keepsakes, calm organization, and full respect for
              personal data boundaries.
            </p>
          </div>
        </div>
      </section>

      <section class="stamper-grid" aria-label="Stamper highlights">
        <article class="stamper-panel stamper-panel-tilt-left">
          <span class="stamper-kicker">Create</span>
          <h2>Turn moments into collectible digital stamps</h2>
          <p>
            Select a photo from your camera or gallery, transform it into a stamp-like memory, and place it
            into albums that feel curated rather than cluttered.
          </p>
        </article>

        <article class="stamper-panel stamper-panel-center">
          <span class="stamper-kicker">Organize</span>
          <h2>Albums designed for clarity</h2>
          <p>
            Stamper keeps your growing collection readable and intentional, making it easy to revisit favorite
            moments without the noise of a traditional gallery.
          </p>
        </article>

        <article class="stamper-panel stamper-panel-tilt-right">
          <span class="stamper-kicker">Protect</span>
          <h2>Your memories stay on your device</h2>
          <p>
            Stamper does not require an account. Your created content is stored locally on your device, giving
            users a simpler and more privacy-conscious experience from the start.
          </p>
        </article>
      </section>

      <section class="stamper-story">
        <div class="stamper-story-copy">
          <span class="stamper-kicker">Atmosphere</span>
          <h2>Soft editorial rhythm instead of a generic app pitch</h2>
          <p>
            Stamper works best when the page feels like a keepsake journal: airy spacing, natural tones,
            tactile cards, and messaging that centers memory, sentiment, and simplicity.
          </p>
        </div>
        <div class="stamper-stat-stack">
          <div class="stamper-stat">
            <strong>Local-first</strong>
            <span>No account required for core usage.</span>
          </div>
          <div class="stamper-stat">
            <strong>Premium-ready</strong>
            <span>Google Play Billing and RevenueCat support premium features.</span>
          </div>
          <div class="stamper-stat">
            <strong>Single-purpose</strong>
            <span>Crafted around collectible photo memories, not generic storage.</span>
          </div>
        </div>
      </section>

      <section class="stamper-closing">
        <div class="stamper-closing-copy">
          <span class="stamper-kicker">Privacy</span>
          <h2>Privacy stays simple and separate</h2>
          <p>
            The privacy action leads directly to the dedicated privacy page for Stamper, while this product page
            stays focused on brand tone and product presentation.
          </p>
        </div>
        <a class="btn primary" href="privacy.html?app=${encodeURIComponent(app.slug)}">Open Privacy Policy</a>
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
