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
          <div class="stamper-hero-head">
            <div class="stamper-mini-icon-wrap">
              <img class="stamper-mini-icon" src="${app.icon_url}" alt="${app.name} icon" />
            </div>
            <div class="stamper-hero-head-copy">
              <div class="stamper-badge">Photo keepsakes, reimagined</div>
              <div class="stamper-meta-line">${app.category ?? 'Photos and Memories'} · Local-first Android app</div>
            </div>
          </div>
          <h1 class="stamper-title">${app.name}</h1>
          <p class="stamper-lead">
            Turn everyday photos into collectible stamp memories, organize them into albums, and keep the whole
            experience personal, calm, and beautifully easy to understand.
          </p>
          <div class="stamper-actions">
            ${playAction}
            <a class="btn" href="privacy.html?app=${encodeURIComponent(app.slug)}">Privacy Policy</a>
            <a class="btn" href="index.html">All Apps</a>
          </div>
          <div class="stamper-notes">
            <div class="stamper-note">
              <strong>Create from your own photos</strong>
              <span>Use camera or gallery images to build digital stamps that feel personal and collectible.</span>
            </div>
            <div class="stamper-note">
              <strong>Keep memories organized</strong>
              <span>Save them inside albums that feel curated, readable, and pleasant to revisit.</span>
            </div>
          </div>
        </div>
        <div class="stamper-hero-card">
          <div class="stamper-paper">
            <div class="stamper-icon-wrap">
              <img class="stamper-app-icon" src="${app.icon_url}" alt="${app.name} icon" />
            </div>
          </div>
          <div class="stamper-card-copy">
            <span class="stamper-eyebrow">${app.category ?? 'Photos and Memories'}</span>
            <strong>A clearer way to understand the product at first glance</strong>
            <p>
              Stamper is built around memory collecting, not generic file storage. The app is for users who want
              their moments to feel saved with intention.
            </p>
          </div>
          <div class="stamper-highlight-list">
            <div class="stamper-highlight-item">No account required for core usage</div>
            <div class="stamper-highlight-item">Albums designed for personal collections</div>
            <div class="stamper-highlight-item">Premium features via Google Play Billing</div>
          </div>
        </div>
      </section>

      <section class="stamper-grid" aria-label="Stamper features">
        <article class="stamper-panel">
          <span class="stamper-kicker">Feature</span>
          <h2>Stamp-style creation</h2>
          <p>
            Users can transform selected photos into distinctive digital stamp memories with a playful but
            polished presentation.
          </p>
        </article>

        <article class="stamper-panel">
          <span class="stamper-kicker">Feature</span>
          <h2>Album organization</h2>
          <p>
            Collections stay easy to browse, revisit, and arrange inside dedicated albums built around clarity.
          </p>
        </article>

        <article class="stamper-panel">
          <span class="stamper-kicker">Feature</span>
          <h2>Local-first privacy</h2>
          <p>
            The app does not require an account for core usage and keeps content stored on the user’s device.
          </p>
        </article>
      </section>

      <section class="stamper-explainer">
        <div class="stamper-explainer-copy">
          <span class="stamper-kicker">What Stamper does</span>
          <h2>A simple product story users can understand quickly</h2>
          <p>
            Stamper helps users take ordinary photos and turn them into something more memorable. Instead of
            leaving images buried inside a camera roll, the app reframes them as stamp-like keepsakes that can be
            grouped, saved, and enjoyed as a growing personal collection.
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
          <span class="stamper-kicker">Why download it</span>
          <h2>Made for people who want their photos to feel more special</h2>
          <p>
            Stamper gives ordinary photos a keepsake quality. It is a better fit for users who want a focused,
            emotionally warm product instead of a crowded general-purpose photo tool.
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
          <h2>Who Stamper is designed for</h2>
          <p>
            This page should help visitors decide quickly whether Stamper matches what they want from a memory app.
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
