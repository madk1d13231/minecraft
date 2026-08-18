const PASSWORD = "qwe12345tyu124";
let isAdmin = false;

let allServers = [
    { name: "Hypixel", ip: "play.hypixel.net", region: "США", flag: "🇺🇸", rating: 5.0, online: 48500, mode: "BedWars", desc: "Главный мировой сервер с мини-играми." },
    { name: "MCSkill", ip: "mc.mcraft.pro", region: "СНГ", flag: "🇷🇺", rating: 4.8, online: 1240, mode: "Моды", desc: "Крупнейший проект с модами." },
    { name: "Really World", ip: "mc.reallyworld.ru", region: "СНГ", flag: "🇷🇺", rating: 4.7, online: 3850, mode: "Анархия", desc: "Популярный гриферский сервер." },
    { name: "HolyWorld", ip: "play.holyworld.ru", region: "СНГ", flag: "🇷🇺", rating: 4.7, online: 3100, mode: "Анархия", desc: "Суровая анархия с ивентами." }
];

function render(servers = allServers) {
    let list = document.getElementById("server-list");
    if (!list) return;
    
    list.innerHTML = servers.map(s => `
        <div style="background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 15px; margin-bottom: 12px; color: #c9d1d9;">
            <h3 style="margin: 0 0 8px 0; color: #58a6ff;">${s.name} (${s.flag} ${s.region})</h3>
            <p style="margin: 4px 0;"><strong>IP:</strong> ${s.ip}</p>
            <p style="margin: 4px 0;"><strong>Режим:</strong> ${s.mode}</p>
            <p style="margin: 4px 0;"><strong>Рейтинг:</strong> ★ ${s.rating} | <strong>Онлайн:</strong> ${s.online}</p>
            <p style="margin: 8px 0 0 0; color: #8b949e; font-size: 13px;">${s.desc}</p>
            ${isAdmin ? `<button onclick="deleteServer('${s.ip}')" style="margin-top:10px; background:#da3633; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Удалить</button>` : ''}
        </div>
    `).join("");
}

function filterByMode(modeName) {
    let filtered = allServers.filter(s => s.mode.toLowerCase().includes(modeName.toLowerCase()));
    render(filtered);
}

function resetFilter() {
    render(allServers);
}

function checkAdmin() {
    let pass = prompt("Введите пароль администратора:");
    if (pass === PASSWORD) {
        isAdmin = true;
        alert("Успешный вход!");
        render();
    } else if (pass !== null) {
        alert("Неверный пароль!");
    }
}

function deleteServer(ip) {
    allServers = allServers.filter(s => s.ip !== ip);
    render();
}

render();
