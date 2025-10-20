import { series } from './data.js';

// Recupera los elementos del DOM necesarios. Todos los campos están tipados
// explícitamente para aprovechar las ayudas de TypeScript y detectar
// errores en tiempo de compilación.
const tbody = document.getElementById('series-body') as HTMLElement | null;
const avgSpan = document.getElementById('avg-seasons') as HTMLElement | null;

const card  = document.getElementById('series-detail') as HTMLElement | null;
const img   = document.getElementById('detail-image') as HTMLImageElement | null;
const title = document.getElementById('detail-title') as HTMLElement | null;
const desc  = document.getElementById('detail-description') as HTMLElement | null;
const link  = document.getElementById('detail-link') as HTMLAnchorElement | null;

// Comprueba que los elementos existen antes de intentar usarlos
if (tbody && avgSpan && card && img && title && desc && link) {
  renderTable();
  // Muestra la primera serie por defecto en el detalle
  if (series.length > 0) {
    showDetail(series[0]);
  }
}

/**
 * Rellena la tabla de series con el arreglo dado. También calcula el promedio
 * de temporadas de las series y lo muestra con dos decimales en la interfaz.
 */
function renderTable(data = series): void {
  if (!tbody || !avgSpan) return;
  tbody.innerHTML = '';
  let total = 0;
  data.forEach((s) => {
    total += s.seasons;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th scope="row">${s.id}</th>
      <td class="text-primary" style="text-decoration:underline">${s.name}</td>
      <td>${s.channel}</td>
      <td>${s.seasons}</td>
    `;
    // Al hacer clic en cualquier columna de la fila se muestra el detalle
    tr.addEventListener('click', () => showDetail(s));
    tbody.appendChild(tr);
  });
  const average = data.length ? total / data.length : 0;
  avgSpan.textContent = average.toFixed(2);
}

/**
 * Muestra los detalles de una serie en la tarjeta de la derecha. Rellena
 * los campos de imagen, título, descripción y enlace. Asegura que la
 * tarjeta sea visible eliminando la clase d-none si está presente.
 */
function showDetail(s: typeof series[number]): void {
  if (!card || !img || !title || !desc || !link) return;
  img.src = s.image;
  img.alt = s.name;
  title.textContent = s.name;
  desc.textContent = s.description;
  link.href = s.link;
  // Algunos estilos (como d-none) podrían ocultar la tarjeta; elimínalos
  card.classList.remove('d-none');
}