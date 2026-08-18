const serverDatabase = [
  { 
    ip: 'subshield.ru', 
    port: 25565, 
    region: 'СНГ 🇷🇺', 
    category: 'RolePlay / Города', 
    rating: 4.9,
    description: 'SubShield — Известный приватный RolePlay сервер: постройка городов, суды, экономика и отыгрыш персонажей.' 
  },
  { 
    ip: 'mc.funtime.su', 
    port: 25565, 
    region: 'СНГ 🇷🇺', 
    category: 'Анархия / Ивенты', 
    rating: 4.9,
    description: 'FunTime — Популярная Анархия: аирдропы, клановые битвы за ресурсы, кастомные талисманы и боссы.' 
  },
  { 
    ip: 'play.hypixel.net', 
    port: 25565, 
    region: 'США 🇺🇸', 
    category: 'BedWars / SkyWars / Royale', 
    rating: 5.0,
    description: 'Hypixel — Главный проект с BedWars, SkyWars, Survival Games (Королевская битва) и SkyBlock.' 
  },
  { 
    ip: 'cristalix.gg', 
    port: 25565, 
    region: 'СНГ 🇷🇺', 
    category: 'Кастомные Моды / РП', 
    rating: 4.8,
    description: 'Cristalix — Сервер с уникальным клиентом, включающим собственные моды, кастомные мини-игры и РП-режимы.' 
  },
  { 
    ip: 'mc.mcskill.net', 
    port: 25565, 
    region: 'СНГ 🇷🇺', 
    category: 'Моды / HiTech', 
    rating: 4.7,
    description: 'McSkill — Крупный лаунчерный проект с модами: Industrial Craft, Thaumcraft, DivineRPG, автошахты и космос.' 
  },
  { 
    ip: 'mc.reallyworld.ru', 
    port: 25565, 
    region: 'СНГ 🇷🇺', 
    category: 'Анархия / Гриф', 
    rating: 4.7,
    description: 'ReallyWorld — Гриферский сервер и Анархия с кланами, скупщиком предметов и уникальным оружием.' 
  },
  { 
    ip: 'play.holyworld.ru', 
    port: 25565, 
    region: 'СНГ 🇷🇺', 
    category: 'Анархия', 
    rating: 4.7,
    description: 'HolyWorld — Суровая Анархия с прокачкой умений, кастомными крафтами и ежедневными ивентами.' 
  },
  { 
    ip: 'hub.mc-complex.com', 
    port: 25565, 
    region: 'США 🇺🇸', 
    category: 'Pixelmon / Моды', 
    rating: 4.6,
    description: 'Complex Gaming — Топовый международный сервер с модом Pixelmon (покемоны в Minecraft) и Towny.' 
  },
  { 
    ip: '2b2t.org', 
    port: 25565, 
    region: 'США 🇺🇸', 
    category: 'Мировая Анархия', 
    rating: 4.5,
    description: '2B2T — Старейший анархия-сервер в мире без правил, приватных зон и банов.' 
  },
  { 
    ip: 'mc.lastcraft.ru', 
    port: 25565, 
    region: 'СНГ 🇷🇺', 
    category: 'BedWars / Мини-игры', 
    rating: 4.6,
    description: 'LastCraft — СНГ сервер с BedWars, SkyWars, паркуром и классическими мини-играми.' 
  },
  { 
    ip: 'mc.dexland.ru', 
    port: 25565, 
    region: 'СНГ 🇷🇺', 
    category: 'Мирное выживание', 
    rating: 4.6,
    description: 'DexLand — Уютное выживание с надежной защитой построек, экономикой и мирной торговлей.' 
  },
  { 
    ip: 'eu.pvp.land', 
    port: 25565, 
    region: 'Европа 🇪🇺', 
    category: 'PvP Тренировка', 
    rating: 4.6,
    description: 'PvP Land — Отработка аима, комбо и клик-таймингов на тренировочных ботах и в дуэлях.' 
  },
  { 
    ip: 'minemen.club', 
    port: 25565, 
    region: 'Европа 🇪🇺', 
    category: 'PvP Академия', 
    rating: 4.8,
    description: 'Minemen Club — Мировая арена для дуэлей, застройки мостов и улучшения PvP-навыков.' 
  }
];

let loadedServers = [...serverDatabase];
let currentFilter = 'ALL';
let searchQuery = '';
let currentSort = 'rating-desc';

function renderServers() {
  const listDiv = document.getElementById('server-list');
  if (!listDiv) return;

  listDiv.replaceChildren();

  let filtered = loadedServers.filter(srv => {
    const matchesRegion = currentFilter === 'ALL' || srv.region.includes(currentFilter);
    const matchesQuery = srv.ip.toLowerCase().includes(searchQuery) ||
                         srv.category.toLowerCase().includes(searchQuery) ||
                         srv.description.toLowerCase().includes(searchQuery);
    return matchesRegion && matchesQuery;
  });

  filtered.sort((a, b) => {
    if (currentSort === 'rating-desc') return b.rating - a.rating;
    if (currentSort === 'rating-asc') return a.rating - b.rating;
    if (currentSort === 'name') return a.ip.localeCompare(b.ip);
    return 0;
  });

  if (filtered.length === 0) {
    const emptyP = document.createElement('p');
    emptyP.style.cssText = 'text-align:center; color: #8b949e; padding: 40px;';
    emptyP.textContent = 'Серверы по вашему запросу не найдены.';
    listDiv.appendChild(emptyP);
    return;
  }

  filtered.forEach(srv => {
    const card = document.createElement('div');
    card.className = 'server-card';
    card.innerHTML = `
      <div class="server-info">
        <div class="server-header">
          <span class="ip-address">${srv.ip}:${srv.port}</span>
          <div class="rating-box" title="Рейтинг сервера">
            <span>★</span>
            <span>${srv.rating.toFixed(1)}</span>
          </div>
          <span class="badge">${srv.region}</span>
          <span class="badge">${srv.category}</span>
        </div>
        <div class="online-status">● Игроков: ${srv.online || 'Доступен'}</div>
        <div class="desc">${srv.description}</div>
      </div>
      <button class="copy-btn" onclick="copyIp('${srv.ip}:${srv.port}', this)">Скопировать IP</button>
    `;
    listDiv.appendChild(card);
  });
}

async function updateOnlineStatus() {
  const requests = loadedServers.map(async (srv) => {
    try {
      const response = await fetch(`https://api.mcsrvstat.us/3/${srv.ip}`);
      const data = await response.json();
      srv.online = data.online ? (data.players?.online || 'Онлайн') : 'Доступен';
    } catch {
      srv.online = 'Доступен';
    }
  });

  await Promise.all(requests);
  renderServers();
}

function filterRegion(region, btn) {
  currentFilter = region;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderServers();
}

function handleSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchQuery = searchInput.value.toLowerCase().trim();
    renderServers();
  }
}

function handleSortChange(sortValue) {
  currentSort = sortValue;
  renderServers();
}

function copyIp(text, btn) {
  navigator.clipboard.writeText(text);
  const original = btn.innerText;
  btn.innerText = 'Скопировано! ✓';
  setTimeout(() => { btn.innerText = original; }, 1500);
}

renderServers();
updateOnlineStatus();
