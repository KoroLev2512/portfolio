# Empty Sanity Dataset

Эта ветка рассчитана на подключение отдельного пустого Sanity dataset. Контент Sanity не хранится в git, поэтому “пустые данные” делаются через новый dataset в Sanity project и отдельные env-переменные.

## 1. Создать пустой dataset

Войди в Sanity CLI:

```bash
npx sanity login
```

Создай новый dataset в текущем Sanity project:

```bash
npx sanity dataset create empty-sanity --visibility public
```

Можно выбрать другое имя, например `clean`, `staging` или `portfolio-empty`. Главное — использовать это же имя в env-переменных ниже.

## 2. Подключить dataset локально

В `.env.local` укажи project id и новый dataset:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=empty-sanity

SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=empty-sanity

SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=empty-sanity
```

Для опубликованного публичного контента read token не нужен. Если в `.env.local` уже есть `SANITY_API_READ_TOKEN` от другого проекта, убери его или оставь пустым, чтобы не получить `401 Session does not match project host`.

## 3. Запустить Sanity Studio

```bash
npm run sanity:dev
```

В Studio dataset будет пустым. Создай и опубликуй документы вручную:

- `Site settings`
- `Homepage`
- `Project` при необходимости
- `Experiment` при необходимости

Начальные значения из схемы применяются только при создании нового документа. Уже существующие документы Sanity не обновляются автоматически при изменении `initialValue` в коде.

## 4. Запустить сайт

```bash
npm run dev
```

Если dataset пустой или документы ещё не опубликованы, сайт продолжит работать на fallback-данных из кода и i18n. После публикации `Site settings` / `Homepage` данные подтянутся из Sanity.

## 5. Подключить dataset на деплое

В настройках хостинга укажи те же переменные:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=empty-sanity
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=empty-sanity
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=empty-sanity
```

Для GitHub Pages эти переменные нужно передать в workflow/Actions secrets or variables перед `next build`. Для Vercel — в `Project Settings -> Environment Variables`.

## 6. Проверка

Проверь, что CLI видит новый dataset:

```bash
npx sanity dataset list
```

Проверь, что в Studio выбран нужный dataset, затем создай тестовый `Homepage`, нажми `Publish` и обнови сайт.
