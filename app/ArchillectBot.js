const Discord = require('discord.js');
const Twitter = require('twitter');
const isValidArchillectTweet = require('./utils/isValidArchillectTweet');
const isValidArchillinkTweet = require('./utils/isValidArchillinkTweet');
const getMedia = require('./utils/getMedia');
const convertToGif = require('./utils/convertToGif');
const findArchillectTextChannel = require('./utils/findArchillectTextChannel');

const ARCHILLECT_TWITTER_USER_ID = 2907774137;
const ARCHILLINKS_TWITTER_USER_ID = 808595043560857600;

class ArchillectBot {
  constructor() {
    this.client = new Discord.Client();
  }

  initTwitterApi(credentials) {
    this.twitterApi = new Twitter(credentials);
  }

  async getLatestTweet() {
    const latestTweets = await this.twitterApi.get('statuses/user_timeline', {
      user_id: ARCHILLECT_TWITTER_USER_ID,
      count: 3,
      trim_user: true,
    });
    for (let i = 0; i < latestTweets.length; i++) {
      let tweet = latestTweets[i];
      if (this.latestTweet && tweet.id === this.latestTweet.id) {
        break;
      }
      if (!isValidArchillectTweet(tweet)) {
        continue;
      }
      this.latestTweet = tweet;
      return tweet;
    }
    return undefined;
  }

  async getArchillinkTweet(archillectTweet) {
    const latestArchillinkTweets = await this.twitterApi.get(
      'statuses/user_timeline',
      {
        user_id: ARCHILLINKS_TWITTER_USER_ID,
        count: 5,
        trim_user: true,
      }
    );
    for (let i = 0; i < latestArchillinkTweets.length; i++) {
      let tweet = latestArchillinkTweets[i];
      if (isValidArchillinkTweet(tweet, archillectTweet)) {
        return tweet;
      }
    }
  }

  async sendArchillectTweet(tweet, guilds) {
    const embed = new Discord.RichEmbed({
      title: 'New tweet',
      url: `https://twitter.com/archillect/status/${tweet.id_str}`,
      color: 16700087,
      timestamp: tweet.created_at,
      author: {
        name: 'Archillect',
        url: 'https://twitter.com/archillect',
        icon_url:
          'https://pbs.twimg.com/profile_images/1045579977067024384/S0luKMwQ_400x400.jpg',
      },
    });
    const media = getMedia(tweet);
    if (media.type === 'photo') {
      embed.setImage(media.media_url_https);
    } else if (media.type === 'animated_gif') {
      console.log('Converting mp4 to gif...');
      await convertToGif(
        media.video_info.variants.filter(
          variant => variant.content_type === 'video/mp4'
        )[0].url,
        'gif.gif'
      );

      embed.attachFile('gif.gif');
      embed.setImage('attachment://gif.gif');
    }

    let messagesPromises = [];
    if (!guilds) {
      guilds = this.client.guilds;
    }
    guilds.forEach(async guild => {
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

      messagesPromises.push(channel.send({ embed }).catch(console.error));
    });

    const archillinkTweet = await this.getArchillinkTweet(tweet);
    if (archillinkTweet) {
      embed.addField(
        'Links',
        archillinkTweet.entities.urls
          .filter(url => url.expanded_url.indexOf(tweet.id_str) === -1)
          .map(url => url.expanded_url)
          .join('\n')
      );

      Promise.all(messagesPromises).then(messages =>
        messages.forEach(async sentMessage =>
          sentMessage.edit({ embed }).catch(console.error)
        )
      );
    }
  }

  async discordLogin(token) {
    console.log('Connecting to discord api');
    await this.client.login(token);
  }
}

module.exports = ArchillectBot;
