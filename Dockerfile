FROM node:10-alpine as builder
COPY /src /tmp/build/src
COPY package.json /tmp/build/
COPY tsconfig.json /tmp/build/
WORKDIR /tmp/build/
RUN npm i
RUN npm run build
RUN npm prune --production

FROM node:10-alpine
ENV BOT_CURRENT_PRESET=prod
WORKDIR /srv
COPY --from=builder /tmp/build/dist /srv/
COPY --from=builder /tmp/build/node_modules /srv/node_modules
CMD ["node", "index.js"]
