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
          <div class="stamper-badge">Photo keepsakes, reimagined</div>
          <h1 class="stamper-title">${app.name}</h1>
          <p class="stamper-lead">
            A warmer, more personal way to turn everyday photos into collectible stamp memories and keep them
            beautifully organized in albums.
          </p>
          <div class="stamper-actions">
            ${playAction}
            <a class="btn" href="privacy.html?app=${encodeURIComponent(app.slug)}">Privacy Policy</a>
            <a class="btn" href="index.html">All Apps</a>
          </div>
          <div class="stamper-notes">
            <div class="stamper-note">
              <strong>Create</strong>
              <span>Turn camera and gallery photos into stamp-style digital keepsakes.</span>
            </div>
            <div class="stamper-note">
              <strong>Keep</strong>
              <span>Build personal albums that feel curated instead of crowded.</span>
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
            <strong>Soft, personal, album-first</strong>
            <p>
              Stamper is positioned around emotional value and memory collecting, not generic cloud storage.
            </p>
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

      <section class="stamper-story">
        <div class="stamper-story-copy">
          <span class="stamper-kicker">Why it feels different</span>
          <h2>Built for memory collecting instead of generic photo management</h2>
          <p>
            Stamper gives ordinary photos a keepsake quality. The page language and layout now support that idea
            with a lighter, warmer presentation that feels more boutique and product-led.
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

      <section class="stamper-gallery">
        <div class="stamper-gallery-head">
          <span class="stamper-kicker">Preview</span>
          <h2>App visuals and product feel</h2>
          <p>
            Visuals are back on the page so Stamper feels like a complete product presentation again.
          </p>
        </div>
        <div class="stamper-screens">
          ${(app.screenshots ?? []).map((src, index) => `
            <figure class="stamper-screen-card">
              <img class="stamper-screen" src="${src}" alt="${app.name} screenshot ${index + 1}" loading="lazy" />
            </figure>
          `).join('')}
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
