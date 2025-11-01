/**
 * Система персонажей и иллюстраций
 */

const Characters = {
  /**
   * Получить путь к изображению персонажа
   */
  getImagePath(characterId, state) {
    return `assets/images/characters/${characterId}/${characterId}-${state}.webp`;
  },

  /**
   * Создать элемент персонажа
   */
  createCharacterElement(characterId, state, position = 'center') {
    const img = document.createElement('img');
    img.src = this.getImagePath(characterId, state);
    img.alt = `${characterId} - ${state}`;
    img.className = 'character-image character-enter';
    img.onerror = function() {
      // Fallback на placeholder, если изображение не найдено
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23E1E8ED" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%237F8C8D"%3EПерсонаж%3C/text%3E%3C/svg%3E';
    };
    
    return img;
  },

  /**
   * Обновить состояние персонажа
   */
  updateCharacterState(element, newState) {
    if (element && element.dataset) {
      const characterId = element.dataset.characterId;
      element.src = this.getImagePath(characterId, newState);
      element.classList.add('character-state-change');
      
      setTimeout(() => {
        element.classList.remove('character-state-change');
      }, 400);
    }
  }
};


