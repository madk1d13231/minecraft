// Пароль для входа в админку
const ADMIN_PASSWORD = "qwe12345tyu";

// Загрузка списка серверов (из localStorage или по умолчанию)
function getStoredServers() {
  try {
    const data = localStorage.getItem('mc_custom_servers');
    if (data) return JSON.parse(data);
  } catch (e) {}
  
  return [
    {
      ip: "play.hypixel.net:25565",
      name: "Hypixel",
      region: "США",
      flag: "🇺🇸",
      mode: "BedWars / SkyWars / Royale",
      rating: 5.0,
      desc: "Главный мировой проект с BedWars, SkyWars, Survival Games и SkyBlock."
    },
    {
      ip: "mc.mcraft.pro:25565",
      name: "MCSkill",
      region: "СНГ",
      flag: "🇷🇺",
      mode: "Моды / HiTech / Magic",
      rating: 4.8,
      desc: "Крупнейший лаунчерный проект с модами: Industrial Craft, Thaumcraft, DivineRPG и автошахты."
    },
    {
      ip: "mc.reallyworld.ru:25565",
      name: "Really World",
      region: "СНГ",
      flag: "🇷🇺",
      mode: "Анархия / Гриф",
      rating: 4.7,
      desc: "Гриферский сервер и Анархия с кланами, скупщиком предметов и уникальным оружием."
    },
    {
      ip: "play.holyworld.ru:25565",
      name: "HolyWorld",
      region: "СНГ",
      flag: "🇷🇺",
      mode: "Анархия",
      rating: 4.7,
      desc: "Суровая Анархия с прокачкой умений, кастомными крафтами и ежедневными ивентами."
    }
  ];
}

let servers = getStoredServers();
let activeRegion = 'ALL';
let currentSort = 'rating-desc';
let searchQuery = '';
let isAdmin = false;

function saveServers() {
  localStorage.setItem('mc_custom_servers', JSON.stringify(servers));
}

function getStoredReviews() {
  try {
    const data = localStorage.getItem('mc_server_reviews');
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

// Переключение панели админа
function toggleAdminPanel() {
  if (!isAdmin) {
    const pwd = prompt("Введите пароль администратора:");
    if (pwd === ADMIN_PASSWORD) {
      isAdmin = true;
      document.getElementById('admin-panel').style.display = 'block';
      document.getElementById('admin-login-btn').innerText = '🚪 Выйти из админки';
      alert("Авторизация успешна!");
      renderServers();
    } else if (pwd !== null) {
      alert("Неверный пароль!");
    }
  } else {
    isAdmin = false;
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('admin-login-btn').innerText = '🔐 Вход для админа';
    renderServers();
  }
}

// Добавление нового сервера
function addNewServer() {
  const name = document.getElementById('admin-name').value.trim();
  const ip = document.getElementById('admin-ip').value.trim();
  const region = document.getElementById('admin-region').value;
  const rating = parseFloat(document.getElementById('admin-rating').value) || 5.0;
  const mode = document.getElementById('admin-mode').value.trim();
  const desc = document.getElementById('admin-desc').value.trim();

  if (!name || !ip || !mode) {
    alert("Заполните Название, IP и Режим!");
    return;
  }

  const flags = { 'СНГ': '🇷🇺', 'США': '🇺🇸', 'Европа': '🇪🇺' };

  servers.unshift({
    ip: ip,
    name: name,
    region: region,
    flag: flags[region] || '🌐',
    mode: mode,
    rating: rating,
    desc: desc || "Описание отсутствует."
  });

  saveServers();
  renderServers();

  document.getElementById('admin-name').value = '';
  document.getElementById('admin-ip').value = '';
  document.getElementById('admin-mode').value = '';
  document.getElementById('admin-desc').value = '';
  alert("Сервер успешно добавлен!");
}

// Удаление сервера
function deleteServer(ip) {
  if (confirm(`Удалить сервер ${ip}?`)) {
    servers = servers.filter(s => s.ip !== ip);
    saveServers();
    renderServers();
  }
}

// Отрисовка серверов
function renderServers() {
  const container = document.getElementById('server-list');
  if (!container) return;

  const reviewsData = getStoredReviews();

  let filtered = servers.filter(s => {
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
              <span class="ip-address">🌐 ${s.ip}</span>
              <span class="rating-box">★ ${s.rating.toFixed(1)}</span>
              <span class="badge">${s.flag} ${s.region}</span>
              <span class="badge">${s.mode}</span>
            </div>
            <div class="desc"><strong>${s.name}</strong> — ${s.desc}</div>
            <div class="online-status">● Статус: Доступен</div>
          </div>

          <div class="card-actions">
            ${isAdmin ? `<button class="delete-btn" onclick="deleteServer('${s.ip}')">🗑️ Удалить</button>` : ''}
            <button class="review-btn" onclick="toggleReviews('${safeIpId}')">
              💬 Отзывы (${serverReviews.length})
            </button>
            <button class="copy-btn" onclick="copyIp('${s.ip}', this)">Скопировать IP</button>
          </div>
        </div>

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
            <button class="submit-btn" onclick="submitReview('${s.ip}', '${safeIpId}')">Отправить отзыв</button>
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

  const text = textInput ? textInput.value.trim() : '';
  if (!text) {
    alert('Напишите текст отзыва');
    return;
  }

  const reviews = getStoredReviews();
  if (!reviews[ip]) reviews[ip] = [];

  reviews[ip].unshift({
    author: (authorInput && authorInput.value.trim()) || 'Гость',
    stars: starsSelect ? parseInt(starsSelect.value) : 5,
    text: text,
    date: new Date().toLocaleDateString('ru-RU')
  });

  localStorage.setItem('mc_server_reviews', JSON.stringify(reviews));
  renderServers();
  toggleReviews(safeIpId);
}

function getSiteReviews() {
  try {
    const data = localStorage.getItem('mc_website_reviews');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function renderSiteReviews() {
  const container = document.getElementById('site-reviews-list');
  if (!container) return;

  const reviews = getSiteReviews();

  if (reviews.length === 0) {
    container.innerHTML = '<p class="no-reviews">Пока нет отзывов о сайте. Будьте первым!</p>';
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

  const text = textInput ? textInput.value.trim() : '';
  if (!text) {
    alert('Пожалуйста, напишите отзыв!');
    return;
  }

  const reviews = getSiteReviews();
  reviews.unshift({
    author: (authorInput && authorInput.value.trim()) || 'Посетитель',
    stars: starsSelect ? parseInt(starsSelect.value) : 5,
    text: text,
    date: new Date().toLocaleDateString('ru-RU')
  });

  localStorage.setItem('mc_website_reviews', JSON.stringify(reviews));

  if (textInput) textInput.value = '';
  if (authorInput) authorInput.value = '';
  renderSiteReviews();
}

function filterRegion(region, btn) {
  activeRegion = region;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderServers();
}

function handleSearch() {
  const input = document.getElementById('search-input');
  searchQuery = input ? input.value : '';
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
  if (btn) {
    const oldText = btn.innerText;
    btn.innerText = 'Скопировано!';
    setTimeout(() => btn.innerText = oldText, 1500);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderServers();
  renderSiteReviews();
});
