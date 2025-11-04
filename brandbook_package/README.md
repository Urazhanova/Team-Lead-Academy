# Brandbook → Dev Starter

This package contains design tokens and ready-to-use CSS + Tailwind settings.

## Files
- `tokens.json` — canonical design tokens.
- `variables.css` — CSS variables + base components.
- `tailwind.config.cjs` — Tailwind theme mapped to tokens.
- `index.html` — Live preview of components + examples.

## Usage (plain CSS)
1. Include Google Fonts for PT Serif and PT Sans.
2. Link `variables.css`.
3. Use the class names from `index.html` as references.

## Usage (Tailwind)
1. Install Tailwind and replace your config with `tailwind.config.cjs`.
2. Use utilities with the provided theme keys.

Accessibility:
- Maintain WCAG contrast ≥ 4.5 for text and ≥ 3.0 for large text.
- Focus rings are implemented with accent color.