# Empty Sanity Dataset

Эта ветка рассчитана на подключение отдельного пустого Sanity dataset. В репозитории не должно быть реального `projectId`, реального `dataset` или токенов: только placeholders. Контент Sanity не хранится в git, поэтому “пустые данные” делаются через новый dataset и отдельные env-переменные.

## 0. Только заглушки на сайте (без своего dataset в браузере)

Git-ветка **не отключает** Sanity сама по себе: если в `.env.local` заданы `NEXT_PUBLIC_SANITY_PROJECT_ID` и `NEXT_PUBLIC_SANITY_DATASET`, Next.js продолжит ходить в твой dataset.

Чтобы на **сайте** (`npm run dev` / `next build`) не подгружать CMS и показывать **заглушки из кода**, добавь в `.env.local`:

```bash
NEXT_PUBLIC_SANITY_DISABLE=1
```

Допустимо и серверное имя (без префикса `NEXT_PUBLIC_`):

```bash
SANITY_DISABLE=1
```

`npm run sanity:dev` на эти переменные **не смотрит** — Studio по-прежнему может использовать твой `SANITY_STUDIO_*` / `NEXT_PUBLIC_*` для работы с пустым dataset.

После изменения `.env.local` перезапусти dev-сервер.

В этом режиме в **шапке**, **hero** и **футере** подставляются нейтральные заглушки из `src/shared/i18n/locales/*/stub.ts` (не персональные строки из `common` и не `FALLBACK_HERO_CONTACTS`).

## 1. Создать пустой dataset

Войди в Sanity CLI:

```bash
npx sanity login
```

Создай новый пустой dataset в нужном Sanity project:

```bash
npx sanity dataset create <your_empty_dataset_name> --visibility public
```

Например, dataset можно назвать `clean`, `staging` или `portfolio-empty`. Не коммить реальное имя dataset, если эта ветка должна оставаться шаблонной.

## 2. Подключить dataset локально

В `.env.local` укажи свои локальные значения вместо placeholders:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_sanity_project_id>
NEXT_PUBLIC_SANITY_DATASET=<your_empty_dataset_name>

SANITY_PROJECT_ID=<your_sanity_project_id>
SANITY_DATASET=<your_empty_dataset_name>

SANITY_STUDIO_PROJECT_ID=<your_sanity_project_id>
SANITY_STUDIO_DATASET=<your_empty_dataset_name>
```

Для опубликованного публичного контента read token не нужен. Если в `.env.local` уже есть `SANITY_API_READ_TOKEN`, убери его или оставь пустым, чтобы случайно не привязать ветку к чужому или старому проекту.

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

В настройках хостинга укажи свои реальные значения вместо placeholders:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_sanity_project_id>
NEXT_PUBLIC_SANITY_DATASET=<your_empty_dataset_name>
SANITY_PROJECT_ID=<your_sanity_project_id>
SANITY_DATASET=<your_empty_dataset_name>
SANITY_STUDIO_PROJECT_ID=<your_sanity_project_id>
SANITY_STUDIO_DATASET=<your_empty_dataset_name>
```

Для GitHub Pages эти переменные нужно передать в workflow/Actions secrets or variables перед `next build`. Для Vercel — в `Project Settings -> Environment Variables`.

## 6. Проверка

Проверь, что CLI видит новый dataset:

```bash
npx sanity dataset list
```

Проверь, что в Studio выбран нужный dataset, затем создай тестовый `Homepage`, нажми `Publish` и обнови сайт.

## 7. Что не коммитить

Не добавляй в git:

- `.env`
- `.env.local`
- реальные Sanity `projectId`
- реальные Sanity `dataset`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`
