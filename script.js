// Защищенный пароль администратора
const PASSWORD = "qwe12345tyu124";

let isAdmin = false;
let editingServerIp = null;

// Полный список серверов со всего мира
let allServers = [
    { name: "Hypixel", ip: "play.hypixel.net", region: "США", flag: "🇺🇸", rating: 5.0, online: 48500, mode: "BedWars", desc: "Крупнейший мировой сервер с огромным онлайном и мини-играми (BedWars, SkyWars)." },
    { name: "MCSkill", ip: "mc.mcraft.pro", region: "СНГ", flag: "🇷🇺", rating: 4.8, online: 1240, mode: "Моды", desc: "Крупнейший проект с индустриальными и магическими модами и мирным развитием." },
    { name: "Really World", ip: "mc.reallyworld.ru", region: "СНГ", flag: "🇷🇺", rating: 4.7, online: 3850, mode: "Анархия", desc: "Популярный гриферский проект с кастомными предметами и анархией." },
    { name: "HolyWorld", ip: "play.holyworld.ru", region: "СНГ", flag: "🇷🇺", rating: 4.7, online: 3100, mode: "Анархия", desc: "Суровая анархия с прокачкой и ежедневными ивентами." },
    { name: "FunTime", ip: "funtime.su", region: "СНГ", flag: "🇷🇺", rating: 4.6, online: 4200, mode: "Анархия", desc: "Один из самых известных анархических серверов СНГ." },
    { name: "LastCraft", ip: "mc.lastcraft.net", region: "СНГ", flag: "🇷🇺", rating: 4.5, online: 950, mode: "SkyWars", desc: "Классические мини-игры, SkyWars и аркады на русском языке." },
    { name: "Purple Prison", ip: "purpleprison.net", region: "США", flag: "🇺🇸", rating: 4.8, online: 2100, mode: "PvP", desc: "Легендарная тюрьма с развитой экономикой и PvP-аренами." },
    { name: "VeltMC", ip: "hub.velt.pvp", region: "США", flag: "🇺🇸", rating: 4.6, online: 1500, mode: "PvP", desc: "Классический PvP сервер для тренировок и клановых войн." },
    { name: "CubeCraft", ip: "play.cubecraft.net", region: "США", flag: "🇺🇸", rating: 4.7, online: 5400, mode: "BedWars", desc: "Популярный международный сервер с уникальным дизайном мини-игр." },
    { name: "GommeHD", ip: "gommehd.net", region: "Европа", flag: "🇩🇪", rating: 4.8, online: 7200, mode: "BedWars", desc: "Крупнейший немецкий и европейский проект." }
];

let currentFilter = null;

function render(serversToRender = allServers) {
    let list = document.getElementById("server-list");
    if (!list) return;
    
    if (serversToRender.length === 0) {
        list.innerHTML = '<p style="color: #8b949e; text-align: center; padding: 20px;">Серверы по данному режиму не найдены.</p>';
        return;
    }

    list.innerHTML = serversToRender.map(s => {
        let adminButtons = isAdmin ? `
            <div style="margin-top: 10px; display: flex; gap: 8px;">
                <button onclick="editServer('${s.ip}')" style="background: #238636; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">✏️ Изменить</button>
                <button onclick="deleteServer('${s.ip}')" style="background: #da3633; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">🗑️ Удалить</button>
            </div>
        ` : '';

        return `
            <div class="card" style="background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 15px; margin-bottom: 12px; color: #c9d1d9;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <h3 style="margin: 0; color: #58a6ff;">${s.name}</h3>
                    <span style="background: #21262d; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${s.flag} ${s.region}</span>
                </div>
                <p style="margin: 4px 0; font-size: 14px;"><strong>IP:</strong> <code>${s.ip}</code></p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>Режим:</strong> ${s.mode}</p>
                <p style="margin: 4px 0; font-size: 14px;"><strong>Рейтинг:</strong> ★ ${s.rating} | <strong>Онлайн:</strong> 👥 ${s.online}</p>
                <p style="margin: 8px 0 0 0; font-size: 13px; color: #8b949e;">${s.desc}</p>
                ${adminButtons}
            </div>
        `;
    }).join("");
}

function filterByMode(modeName) {
    currentFilter = modeName;
    let filtered = allServers.filter(s => s.mode.toLowerCase().includes(modeName.toLowerCase()));
    render(filtered);
}

function resetFilter() {
    currentFilter = null;
    render(allServers);
}

// Проверка пароля и включение админки
function checkAdmin() {
    if (isAdmin) {
        isAdmin = false;
        alert("Вы вышли из режима администратора.");
        render(currentFilter ? allServers.filter(s => s.mode.toLowerCase().includes(currentFilter.toLowerCase())) : allServers);
        return;
    }

    let pass = prompt("Введите пароль администратора:");
    if (pass === PASSWORD) {
        isAdmin = true;
        alert("Успешный вход в режим администратора! Теперь вам доступны кнопки управления серверами.");
        render(currentFilter ? allServers.filter(s => s.mode.toLowerCase().includes(currentFilter.toLowerCase())) : allServers);
    } else if (pass !== null) {
        alert("Неверный пароль!");
    }
}

function deleteServer(ip) {
    if (!isAdmin) return;
    if (confirm(`Удалить сервер ${ip}?`)) {
        allServers = allServers.filter(s => s.ip !== ip);
        render(allServers);
    }
}

function editServer(ip) {
    if (!isAdmin) return;
    let s = allServers.find(item => item.ip === ip);
    if (!s) return;
    let newName = prompt("Новое название сервера:", s.name);
    if (newName) {
        s.name = newName;
        render(allServers);
    }
}

render();
