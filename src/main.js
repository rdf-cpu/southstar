import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Southstar home"><span class="brand-mark">N</span> Southstar</a>
      <span class="env-pill"><span></span> Southstar Registration</span>
    </header>

    <section class="hero">
      <div class="eyebrow">WORKSPACE ACCESS</div>
      <h1>Create your account</h1>
      <p class="intro">Set up a Southstar workspace profile to get started.</p>
    </section>

    <section class="layout">
      <article class="panel form-panel">
        <div class="panel-heading">
          <div>
            <h2>Personal details</h2>
            <p>All fields are required.</p>
          </div>
          <span class="step">STEP 01 / 01</span>
        </div>

        <form id="signup-form" novalidate>
          <div class="field">
            <label for="fullName">Full name <span>*</span></label>
            <input id="fullName" name="fullName" autocomplete="name" placeholder="e.g. Alex Morgan" />
            <p class="hint">Use the name you want displayed in your workspace.</p>
            <p class="error" id="name-error" role="alert" hidden>Please enter your full name.</p>
          </div>

          <div class="field">
            <label for="email">Work email <span>*</span></label>
            <input id="email" name="email" type="email" autocomplete="email" placeholder="alex@company.com" />
            <p class="error" id="email-error" role="alert" hidden>Enter a valid work email address.</p>
          </div>

          <div class="field">
            <label for="team">Team <span>*</span></label>
            <select id="team" name="team">
              <option value="">Choose a team</option>
              <option>Engineering</option>
              <option>Product</option>
              <option>Design</option>
              <option>Quality Assurance</option>
            </select>
            <p class="error" id="team-error" role="alert" hidden>Select a team.</p>
          </div>

          <label class="check-row">
            <input id="terms" type="checkbox" />
            <span>I agree to the workspace terms and acceptable-use policy.</span>
          </label>
          <p class="error terms-error" id="terms-error" role="alert" hidden>You must accept the terms to continue.</p>

          <button class="submit" type="submit">Create workspace profile <span aria-hidden="true">→</span></button>
          <p class="form-footnote">Southstar</p>
          <div id="success" class="success" role="status" hidden></div>
        </form>
      </article>

      <aside class="side-column">
        <section class="panel note-panel">
          <div class="note-icon">✳</div>
          <h3>Why Southstar?</h3>
          <p>A focused space for teams to plan, build and ship better work together.</p>
          <ul>
            <li><span>✓</span> One shared workspace</li>
            <li><span>✓</span> Clear team ownership</li>
            <li><span>✓</span> Simple member management</li>
          </ul>
        </section>
        <section class="panel records-panel">
          <div class="records-head">
            <div><h3>Session records</h3><p>Created in this browser</p></div>
            <span id="record-count" class="count">0</span>
          </div>
          <div id="records" class="records-empty">No profiles created yet.</div>
          <button id="reset" class="reset" type="button">Reset session records</button>
        </section>
      </aside>
    </section>
    <footer>Southstar application <span>•</span> Built for Southstar</footer>
  </main>
`;

const form = document.querySelector('#signup-form');
const recordsEl = document.querySelector('#records');
const countEl = document.querySelector('#record-count');
const records = [];

function showError(id, visible) {
  document.querySelector(`#${id}`).hidden = !visible;
}

function renderRecords() {
  countEl.textContent = String(records.length);
  if (!records.length) {
    recordsEl.className = 'records-empty';
    recordsEl.textContent = 'No profiles created yet.';
    return;
  }
  recordsEl.className = 'record-list';
  recordsEl.innerHTML = records.map(record => `
    <div class="record">
      <span class="avatar">${record.name.trim().charAt(0).toUpperCase()}</span>
      <div><strong>${escapeHtml(record.name)}</strong><small>${escapeHtml(record.email)} · ${escapeHtml(record.team)}</small></div>
    </div>
  `).join('');
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.querySelector('#fullName').value;
  const email = document.querySelector('#email').value.trim();
  const team = document.querySelector('#team').value;
  const terms = document.querySelector('#terms').checked;

  const nameInvalid = !name;
  const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const teamInvalid = !team;
  const termsInvalid = !terms;

  showError('name-error', nameInvalid);
  showError('email-error', emailInvalid);
  showError('team-error', teamInvalid);
  showError('terms-error', termsInvalid);

  if (nameInvalid || emailInvalid || teamInvalid || termsInvalid) {
    document.querySelector('#success').hidden = true;
    return;
  }

  // Save registration details for the success page
  sessionStorage.setItem(
    'southstarRegistration',
    JSON.stringify({
      fullName: name,
      email: email,
      team: team
    })
  );

  // Redirect only after successful validation
  window.location.href = '/success.html';
});

document.querySelector('#reset').addEventListener('click', () => {
  records.splice(0, records.length);
  renderRecords();
  document.querySelector('#success').hidden = true;
});