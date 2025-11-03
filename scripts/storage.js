/**
 * Управление локальным хранилищем (localStorage)
 * Сохранение и восстановление прогресса курса
 */

const Storage = {
  KEY: 'team-lead-course-progress',

  /**
   * Сохранить прогресс
   */
  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      return false;
    }
  },

  /**
   * Загрузить прогресс
   */
  load() {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      return null;
    }
  },

  /**
   * Очистить прогресс
   */
  clear() {
    try {
      localStorage.removeItem(this.KEY);
      return true;
    } catch (error) {
      console.error('Ошибка очистки:', error);
      return false;
    }
  },

  /**
   * Проверить наличие сохранения
   */
  exists() {
    return localStorage.getItem(this.KEY) !== null;
  }
};

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}





