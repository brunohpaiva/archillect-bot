# archillect-bot

Discord Bot that fetches images from @archillect twitter account

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. [NodeJS](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
2. [NPM](https://www.npmjs.com/) - Package manager for JavaScript.

### Installing

1. Clone this repository

```bash
$ git clone https://github.com/brunohpaiva/archillect-bot.git
$ cd archillect-bot
```

2. Install dependencies with NPM or Yarn

```bash
$ npm install
```

```bash
$ yarn
```

3. Rename the file `default.env` to `.env` and add your APIs keys

```
TWITTER_CONSUMER_KEY="key"
TWITTER_CONSUMER_SECRET="secret"
TWITTER_ACCESS_TOKEN_KEY="key"
TWITTER_ACCESS_TOKEN_SECRET="secret"
DISCORD_BOT_TOKEN="token"
```

4. Run the bot with NPM or Yarn

```bash
$ npm start
```

```bash
$ yarn start
```

## Required discord bot permissions

- Manage Channels
- Send Messages

## Built With

- [discord.js](https://discord.js.org/) - Powerful node.js module that allows you to interact with the Discord API very easily.
- [node-fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) - FFMPEG cli client for NodeJS.
- [twitter](https://github.com/desmondmorris/node-twitter) - Client library for the Twitter REST and Streaming API's.

## Authors

- **Bruno Henrique Paiva** - _Initial work_ - [brunohpaiva](https://github.com/brunohpaiva)

See also the list of [contributors](https://github.com/brunohpaiva/archillect-bot/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
