document.addEventListener('DOMContentLoaded', async () => {
  const slug = new URLSearchParams(location.search).get('app');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const backToApp = document.getElementById('backToApp');
  if (backToApp && slug) backToApp.href = 'app.html?slug=' + encodeURIComponent(slug);
  if (!slug) return;
  const content = document.getElementById('policyContent');
  try {
    let terms = window.LAPHEDUS_TERMS;
    if (!terms || typeof terms !== 'object') {
      const termsResponse = await fetch('./data/terms.json');
      if (!termsResponse.ok) throw new Error('Terms unavailable');
      terms = await termsResponse.json();
    }
    const termsText = terms[slug];
    if (typeof termsText !== 'string' || !termsText.trim()) throw new Error('Unknown app');
    // Keep this page independent from apps.json so a missing app catalog cannot
    // prevent otherwise available legal text from rendering.
    const appName = termsText.split(/\s+—\s+Terms of Use(?:\s|$)/i, 1)[0] || slug;
    document.getElementById('appName').textContent = appName;
    document.title = 'Terms of Use | ' + appName;
    if (window.LaphedusUI?.renderFormattedDocument) {
      window.LaphedusUI.renderFormattedDocument(content, termsText);
    } else {
      const pre = document.createElement('pre');
      pre.textContent = termsText;
      content.replaceChildren(pre);
    }
    const defaultTerms = document.getElementById('defaultTerms');
    if (defaultTerms) defaultTerms.hidden = true;
    const privacy = document.createElement('a');
    privacy.href = 'privacy.html?app=' + encodeURIComponent(slug);
    privacy.textContent = 'Read the privacy policy for ' + appName;
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
