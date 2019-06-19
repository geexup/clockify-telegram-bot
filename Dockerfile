FROM node:10-alpine as builder
COPY /src /tmp/build/src
COPY package.json /tmp/build/
COPY tsconfig.json /tmp/build/
WORKDIR /tmp/build/
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm i
RUN npm run build
RUN npm prune --production

FROM node:10-alpine
ENV BOT_CURRENT_PRESET=prod
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
WORKDIR /srv
USER root
# Installs latest Chromium (73) package.
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge=~73.0.3683.103 \
      nss@edge \
      freetype@edge \
      harfbuzz@edge \
      ttf-freefont@edge
COPY --from=builder /tmp/build/dist /srv/
COPY --from=builder /tmp/build/node_modules /srv/node_modules

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && chown -R pptruser:pptruser /srv
USER pptruser
CMD ["node", "index.js"]
