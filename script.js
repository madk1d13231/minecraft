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

          <!-- Кнопки действий -->
          <div class="card-actions">
            <button class="review-btn" onclick="toggleReviews('${safeIpId}')">
              💬 Отзывы (${serverReviews.length})
            </button>
            <button class="copy-btn" onclick="copyIp('${s.ip}', this)">Скопировать IP</button>
          </div>
        </div>

        <!-- Открытый блок отзывов по умолчанию -->
        <div id="reviews-box-${safeIpId}" class="reviews-box" style="display: block;">
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
