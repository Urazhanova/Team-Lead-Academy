# Team Lead Academy

Интерактивный курс по лидерству для загрузки в Articulate Rise через блок Code (Beta) → Upload project (ZIP).

## Структура проекта

```
team-lead-course/
├── index.html              # Главная точка входа (обязательно!)
├── manifest.json           # Метаданные проекта
├── config.json            # Конфигурация курса
├── assets/                # Ресурсы
│   ├── images/
│   │   ├── characters/    # Иллюстрации персонажей
│   │   ├── scenes/        # Фоновые сцены
│   │   └── ui/            # UI элементы
│   ├── fonts/             # Шрифты (если нужны)
│   └── documents/         # PDF/документы для скачивания
├── scripts/               # JavaScript файлы
│   ├── app.js             # Главный файл
│   ├── router.js          # Роутинг
│   ├── state.js           # Управление состоянием
│   ├── game.js            # Логика XP, навыков
│   ├── characters.js      # Система персонажей
│   ├── lessons.js         # Загрузка уроков
│   └── storage.js         # localStorage
├── styles/                # CSS файлы
│   ├── main.css           # Основные стили
│   ├── components.css     # Компоненты
│   ├── characters.css     # Персонажи
│   └── animations.css     # Анимации
├── data/                  # Данные
│   ├── lessons.json       # Уроки
│   ├── characters.json    # Персонажи
│   └── achievements.json # Достижения
└── ТЗ_ИЛЛЮСТРАЦИИ_ПЕРСОНАЖЕЙ.md
```

## Требования

- Статический фронтенд (HTML/CSS/JS)
- Размер ZIP < 25 МБ (оптимально 15-20 МБ)
- Работает в iframe sandbox
- Без внешних зависимостей (кроме HTTPS запросов, если нужны)

## Разработка

1. Заполнить данными `data/lessons.json`
2. Добавить иллюстрации в `assets/images/characters/`
3. Реализовать компоненты в `scripts/`
4. Настроить стили в `styles/`
5. Собрать ZIP для загрузки в Rise

### Бренд‑настройки
- Подключены `styles/variables.css` и `styles/tokens.json` из brandbook_package
- Переменные в `main.css` используют CSS custom properties `--brand-*`
- Чтобы изменить тему, обновите `variables.css` (или сгенерируйте из `tokens.json`)

## Загрузка в Rise

1. Собрать все файлы в ZIP-архив
2. В Rise выбрать блок Code (Beta)
3. Upload project → выбрать ZIP
4. Проверить отображение и функциональность

## Примечания

- `index.html` должен быть в корне ZIP
- Все пути относительные
- Используется только localStorage (без SCORM/xAPI)
- Избегать `window.open()`, `alert()`, `confirm()`

