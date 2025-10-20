import { series } from './data.js';

const tbody = document.getElementById('series-body') as HTMLElement | null;
const avgSpan = document.getElementById('avg-seasons') as HTMLElement | null;

const card  = document.getElementById('series-detail') as HTMLElement | null;
const img   = document.getElementById('detail-image') as HTMLImageElement | null;
const title = document.getElementById('detail-title') as HTMLElement | null;
const desc  = document.getElementById('detail-description') as HTMLElement | null;
const link  = document.getElementById('detail-link') as HTMLAnchorElement | null;


if (tbody && avgSpan && card && img && title && desc && link) {
  renderTable();

  if (series.length > 0) {
    showDetail(series[0]);
  }
}

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
    tr.addEventListener('click', () => showDetail(s));
    tbody.appendChild(tr);
  });
  const average = data.length ? total / data.length : 0;
  avgSpan.textContent = average.toFixed(2);
}

function showDetail(s: typeof series[number]): void {
  if (!card || !img || !title || !desc || !link) return;
  img.src = s.image;
  img.alt = s.name;
  title.textContent = s.name;
  desc.textContent = s.description;
  link.href = s.link;
  card.classList.remove('d-none');
}