const pvpLeaders = [
    { rank: 1, name: "Marlowww", tiers: ["HT1", "HT1", "HT1", "HT1"] },
    { rank: 2, name: "ItzRealMe", tiers: ["HT3", "HT1", "HT1", "HT1"] },
    { rank: 3, name: "coldified", tiers: ["LT1", "HT3", "HT1", "HT1"] },
    { rank: 4, name: "Swight", tiers: ["LT3", "HT1", "HT1", "HT1"] },
    { rank: 5, name: "janekv", tiers: ["HT3", "HT4", "HT1", "HT1"] },
    { rank: 6, name: "BlvckWlf", tiers: ["HT3", "LT3", "LT3", "HT1"] },
    { rank: 6, name: "Kylaz", tiers: ["HT3", "LT3", "LT3", "HT1"] },
    { rank: 8, name: "ninorc15", tiers: ["HT3", "HT3", "LT3", "LT1"] },
    { rank: 9, name: "Lurrn", tiers: ["LT3", "LT4", "HT1", "LT1"] },
    { rank: 10, name: "Arsakha", tiers: ["HT3", "HT3", "HT3", "LT3"] },
    { rank: 10, name: "yMiau", tiers: ["HT3", "LT3", "LT3", "LT3"] },
    { rank: 12, name: "Juan_Clean", tiers: ["HT3", "LT3", "LT3", "LT3"] },
    { rank: 12, name: "Deilvi_17", tiers: ["HT3", "HT4", "LT4", "LT4"] },
    { rank: 12, name: "Freekee_Fang", tiers: ["LT2", "HT3", "HT3", "HT3"] },
    { rank: 15, name: "Legendarryy", tiers: ["HT2", "HT3", "HT3", "LT3"] },
    { rank: 16, name: "Spawnplayer", tiers: ["HT3", "HT3", "HT3", "LT3"] },
    { rank: 17, name: "zivahlol", tiers: ["HT3", "HT3", "HT3", "HT3"] },
    { rank: 18, name: "sashia2m", tiers: ["HT1", "HT3", "LT3", "LT3"] },
    { rank: 19, name: "Frxnkey", tiers: ["LT3", "HT3", "HT4", "LT4"] },
    { rank: 20, name: "Hosthan", tiers: ["LT3", "HT3", "HT3", "LT3"] }
];

const container = document.getElementById('leaderboard');
if (container) {
    pvpLeaders.forEach(p => {
        const row = document.createElement('div');
        row.className = 'player-row';
        row.innerHTML = `<span class="rank">${p.rank}.</span>
                         <span class="name">${p.name}</span>
                         <div class="tiers">${p.tiers.map(t => `<span class="tier-tag">${t}</span>`).join('')}</div>`;
        container.appendChild(row);
    });
}
