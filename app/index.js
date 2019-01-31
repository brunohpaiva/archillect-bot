const getTime = require("date-fns/getTime");
const ArchillectBot = require("./ArchillectBot");
const getNextTweetDate = require("./utils/getNextTweetDate");

const archillectBot = new ArchillectBot();

const sendLatestTweet = async guilds =>
  archillectBot.sendArchillectTweet(
    await archillectBot.getLatestTweet(),
    guilds
  );

const sendLatestTweetAndWait = () => {
  sendLatestTweet();
  setTimeout(
    () => sendLatestTweetAndWait(),
    getTime(getNextTweetDate()) - getTime(new Date())
  );
};

archillectBot.client.on("ready", () => {
  console.log(
    `Logged in as ${archillectBot.client.user.username}#${
      archillectBot.client.user.discriminator
    }`
  );

  sendLatestTweetAndWait();
});

archillectBot.client.on("guildCreate", guild => {
  archillectBot.sendArchillectTweet(archillectBot.latestTweet, [guild]);
});

require("dotenv").config();

archillectBot.initTwitterApi({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
archillectBot.discordLogin(process.env.DISCORD_BOT_TOKEN);
