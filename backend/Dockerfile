FROM node:19.0.0-buster-slim
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3001

ARG AARYA_JWT_KEY
ARG AARYA_DB_NAME

ENV AARYA_JWT_KEY=$AARYA_JWT_KEY
ENV AARYA_DB_NAME=$AARYA_DB_NAME

RUN npm install -g migrate-mongo

CMD npm run migrate;npm start
