FROM node:19.0.0-buster-slim
WORKDIR /backend
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000

ARG DOCKER_AARYA_JWT_KEY
ENV AARYA_JWT_KEY=$DOCKER_AARYA_JWT_KEY


CMD ["npm", "start"]