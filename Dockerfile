# 使用 Node.js 18 作為基礎映像
FROM node:18

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製應用程式碼
COPY . .

# 設定環境變數
ENV NODE_ENV=development
ENV PORT=8080
ENV JWT_SECRET=blogger
# 資料庫環境變數
ENV DB_HOST=host.docker.internal
ENV DB_PORT=3306
ENV DB_USERNAME=root
ENV DB_PASSWORD=password
ENV DB_DATABASE=blog

# 暴露端口
EXPOSE 8080

# 啟動應用程式
CMD ["npm", "start"]
