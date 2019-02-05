const Discord = require('discord.js');
const fetchLatestArchillectId = require('./utils/fetchLatestArchillectId');
const fetchArchillectImage = require('./utils/fetchArchillectImage');
const findArchillectTextChannel = require('./utils/findArchillectTextChannel');

class ArchillectBot {
  constructor() {
    this.client = new Discord.Client();
  }

  async getLatestImage() {
    const id = await fetchLatestArchillectId();
    const image = await fetchArchillectImage(id);
    this.latestImage = image;
    return image;
  }

  buildImageEmbed(image) {
    const embed = new Discord.RichEmbed({
      title: 'New image',
      url: `http://archillect.com/${image.id}`,
      color: 16700087,
      timestamp: new Date().toISOString(),
      author: {
        name: 'Archillect',
        url: 'http://archillect.com',
        icon_url:
          'https://pbs.twimg.com/profile_images/1045579977067024384/S0luKMwQ_400x400.jpg',
      },
      image: { url: image.url },
    });

    embed.addField('Google Image Search', image.sources.google);

    if (image.sources.otherLinks.length > 0) {
      embed.addField('Links', image.sources.otherLinks.join('\n'));
    }

    return embed;
  }

  async sendImageEmbedToGuild(guild, embed) {
    let channel = findArchillectTextChannel(guild);

    if (!channel) {
      console.log(`Trying to create text channel for guild ${guild.name}`);

      try {
        channel = await guild.createChannel('archillect', 'text');
      } catch (error) {
        console.error(error);
        return;
      }
    }

    channel.send({ embed });
  }

  async sendImageToGuilds(image) {
    const embed = this.buildImageEmbed(image);
    this.client.guilds.forEach(
      async guild => await this.sendImageEmbedToGuild(guild, embed)
    );
  }

  async discordLogin(token) {
    console.log('Connecting to discord api');
    await this.client.login(token);
  }
}

module.exports = ArchillectBot;
