# Blog Backend - Docker 環境配置

## 環境配置

本專案支援三種環境配置：

### 1. 開發環境 (Development)
- **資料庫**: 本地 MySQL (localhost:3306)
- **用途**: 日常開發和測試
- **特點**: 直接連接本地資料庫，方便使用 GUI 工具

### 2. 測試環境 (Test)
- **資料庫**: Docker 內 MySQL (localhost:13306)
- **用途**: 自動化測試和 CI/CD
- **特點**: 環境一致性，可快速重置

### 3. 生產環境 (Production)
- **資料庫**: 外部資料庫服務
- **用途**: 正式部署
- **特點**: 高可用性和可擴展性

## 快速開始

### 開發環境
```bash
# 使用腳本啟動
./scripts/start-dev.sh

# 或手動啟動
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### 測試環境
```bash
# 使用腳本啟動
./scripts/start-test.sh

# 或手動啟動
docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
```

### 生產環境
```bash
# 1. 先設定環境變數
cp .env.production.example .env.production
# 編輯 .env.production 檔案

# 2. 使用腳本啟動
./scripts/start-prod.sh

# 或手動啟動
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 環境變數配置

### 開發環境 (.env.development)
```env
NODE_ENV=development
PORT=8080
JWT_SECRET=blogger_dev_secret
DB_HOST=host.docker.internal
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=blog
```

### 測試環境 (.env.test)
```env
NODE_ENV=test
PORT=8080
JWT_SECRET=blogger_test_secret
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=blog_test
```

### 生產環境 (.env.production)
```env
NODE_ENV=production
PORT=8080
JWT_SECRET=your_production_jwt_secret
DB_HOST=your_production_db_host
DB_PORT=3306
DB_USERNAME=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_DATABASE=blog
```

## 常用命令

### 查看容器狀態
```bash
docker-compose ps
```

### 查看日誌
```bash
# 查看所有服務日誌
docker-compose logs

# 查看特定服務日誌
docker-compose logs backend

# 即時查看日誌
docker-compose logs -f backend
```

### 停止服務
```bash
docker-compose down
```

### 重新建構映像檔
```bash
docker-compose build --no-cache
```

## 資料庫管理

### 開發環境
```bash
# 執行遷移
docker exec -it blog-backend npx sequelize-cli db:migrate

# 執行種子資料
docker exec -it blog-backend npx sequelize-cli db:seed:all

# 重置資料庫
docker exec -it blog-backend npx sequelize-cli db:drop
docker exec -it blog-backend npx sequelize-cli db:create
docker exec -it blog-backend npx sequelize-cli db:migrate
docker exec -it blog-backend npx sequelize-cli db:seed:all
```

### 測試環境
```bash
# 測試環境的資料庫會自動初始化
# 每次重啟都會重置資料庫
```

## 故障排除

### 1. 端口被佔用
```bash
# 檢查端口使用情況
lsof -i :8080
lsof -i :3306
lsof -i :13306

# 停止佔用端口的程序
kill -9 <PID>
```

### 2. 資料庫連接失敗
```bash
# 檢查資料庫是否運行
docker ps | grep mysql

# 檢查網路連接
docker exec -it blog-backend ping mysql
```

### 3. 環境變數問題
```bash
# 檢查容器內的環境變數
docker exec -it blog-backend env | grep DB_
```

## 檔案結構

```
blog-backend/
├── docker-compose.yml          # 基礎配置
├── docker-compose.dev.yml      # 開發環境覆蓋
├── docker-compose.test.yml     # 測試環境覆蓋
├── docker-compose.prod.yml     # 生產環境覆蓋
├── .env.development           # 開發環境變數
├── .env.test                  # 測試環境變數
├── .env.production            # 生產環境變數
├── scripts/                   # 啟動腳本
│   ├── start-dev.sh
│   ├── start-test.sh
│   └── start-prod.sh
└── README-Docker.md           # 本文件
```
