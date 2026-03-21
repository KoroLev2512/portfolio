# Sanity Studio

Схема и запросы совпадают с подходом репозитория **[denis-portfolio](https://github.com/knyaze-v-denis/denis-portfolio)** (localized поля, `homepage`, `siteSettings`, `project`, блоки проекта и т.д.).

Сайт собирается с `output: 'export'`: студия деплоится отдельно (`npm run sanity:deploy`), не через маршрут Next.

## Документы

1. **`siteSettings`** — имя, роль, фото, SEO, контакты (кнопки), опции футера.
2. **`homepage`** — текст «о себе», контакты в hero, группы навыков, **Work experience items** (опыт), **Education items** (образование), порядок секций, ссылки на проекты. Блоки «Опыт» и «Образование» на сайте берутся только из этих полей (после **Publish**).

У **новых** документов в Studio в **Hero contacts** и **Contacts CTA buttons** заданы стартовые ссылки (как в схеме); их можно заменить. **Уже сохранённые** документы Sanity не обновляются при смене `initialValue` в коде — отредактируй поля вручную или пересоздай документ.

На сайте: если **Homepage → Hero contacts** пусто, в hero подставляются кнопки из **Site settings → Contacts CTA buttons**. Если в ответе Sanity нет контактов (или подпись в CMS пустая, но `href` задан), текст ссылки строится из URL. Если и там пусто — показываются запасные ссылки из кода (как в схеме по умолчанию).

3. **`project`** — страницы проектов (для будущей интеграции с `/project` / динамическим slug).

## Локально

```bash
npm run sanity:dev
```

Рекомендуется **`npm run sanity:dev`**: `scripts/run-sanity.mjs` читает `.env` / `.env.local` и зеркалит `NEXT_PUBLIC_SANITY_*` → `SANITY_STUDIO_*` до старта CLI.

Нужны переменные из `.env.example`. В бандл студии Vite подставляет **`SANITY_STUDIO_*`**; в **`sanity.cli.ts`** `bootstrapEnv` подгружает `.env` / `.env.local`, а блок **`vite` + `mergeConfig`** явно прописывает `define` для `projectId` / `dataset` из цепочки `SANITY_STUDIO_*` → `NEXT_PUBLIC_*` → `SANITY_*`, чтобы не получить пустой `projectId`, если в окружении были только `NEXT_PUBLIC_*`.

## Деплой студии

```bash
npx sanity login
npm run sanity:deploy
```

## Главная страница Next

При сборке выполняются `homepageQuery` и `siteSettingsQuery`; данные маппятся в текущий UI (`HomePageClient`). Если документов нет — остаются прежние заглушки из кода и i18n.

- Запрос берёт **последний изменённый** документ `homepage` (`order(_updatedAt desc)[0]`), если в проекте несколько «Homepage».
- После правок в Studio нажми **Publish**; черновики без публикации на публичном API не видны.
- В **development** клиент Sanity ходит **без CDN**, чтобы данные обновлялись сразу после Publish.

### Если скиллы / опыт / образование не видны на сайте

У группы навыков поле **Skills** — это объект с массивами **RU** и **EN**; в GROQ его нельзя было подменять `coalesce(..., [])` как массив — из‑за этого теги не доходили до маппера. Сейчас в запросе приходит целый объект `items`.

Импорт контента: в Studio **Import** или `sanity dataset import` для ndjson из экспорта.

## Переменные окружения

См. `.env.example` — формат с `NEXT_PUBLIC_*`, `SANITY_*`, `SANITY_STUDIO_*` и токенами только для сервера.

### 401 `Session does not match project host` (SIO-401-AWH)

Обычно в `.env.local` задан **`SANITY_API_READ_TOKEN` от другого проекта** Sanity, чем `NEXT_PUBLIC_SANITY_PROJECT_ID`. Для **опубликованного** контента на сайте токен не нужен: **удали строку или оставь пустой** — запросы идут через публичный API. Если токен нужен (превью, Live), создай **Read**-токен в [manage](https://www.sanity.io/manage) именно для этого проекта.
