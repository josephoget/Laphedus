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
          <div class="stamper-hero-points">
            <div class="stamper-point">
              <strong>Stamp creation</strong>
              <span>Create collectible digital memories from your own photos.</span>
            </div>
            <div class="stamper-point">
              <strong>Album organization</strong>
              <span>Keep memories grouped in a clean and readable structure.</span>
            </div>
            <div class="stamper-point">
              <strong>Local-first privacy</strong>
              <span>No account is required for the core experience.</span>
            </div>
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
          <div class="stamper-card-meta">
            <div class="stamper-card-meta-item">
              <span>Platform</span>
              <strong>Android</strong>
            </div>
            <div class="stamper-card-meta-item">
              <span>Storage</span>
              <strong>Local-first</strong>
            </div>
            <div class="stamper-card-meta-item">
              <span>Premium</span>
              <strong>Google Play Billing</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="stamper-grid" aria-label="Stamper features">
        <article class="stamper-panel">
          <span class="stamper-kicker">01</span>
          <h2>Create stamp-style memories</h2>
          <p>
            Select a photo and transform it into a memory that feels more collectible and expressive than a
            standard gallery image.
          </p>
        </article>

        <article class="stamper-panel">
          <span class="stamper-kicker">02</span>
          <h2>Organize everything into albums</h2>
          <p>
            Build a personal structure for your memories so they stay easy to browse, revisit, and enjoy later.
          </p>
        </article>

        <article class="stamper-panel">
          <span class="stamper-kicker">03</span>
          <h2>Keep the experience private</h2>
          <p>
            Stamper keeps the core experience simple with local-first storage and no mandatory account.
          </p>
        </article>
      </section>

      <section class="stamper-explainer">
        <div class="stamper-explainer-copy">
          <span class="stamper-kicker">How it works</span>
          <h2>A simple flow users understand immediately</h2>
          <p>
            Stamper takes a familiar action, choosing a photo, and turns it into a more meaningful end result:
            a collectible memory that can live inside a curated album instead of disappearing into the camera roll.
          </p>
        </div>
        <div class="stamper-steps">
          <article class="stamper-step">
            <strong>1. Choose a photo</strong>
            <p>Select an image from the camera or gallery.</p>
          </article>
          <article class="stamper-step">
            <strong>2. Turn it into a stamp</strong>
            <p>Create a more playful, collectible version of that memory.</p>
          </article>
          <article class="stamper-step">
            <strong>3. Place it in albums</strong>
            <p>Keep your collection organized and easy to return to later.</p>
          </article>
        </div>
      </section>

      <section class="stamper-story">
        <div class="stamper-story-copy">
          <span class="stamper-kicker">Why people download it</span>
          <h2>A cleaner alternative to generic photo storage</h2>
          <p>
            Users choose Stamper because it gives ordinary photos a more personal format. The product is focused,
            visually calm, and built around the idea of collecting moments rather than just storing files.
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
            <strong>Calm experience</strong>
            <span>A simpler interface centered on collections, albums, and personal memories.</span>
          </div>
        </div>
      </section>

      <section class="stamper-audience">
        <div class="stamper-audience-copy">
          <span class="stamper-kicker">Best for</span>
          <h2>Who Stamper is for</h2>
          <p>
            The page now speaks more clearly to the people most likely to download and enjoy the app.
          </p>
        </div>
        <div class="stamper-audience-grid">
          <article class="stamper-audience-card">
            <strong>Memory keepers</strong>
            <p>Users who want to save moments with more personality than a normal gallery app offers.</p>
          </article>
          <article class="stamper-audience-card">
            <strong>Collectors</strong>
            <p>People who enjoy building themed, visual collections and returning to them over time.</p>
          </article>
          <article class="stamper-audience-card">
            <strong>Privacy-conscious users</strong>
            <p>Anyone who prefers local storage and a lightweight experience without mandatory accounts.</p>
          </article>
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
