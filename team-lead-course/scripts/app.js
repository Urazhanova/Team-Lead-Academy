/**
 * Главный файл приложения
 * Инициализация и точка входа
 */

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Скрываем экран загрузки
  const loading = document.getElementById('loading');
  if (loading) {
    loading.classList.add('hidden');
  }

  // Инициализация приложения
  initApp();
});

/**
 * Инициализация приложения
 */
function initApp() {
  console.log('Team Lead Academy: Инициализация...');
  
  // Проверка состояния
  const state = AppState.get();
  console.log('Текущий прогресс:', state);

  // Регистрируем маршруты
  registerRoutes();
  // Инициализируем роутер
  Router.init();
}

/**
 * Регистрация маршрутов
 */
function registerRoutes() {
  Router.add('/intro', () => renderIntro());
  Router.add('/lessons', () => renderHome());
  Router.add('/lesson/:id', ({ id }) => renderLesson(parseInt(id, 10)));
  Router.add('/exam', () => renderExam());
  // Стартовый маршрут - введение
  Router.setNotFound(() => renderIntro());
}

/**
 * Состояние меню
 */
const MenuState = (() => {
  let isOpen = false;

  return {
    isOpen: () => isOpen,
    toggle: () => {
      isOpen = !isOpen;
      renderMenuOverlay();
    },
    close: () => {
      isOpen = false;
      renderMenuOverlay();
    }
  };
})();

/**
 * Рендер меню (гамбургер)
 */
function renderNav() {
  return `
    <nav class="navbar">
      <div class="navbar-brand">Team Lead Academy</div>
      <button class="navbar-toggle" onclick="MenuState.toggle()" aria-label="Открыть меню" aria-expanded="false" id="menu-toggle">
        <span class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </nav>
  `;
}

/**
 * Рендер оверлея меню
 */
function renderMenuOverlay() {
  const isOpen = MenuState.isOpen();
  const overlay = document.getElementById('menu-overlay');
  const drawer = document.getElementById('menu-drawer');
  const toggle = document.getElementById('menu-toggle');

  if (!overlay || !drawer || !toggle) return;

  if (isOpen) {
    overlay.classList.add('active');
    drawer.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Фокусируем первый элемент меню
    setTimeout(() => {
      const firstLink = drawer.querySelector('a');
      if (firstLink) firstLink.focus();
    }, 100);
  } else {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Возвращаем фокус на кнопку меню
    toggle.focus();
  }
}

/**
 * Генерируем HTML меню
 */
function renderMenuHTML() {
  return `
    <!-- Оверлей -->
    <div id="menu-overlay" class="menu-overlay" onclick="MenuState.close()" aria-hidden="true"></div>

    <!-- Дроуэр (боковое меню) -->
    <aside id="menu-drawer" class="menu-drawer" aria-label="Навигационное меню">
      <div class="menu-header">
        <h2>Меню курса</h2>
        <button class="menu-close" onclick="MenuState.close()" aria-label="Закрыть меню">✕</button>
      </div>

      <nav class="menu-content" role="navigation">
        <div class="menu-section">
          <p class="menu-section-title">Навигация</p>
          <a href="#/intro" class="menu-item" onclick="MenuState.close()">← Введение</a>
          <a href="#/lessons" class="menu-item" onclick="MenuState.close()">📚 Карта курса</a>
        </div>

        <div class="menu-section">
          <p class="menu-section-title">Уроки (12)</p>
          <a href="#/lesson/1" class="menu-item" onclick="MenuState.close()">1. Твоя первая команда</a>
          <a href="#/lesson/2" class="menu-item" onclick="MenuState.close()">2. Искусство обратной связи</a>
          <a href="#/lesson/3" class="menu-item" onclick="MenuState.close()">3. Планирование спринта</a>
          <a href="#/lesson/4" class="menu-item" onclick="MenuState.close()">4. Челлендж: Конец первой недели</a>
          <a href="#/lesson/5" class="menu-item" onclick="MenuState.close()">5. Конфликт в команде</a>
          <a href="#/lesson/6" class="menu-item" onclick="MenuState.close()">6. Когда дедлайн горит</a>
          <a href="#/lesson/7" class="menu-item" onclick="MenuState.close()">7. Выгорание сотрудника</a>
          <a href="#/lesson/8" class="menu-item" onclick="MenuState.close()">8. Сложный разговор: увольнение</a>
          <a href="#/lesson/9" class="menu-item" onclick="MenuState.close()">9. Видение и стратегия команды</a>
          <a href="#/lesson/10" class="menu-item" onclick="MenuState.close()">10. Масштабирование: от 5 к 15</a>
          <a href="#/lesson/11" class="menu-item" onclick="MenuState.close()">11. Развитие лидеров в команде</a>
          <a href="#/lesson/12" class="menu-item" onclick="MenuState.close()">12. Финальный экзамен</a>
        </div>

        <div class="menu-section">
          <p class="menu-section-title">Финал</p>
          <a href="#/exam" class="menu-item menu-item-exam" onclick="MenuState.close()">🏆 Team Lead Simulator</a>
        </div>
      </nav>
    </aside>
  `;
}

/**
 * Состояние введения (какой экран сейчас показан)
 */
const IntroState = (() => {
  let currentStep = 1;

  return {
    getCurrentStep: () => currentStep,
    setCurrentStep: (step) => {
      currentStep = Math.max(1, Math.min(4, step));
    },
    nextStep: () => {
      currentStep = Math.min(4, currentStep + 1);
    },
    prevStep: () => {
      currentStep = Math.max(1, currentStep - 1);
    },
    reset: () => {
      currentStep = 1;
    }
  };
})();

/**
 * Страница Введения (4 независимых экрана)
 */
function renderIntro() {
  const app = document.getElementById('app');
  const game = AppState.get().game;

  Lessons.load().then((data) => {
    const intro = data?.intro || {};
    const currentStep = IntroState.getCurrentStep();

    // Экран 1: Приветствие и проблемы Алекса
    const renderStep1 = () => `
      <div class="intro-screen intro-step-1-screen" id="intro-step-1" aria-live="polite" role="region" aria-label="Экран 1: Приветствие">
        <div class="intro-step-1-wrapper">
          <div class="intro-step-1-left">
            <div class="card intro-step-1-card fade-in">
              <h2 class="intro-step-1-title" tabindex="-1" autofocus>👋 Привет, я Алекс!</h2>

              <p class="intro-step-1-text mt-lg">Я только что стал руководителем команды из 5 человек. Честно? Я немного нервничаю...</p>

              <p class="intro-step-1-label mt-lg"><strong>У меня куча вопросов:</strong></p>
              <ul class="intro-step-1-list">
                <li>❓ Как правильно давать обратную связь?</li>
                <li>❓ Что делать, если в команде конфликт?</li>
                <li>❓ Как мотивировать людей?</li>
                <li>❓ Как не выгореть самому?</li>
              </ul>

              <p class="intro-step-1-footer mt-lg"><strong>Звучит знакомо? Тогда этот курс для тебя!</strong></p>
            </div>
          </div>

          <div class="intro-step-1-right">
            <div class="intro-step-1-image fade-in">
              <img src="assets/images/characters/alex/heading_cl.png" alt="Иллюстрация" class="intro-step-1-portrait intro1-alex" onerror="this.style.display='none'">
            </div>
          </div>
        </div>

        <div class="intro-nav intro1-actions">
          <button class="btn btn--secondary" disabled aria-label="Предыдущий экран (недоступно)">← Назад</button>
          <button class="btn btn--primary" onclick="handleIntroNext()" aria-label="Следующий экран">Далее →</button>
        </div>
      </div>
    `;

    // Экран 2: История Алекса
    const renderStep2 = () => `
      <div class="intro-screen" id="intro-step-2" aria-live="polite" role="region" aria-label="Экран 2: История Алекса">
        <div class="fade-in">
          <div class="intro-step-2-story-container card intro-story-card">
            <div class="intro-story-left">
              <h3 class="intro-story-heading" tabindex="-1" autofocus>📖 История Алекса</h3>
              <div class="intro-story-image">
                <img src="assets/images/characters/alex/working.png" alt="Алекс работает" class="intro-story-portrait" onerror="this.parentElement.style.display='none'">
              </div>
            </div>

            <div class="intro-story-text">
              <p>
                Алекс 28 лет. Четыре года подряд он писал код в нашей команде — один из лучших разработчиков. Его код чистый, дедлайны он держит, баги ловит сам. Коллеги его уважают.
              </p>

              <p class="mt-md">
                Неделю назад его повысили. Теперь он тимлид — руководит 5 разработчиками: Марией (senior, опытная), Денисом (middle, энергичный), Леной (дизайнер, креативная), Игорем (QA, перфекционист) и Катей (junior, учится).
              </p>

              <p class="mt-md">
                В первый день Алекс понял: писать код было проще. Как мотивировать команду? Что делать с конфликтами? Как уберечь людей от выгорания? Как самому не выгореть? Вопросов больше, чем ответов.
              </p>

              <p class="mt-md">
                Но Алекс не сдаётся. Он готов учиться. Этот курс — его путь к настоящему лидерству.
              </p>
            </div>
          </div>

          <div class="intro-nav mt-lg">
            <button class="btn btn--secondary" onclick="handleIntroPrev()" aria-label="Предыдущий экран">← Назад</button>
            <button class="btn btn--primary" onclick="handleIntroNext()" id="intro-next-2" aria-label="Следующий экран">Далее →</button>
          </div>
        </div>
      </div>
    `;

    // Экран 3: Навыки Алекса
    const renderStep3 = () => {
      const skills = [
        { name: 'Управление людьми', current: 2, max: 10 },
        { name: 'Управление проектами', current: 1, max: 10 },
        { name: 'Коммуникация', current: 3, max: 10 },
        { name: 'Эмоциональный интеллект', current: 2, max: 10 },
        { name: 'Развитие команды', current: 1, max: 10 }
      ];

      const skillsHtml = skills.map((skill, idx) => `
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-value">${skill.current}/${skill.max}</span>
          </div>
          <div class="skill-bar-container">
            <div class="skill-bar" style="--skill-percent: ${(skill.current / skill.max) * 100}%; --skill-delay: ${idx * 0.1}s"></div>
          </div>
        </div>
      `).join('');

      return `
        <div class="intro-screen" id="intro-step-3" aria-live="polite" role="region" aria-label="Экран 3: Навыки Алекса">
          <div class="fade-in">
            <div class="intro-step-3-skills-container card intro-skills-card">
              <div class="intro-step-3-skills-content">
                <h2 class="intro-skills-heading" tabindex="-1" autofocus>💪 Навыки Алекса</h2>
                <div class="skills-list">
                  ${skillsHtml}
                </div>
              </div>

              <div class="intro-step-3-image">
                <img src="assets/images/characters/alex/friendly.png" alt="Алекс" class="intro-step-3-portrait" onerror="this.parentElement.style.display='none'">
              </div>
            </div>

            <div class="intro-nav mt-lg">
              <button class="btn btn--secondary" onclick="handleIntroPrev()" aria-label="Предыдущий экран">← Назад</button>
              <button class="btn btn--primary" onclick="handleIntroNext()" aria-label="Следующий экран">Далее →</button>
            </div>
          </div>
        </div>
      `;
    };

    // Экран 4: Встреча с персонажем и старт
    const renderStep4 = () => `
      <div id="intro-step-4" aria-live="polite" role="region" aria-label="Экран 4: Что ты получишь">
        <img class="intro4-bg" src="assets/images/scenes/meeting.png?v=6" alt="" aria-hidden="true">
        <div class="intro-step-4-content">
          <div class="intro4-card fade-in">
            <div class="intro-step-4-section">
              <h2 class="intro-step-4-title" tabindex="-1" autofocus>✨ Что ты получишь</h2>
              <ul class="intro-step-4-list">
                <li>💡 Навыки управления людьми и проектами</li>
                <li>🤝 Умение давать обратную связь и слушать</li>
                <li>⚡ Стратегии разрешения конфликтов</li>
                <li>🛡️ Защиту от выгорания — свою и команды</li>
                <li>📈 Путь развития от лидера 5 человек к масштабированию</li>
              </ul>
            </div>

            <div class="intro-step-4-section intro-step-4-section-second">
              <h2 class="intro-step-4-title">⚙️ Как это работает</h2>
              <p class="intro-step-4-text">Каждый урок — это интерактивное путешествие в реальные сценарии. Ты будешь:</p>
              <ul class="intro-step-4-list">
                <li>🎬 Следить за историей Алекса и его команды</li>
                <li>🤔 Разбирать сложные ситуации через кейсы</li>
                <li>✅ Выполнять практические упражнения</li>
                <li>🎯 Зарабатывать XP и разблокировать новые уровни</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="intro-step-4-nav">
          <button class="btn btn--secondary" onclick="handleIntroPrev()" aria-label="Предыдущий экран">← Назад</button>
          <button class="btn btn--primary" onclick="Router.navigate('#/lesson/1')" aria-label="Начать первый урок">Начать Урок 1 🚀</button>
        </div>
      </div>
    `;

    // Выбираем какой экран показать
    let screenContent = '';
    switch (currentStep) {
      case 1:
        screenContent = renderStep1();
        break;
      case 2:
        screenContent = renderStep2();
        break;
      case 3:
        screenContent = renderStep3();
        break;
      case 4:
        screenContent = renderStep4();
        break;
    }

    app.innerHTML = `
      <div class="app-wrapper">
        ${renderNav()}
        ${renderMenuHTML()}
        <div class="container fade-in">
          ${screenContent}
        </div>
      </div>
    `;

    // Фокусируем заголовок экрана
    setTimeout(() => {
      const heading = document.querySelector('.intro-heading');
      if (heading) heading.focus();
    }, 100);

    // Закрытие меню по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && MenuState.isOpen()) {
        MenuState.close();
      }
    });
  });
}

/**
 * Обработчик клика "Далее" в введении
 */
function handleIntroNext() {
  IntroState.nextStep();
  renderIntro();
}

/**
 * Обработчик клика "Назад" в введении
 */
function handleIntroPrev() {
  IntroState.prevStep();
  renderIntro();
}

/**
 * Главная страница
 */
function renderHome() {
  const app = document.getElementById('app');
  const progress = AppState.get().progress;
  const game = AppState.get().game;

  // Загружаем карту курса
  Lessons.load().then((data) => {
    const modules = data?.modules || [];
    const lessons = data?.lessons || [];

    function renderSkillBar(label, value) {
      const percent = Math.round((value / 10) * 100);
      return `
        <div class="skill-row">
          <div class="skill-label"><span>${label}</span><span>${value}/10</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${percent}%">${percent}%</div></div>
        </div>
      `;
    }

    function lessonCard(lesson) {
      const isCompleted = progress.completedLessons.includes(lesson.id);
      const isUnlocked = Lessons.isLessonUnlocked(lesson.id, progress);
      const lockedClass = isUnlocked ? '' : 'lesson-locked';
      const actionBtn = isUnlocked
        ? `<button class="btn" onclick="Router.navigate('#/lesson/${lesson.id}')">Открыть</button>`
        : `<span class="lock-badge">🔒 Недоступно</span>`;
      const statusBadge = isCompleted
        ? '<span class="badge badge-success">Пройдено</span>'
        : '';

      return `
        <div class="lesson-card ${lockedClass}">
          <div class="lesson-title">Урок ${lesson.id}: ${lesson.title}</div>
          <div class="lesson-meta">${lesson.duration || ''}</div>
          <div>${statusBadge}</div>
          <div class="lesson-actions">${actionBtn}</div>
        </div>
      `;
    }

    const modulesHtml = modules.map((m) => {
      const moduleLessons = lessons.filter(l => m.lessons.includes(l.id));
      return `
        <section class="card module-card">
          <div class="card-header">
            <h3>Модуль ${m.id}: ${m.title}</h3>
          </div>
          <div class="lessons-grid">
            ${moduleLessons.map(lessonCard).join('')}
          </div>
        </section>
      `;
    }).join('');

    app.innerHTML = `
      <div class="app-wrapper">
        ${renderNav()}
        ${renderMenuHTML()}
        <div class="container fade-in">
          <h1 class="text-center">🎯 Team Lead Academy</h1>
          <h2 class="text-center">Прокачай свои лидерские навыки</h2>

          <div class="card mt-md character-card">
            <img class="avatar" src="assets/images/characters/alex/neutral.png" alt="Алекс" onerror="this.style.visibility='hidden'">
            <div class="character-info">
              <h3>Карточка персонажа</h3>
              <p>Имя: <strong>Алекс</strong> · Уровень: <strong>${game.level}</strong> · XP: <strong>${game.xp}</strong></p>
              <div class="skills-list mt-sm">
                ${renderSkillBar('Управление людьми', game.skills['people-management'] || 0)}
                ${renderSkillBar('Управление проектами', game.skills['project-management'] || 0)}
                ${renderSkillBar('Коммуникация', game.skills['communication'] || 0)}
                ${renderSkillBar('Эмоциональный интеллект', game.skills['emotional-intelligence'] || 0)}
                ${renderSkillBar('Развитие команды', game.skills['team-development'] || 0)}
              </div>
            </div>
          </div>
          <div class="modules">
            ${modulesHtml}
          </div>
        </div>
      </div>
    `;

    // Обработчик Escape для закрытия меню
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && MenuState.isOpen()) {
        MenuState.close();
      }
    });
  });
}

/**
 * Экран урока (упрощенная заглушка)
 */
function renderLesson(lessonId) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="app-wrapper">
      ${renderNav()}
      ${renderMenuHTML()}
      <div class="container fade-in">
        <h1>Урок ${lessonId}</h1>
        <div class="card" id="lesson-container">
          <p>Загрузка урока...</p>
        </div>
      </div>
    </div>
  `;

  // Обработчик Escape для закрытия меню
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && MenuState.isOpen()) {
      MenuState.close();
    }
  });

  Lessons.loadLessonContent(lessonId).then((content) => {
    const box = document.getElementById('lesson-container');
    if (!content) {
      box.innerHTML = '<p>Контент урока недоступен. Скоро добавим.</p>';
      return;
    }

    renderLessonContent(box, content);
  });
}

/**
 * Рендер контента урока (введение → теория → кейс → квиз → итоги)
 */
function renderLessonContent(container, content) {
  let currentIndex = 0;

  function renderSection() {
    const section = content.sections[currentIndex];
    if (!section) return;

    const nav = `
      <div class="mt-md">
        <button class="btn btn-outline" ${currentIndex === 0 ? 'disabled class="btn-disabled"' : ''} onclick="void(0)">Назад</button>
        <button class="btn" onclick="void(0)">Далее</button>
      </div>
    `;

    let html = `<h3>${section.title || ''}</h3>`;
    if (section.type === 'intro' && Array.isArray(section.text)) {
      html += section.text.map(p => `<p>${p}</p>`).join('');
    }
    if (section.type === 'theory' && Array.isArray(section.bullets)) {
      html += '<ul>' + section.bullets.map(b => `<li>${b}</li>`).join('') + '</ul>';
    }
    if (section.type === 'case') {
      html += `<p>${section.prompt || ''}</p>`;
      html += '<div class="choice-container">' + section.choices.map(c => `
        <div class="choice ${c.recommended ? 'recommended' : ''}" data-choice="${c.id}">
          <div class="choice-label">Вариант ${c.id.toUpperCase()}</div>
          <div class="choice-text">${c.label}</div>
        </div>
      `).join('') + '</div>';
      html += '<div id="choice-result" class="choice-result hidden"></div>';
    }
    if (section.type === 'quiz') {
      const q = section.questions[0];
      html += `<p>${q.q}</p>`;
      html += '<div class="choice-container">' + q.options.map((opt, i) => `
        <div class="choice" data-answer-index="${i}">
          <div class="choice-text">${opt}</div>
        </div>
      `).join('') + '</div>';
      html += '<div id="quiz-result" class="choice-result hidden"></div>';
    }
    if (section.type === 'summary') {
      const r = section.rewards || { xp: 0, skills: {}, achievements: [] };
      html += `<p>Итоги: XP +${r.xp}</p>`;
      html += '<div class="mt-sm">';
      Object.entries(r.skills || {}).forEach(([k, v]) => {
        html += `<div class="badge badge-info">${k}: +${v}</div> `;
      });
      (r.achievements || []).forEach(a => {
        html += `<div class="badge">🏆 ${a}</div> `;
      });
      html += '</div>';
      html += `<div class="mt-md"><button class="btn" onclick="AppState.completeLesson(${content.id}); Router.navigate('#/home');">Завершить урок</button></div>`;
    }

    container.innerHTML = html + nav;

    // Навешиваем обработчики
    const btns = container.querySelectorAll('.btn');
    if (btns.length >= 2) {
      const back = btns[0];
      const next = btns[1];
      back.onclick = () => { if (currentIndex > 0) { currentIndex--; renderSection(); } };
      next.onclick = () => { if (currentIndex < content.sections.length - 1) { currentIndex++; renderSection(); } };
    }

    if (section.type === 'case') {
      container.querySelectorAll('.choice').forEach(el => {
        el.onclick = () => {
          const id = el.getAttribute('data-choice');
          const selected = section.choices.find(c => c.id === id);
          if (!selected) return;
          // применяем награды
          if (selected.result?.xp) Game.addXP(selected.result.xp);
          if (selected.result?.skills) Object.entries(selected.result.skills).forEach(([k, v]) => Game.updateSkill(k, v));
          if (selected.result?.achievement) Game.unlockAchievement(selected.result.achievement);
          const box = container.querySelector('#choice-result');
          box.classList.remove('hidden');
          box.classList.add(selected.recommended ? 'success' : 'warning');
          box.innerHTML = `<div class="choice-result-info"><span>→ ${selected.result.text}</span></div>`;
        };
      });
    }

    if (section.type === 'quiz') {
      const q = section.questions[0];
      container.querySelectorAll('.choice').forEach(el => {
        el.onclick = () => {
          const idx = parseInt(el.getAttribute('data-answer-index'), 10);
          const res = container.querySelector('#quiz-result');
          const correct = idx === q.answer;
          res.classList.remove('hidden');
          res.classList.toggle('success', correct);
          res.classList.toggle('warning', !correct);
          res.innerHTML = correct ? 'Верно!' : 'Неверно, попробуйте ещё раз.';
        };
      });
    }
  }

  renderSection();
}

/**
 * Экран экзамена (заглушка)
 */
function renderExam() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="app-wrapper">
      ${renderNav()}
      ${renderMenuHTML()}
      <div class="container fade-in">
        <h1>Финальный экзамен</h1>
        <div class="card">
          <p>Симулятор экзамена будет реализован на отдельном этапе.</p>
        </div>
      </div>
    </div>
  `;

  // Обработчик Escape для закрытия меню
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && MenuState.isOpen()) {
      MenuState.close();
    }
  });
}

