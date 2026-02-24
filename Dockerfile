# 互換性と安定性で選ぶならこれ一択です
FROM node:22-bookworm-slim

WORKDIR /app

# 依存関係のコピー
COPY package*.json ./
# もしビルドでエラーが出る場合は、ここに build-essential 等を追加しますが、
# Next.js 16ならまずはこのままでOKです。
RUN npm install

# ソースのコピー
COPY . .

EXPOSE 3000

# 開発サーバー起動
CMD ["npm", "run", "dev"]
