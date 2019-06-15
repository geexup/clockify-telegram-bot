# Clockify Telegram Bot
Telegram bot for better & faster interaction with Clockify Timetable

## Try deployed version
Just search in Telegram Messenger for @clockify-bot

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
1. Go to Bot Father (@@BotFather) in Telegram and get your bot token
2. Paste token into `BOT_TOKEN` in `src/environment/presets/dev.ts`
3. Run bot:
```
$: yarn dev
```

## TODO
- Add tslint
- Add tests
- Add Dockerfile
- Add state machine to scenes
- Add English language
- Add Google Authenticator for Admin proof