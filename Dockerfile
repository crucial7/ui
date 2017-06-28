FROM node:8.1-alpine

COPY . /app
WORKDIR /app

RUN chmod +x run.sh

CMD ["./run.sh"]
