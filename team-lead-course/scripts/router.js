/**
 * Простой hash‑роутер с поддержкой параметров
 * Примеры путей: '#/home', '#/lesson/7', '#/exam'
 */

const Router = (() => {
  const routes = [];
  let notFoundHandler = null;

  /**
   * Преобразовать шаблон пути в RegExp и список параметров
   * '/lesson/:id' -> { regex: /^#\/lesson\/(\w+)$/, keys: ['id'] }
   */
  function compile(pathPattern) {
    const keys = [];
    const pattern = pathPattern
      .replace(/\//g, '\\/')
      .replace(/:(\w+)/g, (_, key) => {
        keys.push(key);
        return '(\\w+)';
      });
    return { regex: new RegExp('^#' + pattern + '$'), keys };
  }

  function matchRoute(hash) {
    for (const route of routes) {
      const match = hash.match(route.regex);
      if (match) {
        const params = {};
        route.keys.forEach((key, idx) => {
          params[key] = match[idx + 1];
        });
        return { handler: route.handler, params };
      }
    }
    return null;
  }

  function onChange() {
    // Если хэш пустой, устанавливаем стартовый маршрут
    let hash = window.location.hash;
    if (!hash || hash === '#' || hash === '') {
      window.location.hash = '#/intro';
      return;
    }

    const result = matchRoute(hash);
    if (result) {
      result.handler(result.params);
    } else if (notFoundHandler) {
      notFoundHandler();
    } else {
      // По умолчанию на введение
      navigate('#/intro');
    }
  }

  function add(pathPattern, handler) {
    const { regex, keys } = compile(pathPattern);
    routes.push({ regex, keys, handler });
  }

  function navigate(path) {
    if (!path.startsWith('#')) {
      path = '#' + path.replace(/^#?/, '');
    }
    if (window.location.hash === path) {
      // форсируем обработку
      onChange();
    } else {
      window.location.hash = path;
    }
  }

  function setNotFound(handler) {
    notFoundHandler = handler;
  }

  function init() {
    window.addEventListener('hashchange', onChange);
    window.addEventListener('load', onChange);
    // первый прогон
    onChange();
  }

  return { add, navigate, init, setNotFound };
})();

// Экспорт для CommonJS (на всякий случай)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}

