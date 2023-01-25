## Development Stage

FROM node:18.12.0-slim AS development

WORKDIR /usr/app

COPY ["package*.json", "yarn.lock", "./"]

ENV NODE_ENV=development

RUN yarn install --frozen-lockfile

COPY . . 

RUN yarn prisma generate

EXPOSE 3000

CMD ["yarn", "start:dev"]