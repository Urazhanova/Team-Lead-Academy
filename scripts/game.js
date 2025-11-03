/**
 * Логика геймификации: XP, навыки, достижения
 */

const Game = {
  /**
   * Добавить XP и проверить повышение уровня
   */
  addXP(amount) {
    const result = AppState.addXP(amount);
    
    if (result.levelUp) {
      this.showLevelUpNotification(result.level);
    }
    
    return result;
  },

  /**
   * Обновить навык
   */
  updateSkill(skillId, change) {
    const newValue = AppState.updateSkill(skillId, change);
    return newValue;
  },

  /**
   * Получить достижение
   */
  unlockAchievement(achievementId) {
    const unlocked = AppState.addAchievement(achievementId);
    
    if (unlocked) {
      this.showAchievementNotification(achievementId);
    }
    
    return unlocked;
  },

  /**
   * Показать уведомление о повышении уровня
   */
  showLevelUpNotification(level) {
    // Будет реализовано позже
    console.log(`🎉 Level Up! Теперь уровень ${level}`);
  },

  /**
   * Показать уведомление о достижении
   */
  showAchievementNotification(achievementId) {
    // Будет реализовано позже
    console.log(`🏆 Получено достижение: ${achievementId}`);
  }
};





