#!/bin/bash

echo "🧪 啟動測試環境..."
echo "📊 使用 Docker 內資料庫 (mysql:3306)"

# 停止現有容器
docker-compose down

# 啟動測試環境
docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d

echo "✅ 測試環境已啟動"
echo "🌐 API 地址: http://localhost:8080"
echo "📊 資料庫地址: localhost:13306"
echo "📝 查看日誌: docker-compose logs -f backend"
