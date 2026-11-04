document.addEventListener('DOMContentLoaded', async () => {
  const slug = new URLSearchParams(location.search).get('app');
  if (!slug) return;
  const content = document.getElementById('policyContent');
  try {
    const [termsResponse, appsResponse] = await Promise.all([fetch('data/terms.json'), fetch('data/apps.json')]);
    if (!termsResponse.ok || !appsResponse.ok) throw new Error('Terms unavailable');
    const [terms, apps] = await Promise.all([termsResponse.json(), appsResponse.json()]);
    const app = apps.find(item => item.slug === slug);
    if (!app || !Object.prototype.hasOwnProperty.call(terms, slug)) throw new Error('Unknown app');
    document.getElementById('appName').textContent = app.name;
    document.title = 'Terms of Use | ' + app.name;
    setPreContent(content, terms[slug], 'defaultTerms');
    const privacy = document.createElement('a');
    privacy.href = 'privacy.html?app=' + encodeURIComponent(slug);
    privacy.textContent = 'Read the privacy policy for ' + app.name;
    content.appendChild(privacy);
  } catch (error) {
    content.textContent = 'The selected app’s terms could not be loaded. Select an app below or contact laphedusapp@gmail.com.';
  }
});
