#!/usr/bin/env bash
set -euo pipefail

# Конфигурация сервера
SERVER_USER="${SERVER_USER:-root}"
SERVER_IP="${SERVER_IP:-149.154.67.173}"
SERVER_PORT="${SERVER_PORT:-2337}"
SERVER_DIR="${SERVER_DIR:-/var/www/portfolio}"
IMAGE_NAME="portfolio:latest"

echo "========================================================"
echo "🚀 1. Сборка Docker-образа для архитектуры linux/amd64..."
echo "========================================================"

# Подгружаем переменные из .env.local или .env если они есть
if [ -f .env.local ]; then
  # shellcheck disable=SC1091
  set -a; source .env.local; set +a
elif [ -f .env ]; then
  # shellcheck disable=SC1091
  set -a; source .env; set +a
fi

NEXT_PUBLIC_SANITY_PROJECT_ID="${NEXT_PUBLIC_SANITY_PROJECT_ID:-3qddo394}"
NEXT_PUBLIC_SANITY_DATASET="${NEXT_PUBLIC_SANITY_DATASET:-production}"
NEXT_PUBLIC_SANITY_API_VERSION="${NEXT_PUBLIC_SANITY_API_VERSION:-2026-03-19}"
NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://dev-by-yurii.ru}"
NEXT_PUBLIC_BASE_PATH="${NEXT_PUBLIC_BASE_PATH:-}"

docker build --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID="${NEXT_PUBLIC_SANITY_PROJECT_ID}" \
  --build-arg NEXT_PUBLIC_SANITY_DATASET="${NEXT_PUBLIC_SANITY_DATASET}" \
  --build-arg NEXT_PUBLIC_SANITY_API_VERSION="${NEXT_PUBLIC_SANITY_API_VERSION}" \
  --build-arg NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL}" \
  --build-arg NEXT_PUBLIC_BASE_PATH="${NEXT_PUBLIC_BASE_PATH}" \
  -t "${IMAGE_NAME}" .

echo "========================================================"
echo "📦 2. Экспорт и передача сжатого образа на сервер ${SERVER_IP}..."
echo "========================================================"

ARCHIVE_NAME="portfolio.tar.gz"
echo "Сохранение архива ${ARCHIVE_NAME}..."
docker save "${IMAGE_NAME}" | gzip > "${ARCHIVE_NAME}"

echo "Копирование на сервер..."
scp -P "${SERVER_PORT}" "${ARCHIVE_NAME}" "${SERVER_USER}@${SERVER_IP}:${SERVER_DIR}/${ARCHIVE_NAME}"

echo "========================================================"
echo "▶️  3. Загрузка образа и запуск контейнера на сервере..."
echo "========================================================"

ssh -p "${SERVER_PORT}" "${SERVER_USER}@${SERVER_IP}" "cd '${SERVER_DIR}' && docker load < '${ARCHIVE_NAME}' && rm -f '${ARCHIVE_NAME}' && docker compose up -d"
rm -f "${ARCHIVE_NAME}"

echo "========================================================"
echo "✅ Деплой успешно завершён!"
echo "Проверка здоровья:"
echo "curl http://127.0.0.1:3004/api/health"
echo "========================================================"
