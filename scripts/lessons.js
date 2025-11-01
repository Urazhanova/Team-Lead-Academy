/**
 * Управление уроками и контентом
 */

const Lessons = {
  /**
   * Загрузить список уроков/модулей
   */
  async load() {
    try {
      const response = await fetch('data/lessons.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка загрузки уроков:', error);
      return null;
    }
  },

  /**
   * Загрузить контент урока
   */
  async loadLessonContent(lessonId) {
    try {
      const response = await fetch(`data/contents/lesson-${lessonId}.json`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('Контент урока не найден:', lessonId, error);
      return null;
    }
  },

  /**
   * Получить урок по ID
   */
  async getLesson(lessonId) {
    const data = await this.load();
    return data?.lessons?.find(l => l.id === lessonId) || null;
  },

  /**
   * Проверить, доступен ли урок
   */
  isLessonUnlocked(lessonId, currentProgress) {
    return lessonId === 1 || currentProgress.completedLessons.includes(lessonId - 1);
  }
};

