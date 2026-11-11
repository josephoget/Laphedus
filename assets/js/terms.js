document.addEventListener('DOMContentLoaded', async () => {
  const slug = new URLSearchParams(location.search).get('app');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const backToApp = document.getElementById('backToApp');
  if (backToApp && slug) backToApp.href = 'app.html?slug=' + encodeURIComponent(slug);
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
    const pre = document.createElement('pre');
    pre.textContent = terms[slug];
    content.replaceChildren(pre);
    const defaultTerms = document.getElementById('defaultTerms');
    if (defaultTerms) defaultTerms.hidden = true;
    const privacy = document.createElement('a');
    privacy.href = 'privacy.html?app=' + encodeURIComponent(slug);
    privacy.textContent = 'Read the privacy policy for ' + app.name;
    const related = document.createElement('p');
    related.appendChild(privacy);
    const support = document.createElement('a');
    support.href = 'support.html?app=' + encodeURIComponent(slug);
    support.textContent = 'Support';
    related.append(' · ', support);
    if (['kayfe', 'nowa4', 'breathe-calm'].includes(slug)) {
      const deletion = document.createElement('a');
      deletion.href = 'account-deletion.html?app=' + encodeURIComponent(slug);
      deletion.textContent = 'Account / data deletion';
      related.append(' · ', deletion);
    }
    content.appendChild(related);
  } catch (error) {
    content.textContent = 'The selected app’s terms could not be loaded. Select an app below or contact laphedusapp@gmail.com.';
  }
});
