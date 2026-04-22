function qs(name) {
  const p = new URLSearchParams(window.location.search);
  return p.get(name);
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

    container.innerHTML = `
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

    fallback.hidden = true;
  } catch (err) {
    console.error(err);
    fallback.hidden = false;
    container.innerHTML = '';
  }
});
