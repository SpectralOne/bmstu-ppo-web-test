FROM node:14

WORKDIR /app
COPY . /app
RUN yarn install --production=true

ENTRYPOINT ["yarn", "start"]
