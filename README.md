# Portfolio — Next.js + Sanity

A bilingual (English / Russian) personal portfolio: static site generation with **Next.js 16**, **React 19**, and **Sanity** as the CMS. Content is fetched at build time; the site is exported as static HTML (`output: 'export'`).

---

## English

### Features

- **Static export** — deploy to any static host (GitHub Pages, S3, etc.).
- **Sanity Studio** — manage homepage, projects, site settings, and media; schema in `sanity/schemaTypes/`.
- **i18n** — UI strings and mapped CMS fields for `ru` and `en` (`src/shared/i18n/`).
- **Theming** — light / dark via `data-theme` and CSS variables (`src/app/globals.css`).
- **Project pages** — dynamic routes at `/<slug>` (e.g. `/chapterfour`), aligned with Sanity project slugs.
- **Animations** — line reveals, image reveals after load (`ImageWithLoader`), text/tag reveals driven by `IntersectionObserver`.

### Tech stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js 16 (App Router), **Webpack** for `dev` and `build` (`--webpack`; optional Turbopack via `dev:turbo`) |
| UI | React 19, global CSS + CSS Modules |
| CMS | Sanity v4, `next-sanity` |
| Language | TypeScript |

### Repository layout (short)

```text
src/app/           # Routes: page, layout, [slug], experiments, project UI
src/shared/        # UI components, i18n, AppContext, Sanity React context
src/widgets/       # Header, Footer
sanity/            # Studio config, GROQ queries, env, schema types
public/            # Static assets (avatars, favicon, etc.)
scripts/           # sanity runner, image optimization helper
```

### Requirements

- **Node.js** 20+ (recommended; LTS aligned with Next 16).
- **npm** (or compatible client).

### Quick start

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd portfolio
   npm install
   ```

2. **Environment**

   Create `.env.local` (see the **Environment variables** table below).

3. **Development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. **Production build (static output)**

   ```bash
   npm run build
   ```

   The static site is written to the `out/` directory (Next `output: 'export'`).

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes (for CMS) | Sanity project ID (site + Studio). |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes (for CMS) | Dataset name (e.g. `production`). |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | API version string; defaults are set in `sanity/env.ts`. |
| `NEXT_PUBLIC_SITE_URL` | Strongly recommended for production | Canonical site URL **without** trailing slash, e.g. `https://example.com`. Used for Open Graph, Twitter images, and absolute URLs. If missing, metadata may fall back to `localhost`. |
| `NEXT_PUBLIC_BASE_PATH` | For subpath deploys | In **production**, base path for GitHub Pages / subfolder hosting. Example: `/portfolio`. Empty string = site at domain root. Dev server always uses no base path. |
| `SANITY_API_READ_TOKEN` | No | Read token for authenticated client / Live preview; public fetches work without it for published content. |
| `SANITY_FETCH_REVALIDATE_SECONDS` | No | Numeric cache revalidation hint for Sanity fetches (see `sanity/lib/getPortfolioHome.ts`). |
| `PREVIEW` | No | Set to `1` with `preview` script so `basePath` is empty when testing export locally. |
| `VERCEL` | No | When `1`, `basePath` is treated as empty (Vercel-style root deploy). |

Studio CLI also understands `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, etc.; `sanity/bootstrapEnv.ts` and `scripts/run-sanity.mjs` mirror `NEXT_PUBLIC_*` into Studio vars when needed.

### npm scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js dev server (**Webpack** — same engine as `build`, avoids Turbopack cache bugs). |
| `npm run dev:turbo` | Dev with Turbopack (faster; if it panics, delete `.next` and retry or use `dev`). |
| `npm run build` | Static export to `out/` (Webpack). |
| `npm run start` | Serves a **non-export** Node server (only if you change config away from `output: 'export'`). |
| `npm run preview` | `PREVIEW=1` build + `serve out` — quick check of static output. |
| `npm run export` | Same as `build` (static export). |
| `npm run deploy` | Build + `gh-pages -d out` (configure repo / branch as needed). |
| `npm run sanity:dev` | Sanity Studio locally (loads `.env` / `.env.local`). |
| `npm run sanity:deploy` | Deploy Studio to Sanity hosting. |
| `npm run lint` | ESLint. |
| `npm run images:optimize` | Helper script for public images (see `scripts/optimize-public-images.mjs`). |

### Deploying static site

- **Root domain**: set `NEXT_PUBLIC_BASE_PATH=` (empty) in the environment used for `npm run build`, and set `NEXT_PUBLIC_SITE_URL` to your real URL.
- **GitHub Pages project site** (`username.github.io/repo/`): set e.g. `NEXT_PUBLIC_BASE_PATH=/repo-name` to match the URL path.
- Output is always **`out/`** — upload that folder or point Pages to it.

### Sanity Studio

- Schemas: `sanity/schemaTypes/`.
- GROQ queries: `sanity/lib/queries.ts`.
- Homepage + settings mapping: `sanity/lib/portfolioMappers.ts`.
- Run locally: `npm run sanity:dev`.
- Deploy: `npm run sanity:deploy` (requires Sanity CLI login and project).

### i18n

- Language is stored in `AppContext` and `localStorage` (`portfolio-lang`).
- Translation files: `src/shared/i18n/locales/en.ts`, `ru.ts`.
- `fillNameInAlt` and CMS localized fields are combined for alt text and labels.

### Troubleshooting

- **Wrong OG / social preview URL** — set `NEXT_PUBLIC_SITE_URL` and rebuild.
- **404 on project pages after export** — every published project slug must be included in static generation (`generateStaticParams`); see `sanity/lib/getProjectBySlug.ts` and `allProjectSlugsQuery`.
- **`IntersectionObserver` / `rootMargin`** — must use `px` or `%`, not `rem` (see `lineReveal.ts`).
- **Build vs Turbopack** — `dev` and `build` use **Webpack**; Turbopack is optional via `dev:turbo`. If dev crashes inside `turbo-persistence` / `static_sorted_file`, remove `.next` (or only `.next/dev/cache/turbopack`) and restart.

---

## Русский

### Возможности

- **Статический экспорт** — можно отдавать с GitHub Pages, CDN или любого статического хостинга.
- **Sanity Studio** — контент главной, проектов, настроек сайта и медиа; схемы в `sanity/schemaTypes/`.
- **Два языка интерфейса** — `ru` и `en`, строки в `src/shared/i18n/`, данные из CMS подмешиваются по языку.
- **Темы** — светлая / тёмная через `data-theme` и CSS-переменные.
- **Страницы проектов** — маршруты `/<slug>` в соответствии со `slug` в Sanity.
- **Анимации** — линии секций, появление текста/тегов по скроллу, картинки с плейсхолдером до `onLoad`.

### Стек

| Уровень | Технология |
|--------|------------|
| Фреймворк | Next.js 16 (App Router), **Webpack** для `dev` и `build` (опционально `dev:turbo`) |
| UI | React 19, глобальные стили + CSS Modules |
| CMS | Sanity v4, `next-sanity` |
| Язык | TypeScript |

### Структура репозитория (кратко)

```text
src/app/           # Маршруты, layout, [slug], experiments, клиентская вёрстка проекта
src/shared/      # Компоненты, i18n, контексты, утилиты
src/widgets/     # Шапка и подвал
sanity/          # Конфиг студии, GROQ, env, типы схем
public/          # Статика
scripts/         # Запуск sanity CLI, оптимизация картинок
```

### Требования

- **Node.js** 20+ (рекомендуется).
- **npm** или совместимый менеджер пакетов.

### Быстрый старт

1. **Клонирование и установка**

   ```bash
   git clone <url-репозитория>
   cd portfolio
   npm install
   ```

2. **Переменные окружения**

   Создайте `.env.local` (см. таблицу **Переменные окружения** ниже).

3. **Режим разработки**

   ```bash
   npm run dev
   ```

   Сайт: [http://localhost:3000](http://localhost:3000).

4. **Сборка статики**

   ```bash
   npm run build
   ```

   Результат в каталоге **`out/`**.

### Переменные окружения

| Переменная | Обязательно | Назначение |
|------------|-------------|------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Да (для CMS) | ID проекта Sanity. |
| `NEXT_PUBLIC_SANITY_DATASET` | Да (для CMS) | Имя датасета (например `production`). |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Нет | Версия API; см. дефолты в `sanity/env.ts`. |
| `NEXT_PUBLIC_SITE_URL` | Очень желательно в проде | Канонический URL **без** завершающего слэша (`https://site.ru`). Нужен для og:image, превью ссылок и абсолютных URL. Без него возможен fallback на localhost в метаданных. |
| `NEXT_PUBLIC_BASE_PATH` | Для подпапки | В **production** — префикс пути (например `/portfolio` для GitHub Pages). Пустая строка = сайт с корня домена. В dev всегда без префикса. |
| `SANITY_API_READ_TOKEN` | Нет | Токен чтения для авторизованного клиента / Live; опубликованный контент доступен и без него. |
| `SANITY_FETCH_REVALIDATE_SECONDS` | Нет | Интервал revalidate для кеша запросов к Sanity. |
| `PREVIEW` | Нет | Для скрипта `preview`: со значением `1` отключает `basePath` при проверке `out/` локально. |
| `VERCEL` | Нет | При `1` считается деплой в корень (без `basePath`). |

Для CLI студии используются `SANITY_STUDIO_*`; скрипты подставляют значения из `NEXT_PUBLIC_*`, если Studio-переменные не заданы.

### Команды npm

| Команда | Описание |
|---------|----------|
| `npm run dev` | Режим разработки Next.js (**Webpack**, как у `build`). |
| `npm run dev:turbo` | Dev через Turbopack; при панике — удалить `.next` или пользоваться `dev`. |
| `npm run build` | Статический экспорт в `out/` (Webpack). |
| `npm run start` | Сервер Next (актуально только если убрать `output: 'export'`). |
| `npm run preview` | Сборка с `PREVIEW=1` и раздача `out/` через `serve`. |
| `npm run export` | То же, что `build`. |
| `npm run deploy` | Сборка + публикация через `gh-pages`. |
| `npm run sanity:dev` | Локальный Sanity Studio. |
| `npm run sanity:deploy` | Деплой Studio на хостинг Sanity. |
| `npm run lint` | ESLint. |
| `npm run images:optimize` | Скрипт оптимизации изображений в `public/`. |

### Публикация статики

- **Корень домена**: в окружении сборки задайте пустой `NEXT_PUBLIC_BASE_PATH` и полный `NEXT_PUBLIC_SITE_URL`.
- **Сайт в подкаталоге** (например `user.github.io/repo/`): `NEXT_PUBLIC_BASE_PATH=/repo`.
- Выкладывайте содержимое **`out/`**.

### Sanity Studio (RU)

- Схемы: `sanity/schemaTypes/`.
- Запросы: `sanity/lib/queries.ts`.
- Маппинг в модель сайта: `sanity/lib/portfolioMappers.ts`.
- Локально: `npm run sanity:dev`.
- Прод: `npm run sanity:deploy` (нужен аккаунт Sanity CLI).

### Локализация

- Язык хранится в контексте и `localStorage` (`portfolio-lang`).
- Файлы: `src/shared/i18n/locales/en.ts`, `ru.ts`.

### Частые проблемы {#troubleshooting-ru}

- **Неверный host в превью ссылок / OG** — задайте `NEXT_PUBLIC_SITE_URL` и пересоберите.
- **404 у проекта после экспорта** — slug должен попадать в список статических путей на сборке; см. `getStaticExportProjectSlugs` и запросы в `sanity/lib/queries.ts`.
- **`rootMargin` у IntersectionObserver** — только `px` или `%`, не `rem`.
- **Сборка и dev** — `next build --webpack` и `next dev --webpack`; при сбое Turbopack удалите `.next`.

---

## License

Private / personal project — adjust this section if you open-source the repo.
