# Clockify Telegram Bot
![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/geexup/clockify-telegram-bot.svg)

Telegram bot for better & faster interaction with Clockify Timetable

## Try deployed version
Just search in Telegram Messenger for @clockify_bot

## Install
1. Clone this repository:
```
$: git clone https://github.com/geexup/clockify-telegram-bot.git && cd ./clockify-telegram-bot
```

2. Install dependencies:
```
$: npm i
```
OR
```
$: yarn
```

3. Get [mongoDB](https://www.mongodb.com/) up and running

## Run
1. Go to Bot Father (@BotFather) in Telegram and get your bot token
2. Paste token into `BOT_TOKEN` in `src/environment/presets/dev.ts`
3. Run bot:
```
$: yarn dev
```

## Docker
[Here](https://hub.docker.com/r/geexup/clockify-telegram-bot) you can find ready images

### Build
To build docker image just execute this command:
```
$: docker build -t <IMAGE_TAG_NAME> .
```

### RUN

Simple run:
```
docker run --name clockify-bot geexup/clockify-telegram-bot
```

You can pass into container your own environment preset with bot token and mongoDB address as well:
```
docker run -v <PATH_TO_CONFIG>:/srv/environment/presets/preset.js BOT_CURRENT_PRESET=<PRESET_NAME> geexup/clockify-telegram-bot
```

## TODO
- Add tslint
- Add tests
- Add state machine to scenes
- Add English language
- Add Google Authenticator for Admin proof