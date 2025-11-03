# MDB5 Integration Guide

Интегрирована система компонентов **Material Design Bootstrap 5** (MDB5) с сохранением брендовой палитры.

## 📋 Структура

```
styles/MDB/
├── mdb.css                 # 🔗 Главный файл (подключает все компоненты)
├── mdb-typography.css      # 🔤 Типографика + текстовые утилиты
├── mdb-grid.css           # 📐 Сетка (контейнеры, колонны, гаттеры)
├── mdb-components.css     # 🎨 Компоненты (кнопки, карты, формы, модали)
├── mdb-utilities.css      # 🛠️ Служебные классы (display, margin, padding, flex)
└── README.md              # 📖 Документация
```

## 🎯 Приоритет стилей

1. **Брендбук** (variables.css) - CSS переменные `--color-*`, `--brand-*`
2. **MDB5** (MDB/mdb.css) - типографика, сетка, компоненты
3. **Переопределения** (main.css) - специфичные стили проекта

```html
<!-- Порядок подключения (важен!) -->
<link rel="stylesheet" href="styles/variables.css">     <!-- 1️⃣ Brand variables -->
<link rel="stylesheet" href="styles/MDB/mdb.css">       <!-- 2️⃣ MDB styles -->
<link rel="stylesheet" href="styles/main.css">          <!-- 3️⃣ Overrides -->
```

## 🎨 Сохраненные переменные брендбука

**ГАРАНТИРОВАННО ИСПОЛЬЗУЮТСЯ** (не переопределяются MDB):

```css
/* Цвета */
--color-primary: #163F6F
--color-accent: #7C0004
--color-neutral-*: серая шкала
--brand-primary, --brand-accent

/* Типографика */
--font-serif: 'PT Serif'
--font-sans: 'PT Sans'

/* Интервалы */
--space-xs/sm/md/lg/xl/2xl/3xl/4xl
--spacing-*: (alias)

/* Радиусы */
--radius-sm/md/lg/pill
--border-radius*: (alias)

/* Тени */
--shadow-sm/md/lg
```

**Все эти переменные имеют приоритет** - MDB использует их автоматически!

## 📦 Компоненты

### Типографика (mdb-typography.css)

```html
<h1 class="display-1">Очень большой заголовок</h1>
<h2 class="display-2">Большой заголовок</h2>
<p class="lead">Выделенный текст с PT Serif</p>

<div class="text-muted">Приглушенный текст</div>
<span class="text-primary">Основной цвет</span>
<span class="text-accent">Акцентный цвет</span>

<span class="fw-bold">Жирный</span>
<span class="fw-light">Светлый</span>
<span class="text-uppercase">ЗАГЛАВНЫЕ</span>
<span class="fst-italic">Наклонный</span>
```

### Сетка (mdb-grid.css)

```html
<!-- Контейнер -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">Колонна на мобиле 100%, на md 50%, на lg 33%</div>
  </div>
</div>

<!-- Или основной контейнер -->
<div class="container-lg">
  <div class="row g-4">
    <div class="col">Автоматическая ширина</div>
    <div class="col">С гаттером 16px</div>
  </div>
</div>

<!-- Гаттеры (зазоры между колоннами) -->
<div class="row g-0">...</div>    <!-- Без зазора -->
<div class="row g-2">...</div>    <!-- 8px -->
<div class="row g-5">...</div>    <!-- 24px -->
```

### Кнопки (mdb-components.css)

```html
<!-- Основные варианты -->
<button class="btn btn-primary">Основная кнопка</button>
<button class="btn btn-secondary">Вторичная</button>
<button class="btn btn-accent">Акцентная</button>
<button class="btn btn-outline">Обводка</button>
<button class="btn btn-ghost">Призрачная</button>

<!-- Размеры -->
<button class="btn btn-sm btn-primary">Маленькая</button>
<button class="btn btn-primary">Обычная</button>
<button class="btn btn-lg btn-primary">Большая</button>
```

### Карты (mdb-components.css)

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Заголовок карты</h3>
  </div>
  <div class="card-body">
    <p class="card-text">Содержимое карты...</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Действие</button>
  </div>
</div>
```

### Формы (mdb-components.css)

```html
<div class="form-group">
  <label for="email" class="form-label required">Email</label>
  <input type="email" id="email" class="form-control" placeholder="your@email.com">
  <small class="form-text">Введите валидный email</small>
</div>

<div class="form-check">
  <input type="checkbox" id="agree" class="form-check-input">
  <label for="agree" class="form-check-label">Я согласен</label>
</div>
```

### Алерты (mdb-components.css)

```html
<div class="alert alert-primary">
  <div class="alert-icon">ℹ️</div>
  <div class="alert-content">
    <h5 class="alert-heading">Информация</h5>
    Это просто информационное сообщение
  </div>
</div>

<div class="alert alert-accent">
  <div class="alert-icon">⚠️</div>
  <div class="alert-content">Важное предупреждение</div>
</div>

<div class="alert alert-success">
  <div class="alert-icon">✅</div>
  <div class="alert-content">Успешно выполнено</div>
</div>
```

### Бейджи (mdb-components.css)

```html
<span class="badge">Основной</span>
<span class="badge badge-accent">Акцентный</span>
<span class="badge badge-success">Успех</span>
<span class="badge badge-warning">Предупреждение</span>
<span class="badge badge-danger">Ошибка</span>
```

### Модали (mdb-components.css)

```html
<div id="myModal" class="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Модальное окно</h2>
        <button class="btn-close">&times;</button>
      </div>
      <div class="modal-body">
        Содержимое...
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary">Отмена</button>
        <button class="btn btn-primary">Сохранить</button>
      </div>
    </div>
  </div>
</div>
```

## 🛠️ Утилиты (mdb-utilities.css)

### Спейсинг

```html
<!-- Margin -->
<div class="m-3">Отступ со всех сторон (12px)</div>
<div class="mt-5">Отступ сверху (24px)</div>
<div class="mb-4">Отступ снизу (16px)</div>
<div class="mx-auto">Горизонтальное центрирование</div>

<!-- Padding -->
<div class="p-4">Внутренние отступы (16px)</div>
<div class="py-3 px-5">Вертикаль 12px, горизонталь 24px</div>
```

### Flexbox

```html
<div class="d-flex justify-content-center align-items-center gap-3">
  <span>Центрированная</span>
  <span>колонка</span>
</div>

<div class="d-flex flex-wrap gap-4">
  <div class="flex-fill">Занимает все место</div>
  <div class="flex-grow-1">Растет</div>
</div>
```

### Размеры

```html
<div class="w-100">Полная ширина</div>
<div class="w-50">50% ширины</div>
<div class="mw-100">Максимум 100%</div>

<div class="h-100">Полная высота</div>
```

### Display

```html
<div class="d-block">Блок</div>
<span class="d-inline-block">Инлайн-блок</span>
<div class="d-flex">Flexbox</div>
<div class="d-grid">CSS Grid</div>
<div class="d-none">Скрыто</div>

<!-- Адаптивно -->
<div class="d-none d-md-block">Видно только на MD и больше</div>
<div class="d-md-none">Скрыто на MD и больше</div>
```

### Текст

```html
<span class="text-center">Центрированный</span>
<span class="text-start">Влево</span>
<span class="text-end">Вправо</span>
<span class="text-wrap">Переносится</span>
<span class="text-nowrap">Не переносится</span>
```

### Тени и радиусы

```html
<div class="shadow-sm">Маленькая тень</div>
<div class="shadow">Средняя тень</div>
<div class="shadow-lg rounded-lg">Большая тень + скругление</div>

<div class="rounded-0">Острые углы</div>
<div class="rounded-sm">Маленькое скругление</div>
<div class="rounded">Стандартное (12px)</div>
<div class="rounded-lg">Большое (20px)</div>
<div class="rounded-pill">Капсула</div>
<div class="rounded-circle">Круг</div>
```

### Прозрачность

```html
<div class="opacity-0">Невидимое</div>
<div class="opacity-50">50% видимости</div>
<div class="opacity-100">Полностью видимое</div>
```

## 🎬 Примеры использования

### Адаптивный блок

```html
<div class="container-lg mt-5 mb-5">
  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Заголовок</h3>
          <p class="card-text">Описание...</p>
          <button class="btn btn-primary w-100">Действие</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Форма

```html
<form class="container w-50">
  <div class="form-group mb-4">
    <label class="form-label required">Имя</label>
    <input type="text" class="form-control" required>
  </div>

  <div class="form-group mb-4">
    <label class="form-label required">Email</label>
    <input type="email" class="form-control" required>
  </div>

  <div class="form-group mb-5">
    <label class="form-label">Сообщение</label>
    <textarea class="form-control" rows="5"></textarea>
  </div>

  <div class="d-flex gap-3 justify-content-end">
    <button type="reset" class="btn btn-ghost">Очистить</button>
    <button type="submit" class="btn btn-primary">Отправить</button>
  </div>
</form>
```

## ⚠️ Важные замечания

1. **Цвета автоматически используют переменные брендбука** - не нужно что-то делать!
2. **Нет переопределения шрифтов** - используются PT Serif и PT Sans из брендбука
3. **Все отступы и радиусы синхронизированы** с системой переменных
4. **Адаптивность встроена** - используйте `col-md-6`, `d-lg-block`, и т.д.
5. **MDB components.css может конфликтовать** - переопределения в main.css имеют приоритет ✅

## 🔗 Совместимость переменных

| Брендбук | MDB |
|----------|-----|
| `--color-primary` | `var(--color-primary)` ✅ |
| `--color-accent` | `var(--color-accent)` ✅ |
| `--spacing-*` | `--space-*` (оба работают) ✅ |
| `--border-radius-*` | `--radius-*` (оба работают) ✅ |
| `--shadow-*` | `--shadow-*` ✅ |
| `--font-serif` | `var(--font-serif)` ✅ |
| `--font-sans` | `var(--font-sans)` ✅ |

---

**Дата создания:** 2025-11-02
**Версия MDB:** 5.0
**Интеграция с:** Team Lead Academy
