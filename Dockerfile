FROM node:14

WORKDIR /app

COPY package*.json ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update && apt-get install curl gnupg -y \
    && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install google-chrome-stable -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install puppeteer --unsafe-perm=true --allow-root

RUN npm i

COPY . ./

EXPOSE 6500

CMD ["node","dist/index.js"]