# 使用官方 Node.js 镜像
FROM node:20-alpine AS builder
# 设置工作目录
WORKDIR /app
COPY package.json .
RUN npm install --cache /tmp/npm-cache
RUN npm install -g vite  --cache /tmp/npm-cache

FROM node:20-alpine AS dev
WORKDIR /app
COPY . .
RUN npm install -g vite --cache /tmp/npm-cache
# 暴露端口
EXPOSE 5173
CMD ["vite"]

