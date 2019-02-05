const getTime = require('date-fns/getTime');
const ArchillectBot = require('./ArchillectBot');
const getNextImageDate = require('./utils/getNextImageDate');

const archillectBot = new ArchillectBot();

const sendLatestImageToGuilds = async guilds =>
  archillectBot.sendImageToGuilds(await archillectBot.getLatestImage(), guilds);

const sendLatestImageAndWait = () => {
  sendLatestImageToGuilds();
  setTimeout(
    () => sendLatestImageAndWait(),
    getTime(getNextImageDate()) - getTime(new Date())
  );
};

archillectBot.client.on('ready', () => {
  console.log(
    `Logged in as ${archillectBot.client.user.username}#${
      archillectBot.client.user.discriminator
    }`
  );

  sendLatestImageAndWait();
});

archillectBot.client.on('guildCreate', guild => {
  if (archillectBot.latestImage) {
    archillectBot.sendImageEmbedToGuild(
      guild,
      archillectBot.buildImageEmbed(archillectBot.latestImage)
    );
  }
});

require('dotenv').config();

archillectBot.discordLogin(process.env.DISCORD_BOT_TOKEN);
