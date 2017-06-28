FROM node:8.1-alpine

COPY . /app
WORKDIR /app

RUN npm install --global yarn
RUN npm install
RUN npm run build
RUN yarn global add serve

CMD ["serve", "-s", "build"]
