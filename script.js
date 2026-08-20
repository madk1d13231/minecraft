function openTopicView(id) {
    let t = forumTopics.find(item => item.id == id);
    if(!t) return;

    // Если у темы еще нет массива комментариев, создадим его
    if (!t.comments) {
        t.comments = [
            { author: "Admin", text: "Добро пожаловать в обсуждение! Соблюдайте правила.", date: "20.08.2026" }
        ];
    }

    let commentsHtml = t.comments.map(c => `
        <div style="background: #0d1117; border: 1px solid #30363d; border-radius: 6px; padding: 10px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; color: #8b949e; margin-bottom: 4px;">
                <span>👤 <strong>${c.author}</strong></span>
                <span>📅 ${c.date}</span>
            </div>
            <p style="margin: 0; font-size: 13px; color: #c9d1d9;">${c.text}</p>
        </div>
    `).join('');

    document.getElementById('topicViewBody').innerHTML = `
        <span class="badge">${t.category}</span>
        <h2 style="color: #58a6ff; margin: 10px 0;">${t.title}</h2>
        <p style="color: #8b949e; font-size: 12px;">Автор: <strong>${t.author}</strong> | Дата: ${t.date}</p>
        <hr style="border-color: #30363d; margin: 15px 0;">
        <p style="line-height: 1.5;">${t.text}</p>
        
        <div style="margin-top: 25px;">
            <h4 style="color: #f0883e; margin-bottom: 10px;">Комментарии (${t.comments.length})</h4>
            <div style="max-height: 250px; overflow-y: auto; margin-bottom: 15px;" id="comments-list-box">
                ${commentsHtml}
            </div>

            <form onsubmit="addNewComment(event, ${t.id})" style="display: flex; flex-direction: column; gap: 8px;">
                <input type="text" id="comment-author" placeholder="Ваше имя..." required style="padding: 8px; background: #0d1117; border: 1px solid #30363d; border-radius: 6px; color: #c9d1d9; font-size: 13px;">
                <textarea id="comment-text" rows="2" placeholder="Написать комментарий..." required style="padding: 8px; background: #0d1117; border: 1px solid #30363d; border-radius: 6px; color: #c9d1d9; font-size: 13px; outline: none;"></textarea>
                <button type="submit" style="background: #238636; color: white; border: none; padding: 8px; border-radius: 6px; font-weight: bold; cursor: pointer;">Отправить ответ</button>
            </form>
        </div>
    `;
    document.getElementById('topicViewModal').style.display = 'flex';
}

// Функция отправки нового комментария внутри темы
function addNewComment(e, topicId) {
    e.preventDefault();
    let authorInput = document.getElementById('comment-author').value;
    let textInput = document.getElementById('comment-text').value;

    let t = forumTopics.find(item => item.id == topicId);
    if(t) {
        if(!t.comments) t.comments = [];
        t.comments.push({
            author: authorInput,
            text: textInput,
            date: new Date().toLocaleDateString()
        });
        t.replies = t.comments.length;
        
        // Переоткрываем модальное окно, чтобы обновить список комментариев
        openTopicView(topicId);
        renderForum(); // Обновляем счетчик ответов на главном экране форума
    }
}
