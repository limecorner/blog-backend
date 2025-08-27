#!/bin/bash

echo "🚀 啟動生產環境..."
echo "📊 使用外部資料庫服務"

# 檢查環境變數檔案
if [ ! -f .env.production ]; then
    echo "❌ 錯誤: .env.production 檔案不存在"
    echo "請先設定生產環境的環境變數"
    exit 1
fi

# 停止現有容器
docker-compose down

# 啟動生產環境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

echo "✅ 生產環境已啟動"
echo "📝 查看日誌: docker-compose logs -f backend"
echo "🏥 健康檢查: docker-compose ps"
