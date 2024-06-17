# 使用官方的Node.js镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制当前目录内容到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

COPY . .

# 设置默认命令
CMD npm run serve
