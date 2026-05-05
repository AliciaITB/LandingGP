
const pages = [
  {
    title: "Landing - Estática",
    version: "v1.0",
    date: "2026-05-01",
    description: "Página principal con la información de Glass Point",
    labels: [{ text: "Marketing", color: "v-pink" }],
    accentColor: "var(--accent-pink)",
    url: "Landing/index.html",
    checks: [
      "Estructura","Textos","Bloques de información"    ]
  },
    {
    title: "Landing - Dinámica",
    version: "v2.0",
    date: "2026-05-01",
    description: "Amarillos - Página principal con la información de Glass Point",
    labels: [{ text: "Marketing", color: "v-pink" }],
    accentColor: "var(--accent-pink)",
    url: "LandingAmarillo_v2/index.html",
    checks: [
      "Dinamismo, se entiendes?","Mismos bloques de información que anterior, mismos cambios?", "Dónde poner el logo"   ]
  },
{
    title: "Desarrollo",
    version: "v1.0",
    date: "2026-05-01",
    description: "Desarrollo del proyecto hecho por Yeneviel. Aquí se revisará la parte de desarrollo, funcionalidades, diseño, etc. CoordinadorEmail: sytemAdmin@gmail.com (contraseña: nombre antes de la @) , email: coachUser@gmail.com (contraseña: coachUser), email: captainUser@gmail.com (contraseña: captainUser), email: user1@gmail.com (contraseña: user123!), email: user2@gmail.com (contraseña: user123!)",
    labels: [{ text: "Dev", color: "v-blue" }],
    accentColor: "var(--accent-pink)",
    url: "https://padel-ai-app-api.vercel.app/",
    checks: [
      "Funcionalidad","Diseño: Deberemos actualizar el diseño según logo."   ]
  },

  

    {
    title: "FormAI",
    version: "v1.0",
    date: "2026-05-01",
    description: "Página con los formularios, calculos de arquetipo y demás.",
    labels: [{ text: "Dev", color: "v-blue" }],
    accentColor: "var(--accent-pink)",
    url: "https://form-ai-padel.replit.app/",
    checks: [
      "Página de arquetipos","Calculos de arquetipos","Pantallas en general", "Diseños"   ]
  },
    {
    title: "Diseño",
    version: "v0.0",
    date: "2026-05-01",
    description: "Crear cuenta",
    labels: [{ text: "Marketing", color: "v-pink" }],
    accentColor: "var(--accent-pink)",
    url: "https://stitch.withgoogle.com/projects/9622752504950992612",
    checks: [
      "Diseñar"   ]
  },
  {
    title: "Instagram",
    version: "v0.0",
    date: "2026-05-01",
    description: "Crear cuenta",
    labels: [{ text: "Marketing", color: "v-pink" }],
    accentColor: "var(--accent-pink)",
    url: "",
    checks: [
      "Crear cuenta","Publicar contenido"   ]
  },
  
];

function renderSvgCheck() {
  return `<svg class="check-icon" viewBox="0 0 10 10" fill="none">
    <polyline points="1.5,5 4,7.5 8.5,2" stroke="#0f0f11" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function updateProgress(card, cardData) {
  const items = card.querySelectorAll('.checklist li');
  const done = card.querySelectorAll('.checklist li.checked').length;
  const total = items.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  card.querySelector('.progress-bar').style.width = pct + '%';
  card.querySelector('.progress-label').textContent = pct + '% completado';
  card.querySelector('.completion-count').innerHTML = `<span>${done}</span> / ${total} checks`;
  updateStats();
}

function updateStats() {
  const allItems = document.querySelectorAll('.checklist li');
  const done = document.querySelectorAll('.checklist li.checked').length;
  document.getElementById('totalChecks').textContent = allItems.length;
  document.getElementById('doneChecks').textContent = done;
}

function buildCard(page) {
  const card = document.createElement('div');
  card.className = 'card';

  const labelsHTML = page.labels.map(l =>
    `<span class="label-chip ${l.color}">${l.text}</span>`
  ).join('');

  const checksHTML = page.checks.map((c, i) =>
    `<li data-idx="${i}">
      <div class="check-box">${renderSvgCheck()}</div>
      <span>${c}</span>
    </li>`
  ).join('');

  card.innerHTML = `
    <div class="card-header">
      <div class="card-top">
        <h2 class="card-title">${page.title}</h2>
        <span class="version-badge v-green">${page.version}</span>
      </div>
      <div class="card-meta">
        <span class="date">${new Date(page.date).toLocaleDateString('es-ES', { day:'2-digit', month:'short', year:'numeric' })}</span>
        ${labelsHTML}
      </div>
      <p class="description">${page.description}</p>
    </div>
    <div class="card-body">
      <div class="checklist-title">Checklist de revisión</div>
      <ul class="checklist">${checksHTML}</ul>
      <div class="progress-bar-wrap"><div class="progress-bar" style="width:0%"></div></div>
      <div class="progress-label">0% completado</div>
    </div>
    <div class="card-footer">
      <span class="completion-count"><span>0</span> / ${page.checks.length} checks</span>
      <a class="visit-btn" href="${page.url}" target="_blank" rel="noopener">
        Visitar página
        <svg viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
  `;

  card.querySelectorAll('.checklist li').forEach(li => {
    li.addEventListener('click', () => {
      li.classList.toggle('checked');
      updateProgress(card, page);
    });
  });

  return card;
}

const grid = document.getElementById('cardGrid');
pages.forEach(p => grid.appendChild(buildCard(p)));
document.getElementById('totalCards').textContent = pages.length;
updateStats();
