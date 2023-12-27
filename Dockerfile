FROM node

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

EXPOSE 10000

CMD ["node", "index.js"]
