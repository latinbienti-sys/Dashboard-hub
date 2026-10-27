const dashboards = [
  { id: 'lb-cartera', name: 'Cartera y Cobranza', category: 'LATINBIEN', icon: '₡', color: '#213c83', description: 'Gestión de cobranza, ciclos, plan de pagos y segmentos.', keywords: 'cartera cobranza cobros cuotas vencidos ciclos pagos segmentos expedientes pronto pago', url: 'https://latinbienti-sys.github.io/dashboard-latinbien/' },
  { id: 'lb-cierre', name: 'Cierre Comercial', category: 'LATINBIEN', icon: '↗', color: '#f98b10', description: 'Facturación 2026 y cierre comercial del mes.', keywords: 'cierre comercial facturacion ventas 2026', url: 'https://latinbienti-sys.github.io/cierreslb/' },
  { id: 'lb-historico', name: 'Facturación Histórica', category: 'LATINBIEN', icon: '▤', color: '#3d6194', description: 'Facturación mensual de los últimos 24 meses.', keywords: 'historico anual facturacion mensual 24 meses', url: 'https://latinbienti-sys.github.io/historicoanual/' },
  { id: 'lb-solicitudes', name: 'CRM Solicitudes', category: 'LATINBIEN', icon: '◎', color: '#213c83', description: 'Leads y solicitudes de crédito recibidas.', keywords: 'crm solicitudes leads credito clientes', url: 'https://latinbienti-sys.github.io/crmsolicitudes/' },
  { id: 'lb-productos', name: 'Productos más Vendidos', category: 'LATINBIEN', icon: '★', color: '#f98b10', description: 'Ranking y análisis de productos vendidos.', keywords: 'productos mas vendidos ventas ranking analisis', url: '#', building: true },
  { id: 'lb-stock', name: 'Stock en Almacenes', category: 'LATINBIEN', icon: '▦', color: '#213c83', description: 'Inventario disponible por almacén.', keywords: 'stock inventario almacenes existencias logistica', url: '#', building: true },
  { id: 'lb-servicios', name: 'Histórico por Servicio', category: 'LATINBIEN', icon: '◷', color: '#3d6194', description: 'Evolución mensual por línea de servicio.', keywords: 'servicios historico mensual hub', url: 'https://latinbienti-sys.github.io/hubservices/' },
  { id: 'lb-scoring', name: 'Scoring Crediticio', category: 'LATINBIEN', icon: '✓', color: '#213c83', description: 'Análisis de estados de cuenta bancarios.', keywords: 'scoring credito estados de cuenta bancarios riesgo', url: 'https://latinbienti-sys.github.io/scoring/' },
  { id: 'lb-mercado', name: 'Estudio de Mercado', category: 'LATINBIEN', icon: '$', color: '#f98b10', description: 'Precios de referencia en Mérida, Venezuela.', keywords: 'estudio mercado precios merida competencia', url: 'https://latinbienti-sys.github.io/comparativoprecios/' },
  { id: 'lb-comparativo', name: 'Comparación de Precios', category: 'LATINBIEN', icon: '⇄', color: '#3d6194', description: 'Comparativo completo de precios en Mérida.', keywords: 'comparativo precios merida competencia', url: 'https://latinbienti-sys.github.io/comparativo/' },
  { id: 'lb-membresia', name: 'Membresía', category: 'LATINBIEN', icon: '♦', color: '#f98b10', description: 'Club Latinbien: beneficios y estado de membresía.', keywords: 'membresia club beneficios afiliados alianzas', url: 'https://membresia-latinbien.latinbien-membresia.workers.dev/mi-membresia' },
  { id: 'ti-tareas', name: 'Gestión de Tareas TI', category: 'TI', icon: '☰', color: '#213c83', description: 'KPIs y seguimiento de tareas del área de TI.', keywords: 'ti tecnologia tareas kpi gestion', url: 'https://latinbienti-sys.github.io/tindicadores/' },
  { id: 'ti-roadmap', name: 'Roadmap Estratégico TI', category: 'TI', icon: '◆', color: '#f98b10', description: 'Hoja de ruta y proyectos estratégicos de TI.', keywords: 'ti roadmap estrategia proyectos tecnologia', url: 'https://latinbienti-sys.github.io/preoject/' },
  { id: 'honda-crm', name: 'CRM Financiamiento', category: 'HONDA', icon: '◎', color: '#cc0000', description: 'Seguimiento de financiamientos Honda Mérida.', keywords: 'honda crm financiamiento clientes merida', url: 'https://latinbienti-sys.github.io/gestionhonda/' },
  { id: 'honda-inventario', name: 'Inventario Vehículos', category: 'HONDA', icon: '▦', color: '#cc0000', description: 'Vehículos Honda disponibles en LatinBien Motors.', keywords: 'honda inventario vehiculos stock motors', url: 'https://latinbienti-sys.github.io/inventariohonda/' },
  { id: 'honda-simulador', name: 'Simulador Honda', category: 'HONDA', icon: '%', color: '#cc0000', description: 'Simulador de financiamiento LatinBien Motors.', keywords: 'honda simulador financiamiento cuotas motors', url: 'https://script.google.com/macros/s/AKfycbz4SFk3WI3bo2UhdMg5jRcIq2TXoyT3KgaTYuwovbC7sFmgYl0kuWZFqZbxYVuFrUU3/exec' },
  { id: 'bera-dashboard', name: 'Dashboard Bera', category: 'BERA', icon: '⚑', color: '#3d6194', description: 'Indicadores de la línea de motos Bera.', keywords: 'bera motos dashboard ventas', url: 'https://latinbienti-sys.github.io/motosberlb/' }
];

const state = { category: 'Todos', query: '', favoritesOnly: false, sort: 'popular' };
const favoriteKey = 'dashboard-hub-favorites';
const favorites = new Set(JSON.parse(localStorage.getItem(favoriteKey) || '[]'));
const grid = document.querySelector('#dashboard-grid');
const emptyState = document.querySelector('#empty-state');
const count = document.querySelector('#result-count');
const searchInput = document.querySelector('#dashboard-search');
const toast = document.querySelector('#toast');
let toastTimeout;

function getCategories() {
  return ['Todos', ...new Set(dashboards.map((dashboard) => dashboard.category))];
}

function renderCategories() {
  document.querySelector('#category-filters').innerHTML = getCategories().map((category) => `
    <button class="category-button ${state.category === category ? 'is-active' : ''}" type="button" role="tab" aria-selected="${state.category === category}" data-category="${category}">${category}</button>
  `).join('');
}

function filteredDashboards() {
  const query = state.query.trim().toLowerCase();
  const results = dashboards.filter((dashboard) => {
    const matchesCategory = state.category === 'Todos' || dashboard.category === state.category;
    const searchable = `${dashboard.name} ${dashboard.category} ${dashboard.description} ${dashboard.keywords}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesFavorite = !state.favoritesOnly || favorites.has(dashboard.id);
    return matchesCategory && matchesQuery && matchesFavorite;
  });
  if (state.sort === 'favorites') return results.sort((a, b) => Number(favorites.has(b.id)) - Number(favorites.has(a.id)));
  return results.sort((a, b) => Number(favorites.has(b.id)) - Number(favorites.has(a.id)) || dashboards.indexOf(a) - dashboards.indexOf(b));
}

function cardTemplate(dashboard) {
  const isFavorite = favorites.has(dashboard.id);
  return `
    <article class="dashboard-card" style="--card-color: ${dashboard.color};">
      <div class="card-top">
        <div class="app-icon" aria-hidden="true">${dashboard.icon}</div>
        <button class="favorite-button ${isFavorite ? 'is-favorite' : ''}" type="button" aria-label="${isFavorite ? 'Quitar' : 'Agregar'} ${dashboard.name} ${isFavorite ? 'de favoritos' : 'a favoritos'}" aria-pressed="${isFavorite}" data-favorite="${dashboard.id}">${isFavorite ? '★' : '☆'}</button>
      </div>
      <div class="card-content">
        <h3 class="card-title">${dashboard.name}</h3>
        <p class="card-description">${dashboard.description}</p>
      </div>
      <div class="card-footer">
        <span class="card-tag">${dashboard.category}</span>
        ${dashboard.building ? `<button class="open-link is-building" type="button" data-open="${dashboard.id}">En construcción</button>` : `<a class="open-link" href="${dashboard.url}" target="_blank" rel="noopener">Abrir <span>↗</span></a>`}
      </div>
    </article>
  `;
}

function render() {
  renderCategories();
  const results = filteredDashboards();
  grid.innerHTML = results.map(cardTemplate).join('');
  grid.hidden = results.length === 0;
  emptyState.hidden = results.length !== 0;
  count.textContent = results.length;
  document.querySelector('#favorites-only').setAttribute('aria-pressed', String(state.favoritesOnly));
  document.querySelector('#favorites-only').classList.toggle('is-active', state.favoritesOnly);
}

function saveFavorites() {
  localStorage.setItem(favoriteKey, JSON.stringify([...favorites]));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

document.addEventListener('click', (event) => {
  const categoryButton = event.target.closest('[data-category]');
  if (categoryButton) {
    state.category = categoryButton.dataset.category;
    render();
    return;
  }
  const favoriteButton = event.target.closest('[data-favorite]');
  if (favoriteButton) {
    const id = favoriteButton.dataset.favorite;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    saveFavorites();
    render();
    showToast(favorites.has(id) ? 'Dashboard agregado a favoritos' : 'Dashboard retirado de favoritos');
    return;
  }
  const buildingButton = event.target.closest('[data-open]');
  if (buildingButton) {
    const dashboard = dashboards.find((item) => item.id === buildingButton.dataset.open);
    showToast(`${dashboard?.name || 'Dashboard'}: tablero en construcción, pronto disponible`);
    return;
  }
  const openCard = event.target.closest('.dashboard-card');
  if (openCard && !event.target.closest('button, a')) {
    openCard.querySelector('.open-link')?.click();
  }
});

searchInput?.addEventListener('input', (event) => { state.query = event.target.value; render(); });
document.querySelector('#favorites-only').addEventListener('click', () => { state.favoritesOnly = !state.favoritesOnly; render(); });
document.querySelector('#sort-button').addEventListener('click', () => {
  state.sort = state.sort === 'popular' ? 'favorites' : 'popular';
  document.querySelector('#sort-button').innerHTML = `<span class="sort-icon">↕</span> ${state.sort === 'favorites' ? 'Favoritos primero' : 'Más usados'} <span class="chevron">⌄</span>`;
  render();
});
document.querySelector('#clear-filters').addEventListener('click', () => { state.category = 'Todos'; state.query = ''; if (searchInput) searchInput.value = ''; state.favoritesOnly = false; render(); });

render();
