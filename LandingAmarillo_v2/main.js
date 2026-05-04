// GLASS POINT — Landing interactions

// Form submission
const form = document.querySelector('.signup__form');
const successMsg = document.getElementById('successMsg');

if (form && successMsg) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.style.opacity = '0.4';
    form.style.pointerEvents = 'none';

    setTimeout(() => {
      form.style.display = 'none';
      successMsg.classList.add('visible');
    }, 600);
  });
}

// Smooth active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--primary)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Hero interactive strategy board
const board = document.querySelector('.strategy-board');
const switchCombo = document.getElementById('switchCombo');
const comboStatus = document.getElementById('comboStatus');
const comboInsight = document.getElementById('comboInsight');

const combinations = [
  {
    status: 'Mejor encaje',
    insight: 'Constructora + Finalizadora: una sostiene, la otra decide.',
    className: ''
  },
  {
    status: 'Riesgo alto',
    insight: 'Finalizadora + Aceleradora: mucho ataque, poco control si el partido se rompe.',
    className: 'is-risk'
  },
  {
    status: 'Equilibrio',
    insight: 'Ordenadora + Estabilizadora: ideal para partidos largos y puntos importantes.',
    className: 'is-balanced'
  }
];

let comboIndex = 0;

function updateCombination(nextIndex) {
  if (!board || !comboStatus || !comboInsight) return;

  comboIndex = nextIndex % combinations.length;
  const combo = combinations[comboIndex];

  board.dataset.combination = String(comboIndex);
  board.classList.remove('is-risk', 'is-balanced');

  if (combo.className) {
    board.classList.add(combo.className);
  }

  comboStatus.textContent = combo.status;
  comboInsight.textContent = combo.insight;
}

if (switchCombo && board) {
  switchCombo.addEventListener('click', (event) => {
    event.stopPropagation();
    updateCombination(comboIndex + 1);
  });

  board.addEventListener('click', () => {
    updateCombination(comboIndex + 1);
  });

  setInterval(() => {
    if (!document.hidden) {
      updateCombination(comboIndex + 1);
    }
  }, 5200);
}

// Archetype compatibility interactions
const archetypeGrid = document.getElementById('archetypeGrid');
const archetypeCards = document.querySelectorAll('.archetype-card[data-role]');
const archetypeInsight = document.getElementById('archetypeInsight');

const roleLabels = {
  arquitecta: 'Arquitecta',
  definidora: 'Definidora',
  defensora: 'Defensora',
  impulsora: 'Impulsora',
  competidora: 'Competidora'
};

function clearArchetypes() {
  if (!archetypeGrid) return;

  archetypeGrid.classList.remove('is-filtering');
  archetypeCards.forEach(card => {
    card.classList.remove('is-selected', 'is-compatible');
  });

  if (archetypeInsight) {
    archetypeInsight.textContent = 'Elige un arquetipo para ver sus mejores conexiones.';
  }
}

function activateArchetype(card) {
  if (!archetypeGrid || !card) return;

  const role = card.dataset.role;
  const compatible = (card.dataset.compatible || '').split(',').filter(Boolean);

  archetypeGrid.classList.add('is-filtering');

  archetypeCards.forEach(item => {
    item.classList.remove('is-selected', 'is-compatible');

    if (item.dataset.role === role) {
      item.classList.add('is-selected');
    }

    if (compatible.includes(item.dataset.role)) {
      item.classList.add('is-compatible');
    }
  });

  if (archetypeInsight) {
    const names = compatible.map(key => roleLabels[key]).join(' + ');
    archetypeInsight.textContent = `${roleLabels[role]} conecta especialmente bien con: ${names}.`;
  }
}

archetypeCards.forEach(card => {
  card.addEventListener('mouseenter', () => activateArchetype(card));
  card.addEventListener('focus', () => activateArchetype(card));
  card.addEventListener('click', () => activateArchetype(card));
});

if (archetypeGrid) {
  archetypeGrid.addEventListener('mouseleave', clearArchetypes);
}

// Scroll reveal animation
const revealItems = document.querySelectorAll(
  '.pain-card, .comparison__col, .feature-card, .differential__inner, .archetype-card, .lineup-lab__inner, .step, .testimonial-card, .signup__inner'
);

revealItems.forEach(item => item.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach(item => revealObserver.observe(item));

// Lab rows: make the winning row rotate visually
const labRows = document.querySelectorAll('.lineup-lab__row');

if (labRows.length) {
  let activeLabIndex = 0;

  setInterval(() => {
    labRows.forEach(row => row.classList.remove('is-active'));
    activeLabIndex = (activeLabIndex + 1) % labRows.length;

    if (!labRows[activeLabIndex].classList.contains('is-risk')) {
      labRows[activeLabIndex].classList.add('is-active');
    } else {
      labRows[0].classList.add('is-active');
    }
  }, 3600);
}
