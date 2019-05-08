import { Client, RichEmbed, Message, Guild, TextChannel } from "discord.js";
import scheduler, { Job } from "node-schedule";
import Enmap from "enmap";
import fetchLatestArchillectId from "./utils/fetchLatestArchillectId";
import fetchArchillectImage from "./utils/fetchArchillectImage";
import buildImageEmbed from "./utils/buildImageEmbed";
import { ArchillectImage, GuildSettings } from "./types";

class ArchillectBot extends Client {
  public guildSettings: Enmap;
  public latestImage?: ArchillectImage;
  private task?: Job;

  public constructor() {
    super({
      disabledEvents: ["TYPING_START"],
    });
    this.guildSettings = new Enmap({
      name: "guild-settings",
      fetchAll: false,
      autoFetch: false,
      cloneLevel: "deep",
    });
  }

  public startJob(): void {
    const rule = new scheduler.RecurrenceRule();
    rule.minute = new scheduler.Range(1, undefined, 10);

    const taskExecutor = async (): Promise<void> => {
      const image = await this.getLatestImage();
      await Promise.all(this.sendImageToGuilds(image));
      console.log("Messages sent.", new Date());
    };

    this.task = scheduler.scheduleJob("archillectTask", rule, taskExecutor);
    this.task.invoke();
  }

  public async getLatestImage(): Promise<ArchillectImage> {
    const id = await fetchLatestArchillectId();
    const image = await fetchArchillectImage(id);
    this.latestImage = image;
    return image;
  }

  public async sendEmbedToGuild(
    guild: Guild,
    embed: RichEmbed
  ): Promise<Message | Error> {
    let channel = await this.getArchillectChannel(guild);

    if (!channel) {
      console.log(
        `Trying to create archillect channel for guild ${guild.name}`
      );
      channel = await this.createArchillectChannel(guild);
      await channel.send(
        "Hello! On this channel I will send Archillect's images every 10 minutes."
      );
    } else {
      const lastMessages = await channel.fetchMessages({ limit: 1 });
      if (lastMessages && lastMessages.size === 1) {
        const lastMessage = lastMessages.first();
        if (lastMessage && this.isSameEmbedUrl(lastMessage, embed)) {
          return new Error("Embed already sent.");
        }
      }
    }

    const response = await channel.send({ embed });
    return response as Message;
  }

  public sendImageToGuilds(image: ArchillectImage): Promise<Message | Error>[] {
    const embed = buildImageEmbed(image);
    return this.guilds.map(
      (guild): Promise<Message | Error> => this.sendEmbedToGuild(guild, embed)
    );
  }

  public async getArchillectChannel(
    guild: Guild
  ): Promise<TextChannel | undefined> {
    const settings = (await this.guildSettings.fetch(
      guild.id
    )) as GuildSettings;
    if (!settings || !settings.channelId) return undefined;

    return guild.channels.get(settings.channelId) as (TextChannel | undefined);
  }

  public async createArchillectChannel(guild: Guild): Promise<TextChannel> {
    const channel = (await guild.createChannel(
      "archillect",
      "text",
      undefined,
      "Archillect's images will be sent in this channel"
    )) as TextChannel;

    this.guildSettings.set(guild.id, channel.id, "channelId");

    return channel;
  }

  private isSameEmbedUrl(message: Message, newEmbed: RichEmbed): boolean {
    return (
      message.author.id === this.user.id &&
      message.embeds.length === 1 &&
      newEmbed.url === message.embeds[0].url
    );
  }
}

export default ArchillectBot;
