/**
 * Управление состоянием приложения
 */

const AppState = {
  // Инициализация состояния по умолчанию
  init() {
    const saved = Storage.load();
    
    if (saved) {
      this.state = saved;
    } else {
      this.state = this.getDefaultState();
      this.save();
    }
    
    return this.state;
  },

  /**
   * Состояние по умолчанию
   */
  getDefaultState() {
    // Загружаем конфигурацию
    const config = this.loadConfig();
    
    return {
      progress: {
        completedLessons: [],
        currentLesson: null,
        examCompleted: false
      },
      game: {
        xp: 0,
        level: 1,
        skills: {
          'people-management': config.game.skills.find(s => s.id === 'people-management')?.initialValue || 2,
          'project-management': config.game.skills.find(s => s.id === 'project-management')?.initialValue || 1,
          'communication': config.game.skills.find(s => s.id === 'communication')?.initialValue || 3,
          'emotional-intelligence': config.game.skills.find(s => s.id === 'emotional-intelligence')?.initialValue || 2,
          'team-development': config.game.skills.find(s => s.id === 'team-development')?.initialValue || 1
        },
        achievements: []
      },
      choices: {},
      settings: {
        sound: true,
        animations: true
      }
    };
  },

  /**
   * Загрузить конфигурацию
   */
  loadConfig() {
    // Временно возвращаем дефолтную конфигурацию
    // В реальном проекте можно загрузить из config.json через fetch
    return {
      game: {
        skills: [
          { id: 'people-management', initialValue: 2 },
          { id: 'project-management', initialValue: 1 },
          { id: 'communication', initialValue: 3 },
          { id: 'emotional-intelligence', initialValue: 2 },
          { id: 'team-development', initialValue: 1 }
        ]
      }
    };
  },

  /**
   * Сохранить состояние
   */
  save() {
    Storage.save(this.state);
  },

  /**
   * Получить состояние
   */
  get() {
    return this.state;
  },

  /**
   * Обновить состояние
   */
  update(updates) {
    this.state = { ...this.state, ...updates };
    this.save();
  },

  /**
   * Проверить, пройден ли урок
   */
  isLessonCompleted(lessonId) {
    return this.state.progress.completedLessons.includes(lessonId);
  },

  /**
   * Отметить урок как пройденный
   */
  completeLesson(lessonId) {
    if (!this.isLessonCompleted(lessonId)) {
      this.state.progress.completedLessons.push(lessonId);
      this.save();
    }
  },

  /**
   * Добавить XP
   */
  addXP(amount) {
    this.state.game.xp += amount;
    
    // Проверка повышения уровня
    const oldLevel = this.state.game.level;
    const newLevel = this.calculateLevel(this.state.game.xp);
    
    if (newLevel > oldLevel) {
      this.state.game.level = newLevel;
      // Здесь можно вызвать событие levelUp
    }
    
    this.save();
    return { xp: this.state.game.xp, level: this.state.game.level, levelUp: newLevel > oldLevel };
  },

  /**
   * Рассчитать уровень по XP
   */
  calculateLevel(xp) {
    if (xp < 1000) return 1;
    if (xp < 2000) return 2;
    return 3;
  },

  /**
   * Обновить навык
   */
  updateSkill(skillId, change) {
    const currentValue = this.state.game.skills[skillId] || 0;
    const newValue = Math.max(0, Math.min(10, currentValue + change));
    this.state.game.skills[skillId] = newValue;
    this.save();
    return newValue;
  },

  /**
   * Добавить достижение
   */
  addAchievement(achievementId) {
    if (!this.state.game.achievements.includes(achievementId)) {
      this.state.game.achievements.push(achievementId);
      this.save();
      return true;
    }
    return false;
  }
};

// Инициализация при загрузке
AppState.init();


