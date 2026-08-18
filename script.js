const initialServers = [
  {
    ip: "play.hypixel.net:25565",
    name: "Hypixel",
    region: "США",
    mode: "BedWars / SkyWars / Royale",
    rating: 5.0,
    desc: "Главный мировой проект с BedWars, SkyWars, Survival Games и SkyBlock."
  },
  {
    ip: "mc.mcraft.pro:25565",
    name: "MCSkill",
    region: "СНГ",
    mode: "Моды / HiTech / Magic",
    rating: 4.8,
    desc: "Крупнейший лаунчерный проект с модами: Industrial Craft, Thaumcraft, DivineRPG, автошахты."
  },
  {
    ip: "mc.reallyworld.ru:25565",
    name: "Really World",
    region: "СНГ",
    mode: "Анархия / Гриф",
    rating: 4.7,
    desc: "Гриферский сервер и Анархия с кланами, скупщиком предметов и уникальным оружием."
  },
  {
    ip: "play.holyworld.ru:25565",
    name: "HolyWorld",
    region: "СНГ",
    mode: "Анархия",
    rating: 4.7,
    desc: "Суровая Анархия с прокачкой умений, кастомными крафтами и ежедневными ивентами."
  },
  {
    ip: "hub.mc-complex.com:25565",
    name: "Complex Gaming",
    region: "США",
    mode: "Pixelmon / Моды",
    rating: 4.6,
    desc: "Топовый международный сервер с модом Pixelmon и Towny."
  },
  {
    ip: "mc.lastcraft.ru:25565",
    name: "LastCraft",
    region: "СНГ",
    mode: "BedWars / Мини-игры",
    rating: 4.6,
    desc: "СНГ сервер с BedWars, SkyWars, паркуром и классическими мини-играми."
  },
  {
    ip: "mc.dexland.ru:25565",
    name: "DexLand",
    region: "СНГ",
    mode: "Мирное выживание",
    rating: 4.6,
    desc: "Уютное выживание с приватами, экономикой, авто-шахтой и защитой от гриферов."
  },
  {
    ip: "2b2t.org:25565",
    name: "2B2T",
    region: "США",
    mode: "Мировая Анархия",
    rating: 4.5,
    desc: "2B2T — Старейший анархия-сервер в мире без правил, приватных зон и банов."
  }
];

let activeRegion = 'ALL';
let currentSort = 'rating-desc';
let searchQuery = '';

// === РАБОТА С ОТЗЫВАМИ СЕРВЕРОВ ===
function getStoredReviews() {
  const data = localStorage.getItem('mc_server_reviews');
  return data ? JSON.parse(data) : {};
}

function renderServers() {
  const container = document.getElementById('server-list');
  const reviewsData = getStoredReviews();

  let filtered = initialServers.filter(s => {
    const matchRegion = activeRegion === 'ALL' || s.region === activeRegion;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.mode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.ip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchSearch;
  });

  if (currentSort === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'rating-asc') {
    filtered.sort((a, b) => a.rating - b.rating);
  } else if (currentSort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:30px; color:#8b949e;">Серверы не найдены</div>';
    return;
  }

  container.innerHTML = filtered.map(s => {
    const serverReviews = reviewsData[s.ip] || [];
    const safeIpId = s.ip.replace(/[^a-zA-Z0-9]/g, '');

    return `
      <div class="server-card">
        <div class="server-main">
          <div class="server-info">
            <div class="server-header">
              <span class="ip-address">${s.ip}</span>
              <span class="rating-box">★ ${s.rating.toFixed(1)}</span>
              <span class="badge">${s.region}</span>
              <span class="badge">${s.mode}</span>
            </div>
            <div class="desc"><strong>${s.name}</strong> — ${s.desc}</div>
            <div class="online-status">● Статус: Доступен</div>
          </div>
          <button class="copy-btn" onclick="copyIp('${s.ip}', this)">Скопировать IP</button>
        </div>

        <div class="reviews-section">
          <button class="toggle-reviews-btn" onclick="toggleReviews('${safeIpId}')">
            💬 Отзывы к серверу (${serverReviews.length})
          </button>

          <div id="reviews-box-${safeIpId}" class="reviews-box" style="display: none;">
            <div class="add-review-form">
              <input type="text" id="author-${safeIpId}" placeholder="Ваше имя" maxlength="20">
              <select id="stars-${safeIpId}">
                <option value="5">★ 5 (Отлично)</option>
                <option value="4">★ 4 (Хорошо)</option>
                <option value="3">★ 3 (Нормально)</option>
                <option value="2">★ 2 (Плохо)</option>
                <option value="1">★ 1 (Ужасно)</option>
              </select>
              <textarea id="text-${safeIpId}" placeholder="Оставьте отзыв о сервере..." rows="2"></textarea>
              <button onclick="submitReview('${s.ip}', '${safeIpId}')">Отправить</button>
            </div>

            <div class="reviews-list">
              ${serverReviews.length === 0 ? '<p class="no-reviews">Отзывов пока нет.</p>' : ''}
              ${serverReviews.map(r => `
                <div class="review-item">
                  <div class="review-header">
                    <span class="review-author">${r.author}</span>
                    <span class="review-stars">${'★'.repeat(r.stars)}</span>
                    <span class="review-date">${r.date}</span>
                  </div>
                  <div class="review-text">${r.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleReviews(safeIpId) {
  const box = document.getElementById(`reviews-box-${safeIpId}`);
  if (box) {
    box.style.display = (box.style.display === 'none' || !box.style.display) ? 'block' : 'none';
  }
}

function submitReview(ip, safeIpId) {
  const authorInput = document.getElementById(`author-${safeIpId}`);
  const starsSelect = document.getElementById(`stars-${safeIpId}`);
  const textInput = document.getElementById(`text-${safeIpId}`);

  const text = textInput.value.trim();
  if (!text) {
    alert('Напишите текст отзыва');
    return;
  }

  const reviews = getStoredReviews();
  if (!reviews[ip]) reviews[ip] = [];

  reviews[ip].unshift({
    author: authorInput.value.trim() || 'Гость',
    stars: parseInt(starsSelect.value),
    text: text,
    date: new Date().toLocaleDateString('ru-RU')
  });

  localStorage.setItem('mc_server_reviews', JSON.stringify(reviews));
  renderServers();
  toggleReviews(safeIpId);
}

// === РАБОТА С ОТЗЫВАМИ О САЙТЕ ===
function getSiteReviews() {
  const data = localStorage.getItem('mc_website_reviews');
  return data ? JSON.parse(data) : [];
}

function renderSiteReviews() {
  const container = document.getElementById('site-reviews-list');
  if (!container) return;

  const reviews = getSiteReviews();

  if (reviews.length === 0) {
    container.innerHTML = '<p class="no-reviews">Пока нет отзывов о сайте. Напишите первый!</p>';
    return;
  }

  container.innerHTML = reviews.map(r => `
    <div class="review-item">
      <div class="review-header">
        <span class="review-author">${r.author}</span>
        <span class="review-stars">${'★'.repeat(r.stars)}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div class="review-text">${r.text}</div>
    </div>
  `).join('');
}

function submitSiteReview() {
  const authorInput = document.getElementById('site-author');
  const starsSelect = document.getElementById('site-stars');
  const textInput = document.getElementById('site-text');

  const text = textInput.value.trim();
  if (!text) {
    alert('Пожалуйста, напишите отзыв!');
    return;
  }

  const reviews = getSiteReviews();
  reviews.unshift({
    author: authorInput.value.trim() || 'Посетитель',
    stars: parseInt(starsSelect.value),
    text: text,
    date: new Date().toLocaleDateString('ru-RU')
  });

  localStorage.setItem('mc_website_reviews', JSON.stringify(reviews));

  textInput.value = '';
  authorInput.value = '';
  renderSiteReviews();
}

// Вспомогательные функции
function filterRegion(region, btn) {
  activeRegion = region;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderServers();
}

function handleSearch() {
  searchQuery = document.getElementById('search-input').value;
  renderServers();
}

function handleSortChange(val) {
  currentSort = val;
  renderServers();
}

function updateOnlineStatus() {
  alert('Онлайн серверов обновлён!');
}

function copyIp(ip, btn) {
  navigator.clipboard.writeText(ip);
  const oldText = btn.innerText;
  btn.innerText = 'Скопировано!';
  setTimeout(() => btn.innerText = oldText, 1500);
}

// Запуск отображения после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  renderServers();
  renderSiteReviews();
});
