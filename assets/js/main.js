document.addEventListener('DOMContentLoaded', async () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const grid = document.getElementById('app-grid');
  const fallback = document.getElementById('app-grid-fallback');

  try {
    const res = await fetch('data/apps.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('apps.json yüklenemedi');
    const apps = await res.json();

    grid.innerHTML = apps.map(app => `
      <article class="card">
        <div class="card-media">
          <img src="${app.icon_url}" alt="${app.name} ikon" loading="lazy" />
        </div>
        <div class="card-body">
          <h3 class="card-title">${app.name}</h3>
          <p class="card-desc">${app.short_description}</p>
          <div class="card-actions">
            <a class="btn primary" href="app.html?slug=${encodeURIComponent(app.slug)}">Detay</a>
            <a class="btn" href="${app.play_store_url}" target="_blank" rel="noopener">Mağaza</a>
          </div>
        </div>
      </article>
    `).join('');

    fallback.hidden = true;
  } catch (err) {
    console.error(err);
    fallback.hidden = false;
  }
});