#!/bin/bash

echo "🚀 啟動開發環境..."
echo "📊 使用本地資料庫 (host.docker.internal:3306)"

# 停止現有容器
docker-compose down

# 啟動開發環境
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

echo "✅ 開發環境已啟動"
echo "🌐 API 地址: http://localhost:8080"
echo "📝 查看日誌: docker-compose logs -f backend"
