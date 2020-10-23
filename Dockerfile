FROM node:12

RUN apt update && \
  apt install -y \
    net-tools \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

CMD ["node", "dist/server.js"]
