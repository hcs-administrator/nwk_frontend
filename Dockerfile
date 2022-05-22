FROM node:17-alpine3.14
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
RUN npm install -g yarn
RUN yarn global add serve
RUN npm run build
COPY ./build .

CMD ["serve"]