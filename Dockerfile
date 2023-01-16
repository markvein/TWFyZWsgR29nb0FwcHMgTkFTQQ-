FROM node:18.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

ENV PORT=8080

EXPOSE ${PORT}

CMD ["node", "./dist/index.js"]