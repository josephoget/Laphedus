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
    if (!res.ok) throw new Error('apps.json yüklenemedi');
    const apps = await res.json();
    const app = apps.find(a => a.slug === slug);

    if (!app) throw new Error('Uygulama bulunamadı');

    document.title = `${app.name} - LaphedusApp`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', app.short_description);

    container.innerHTML = `
      <div>
        <img class="app-icon" src="${app.icon_url}" alt="${app.name} ikon" />
      </div>
      <div>
        <h1 class="app-title">${app.name}</h1>
        <div class="app-meta">${app.category ?? ''}</div>

        <div class="app-actions">
          <a class="btn primary" href="${app.play_store_url}" target="_blank" rel="noopener">Google Play'de Aç</a>
          <a class="btn" href="index.html">Diğer Uygulamalar</a>
          <a class="btn" href="privacy.html?app=${encodeURIComponent(app.slug)}">Gizlilik Politikası</a>
          <a class="btn" href="account-deletion.html?app=${encodeURIComponent(app.slug)}">Hesap Silme</a>
        </div>

        <div class="app-section">
          <h3>Özet</h3>
          <p>${app.short_description}</p>
        </div>

        <div class="app-section">
          <h3>Detay</h3>
          <p>${app.long_description}</p>
        </div>

        <div class="app-section">
          <h3>Ekran Görüntüleri</h3>
          <div class="screens">
            ${(app.screenshots ?? []).map(src => `<img class="screen" src="${src}" alt="Ekran görüntüsü" loading="lazy" />`).join('')}
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