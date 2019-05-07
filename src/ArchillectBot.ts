import { Client, RichEmbed, Message, Guild, TextChannel } from "discord.js";
import scheduler, { Job } from "node-schedule";
import fetchLatestArchillectId from "./utils/fetchLatestArchillectId";
import fetchArchillectImage from "./utils/fetchArchillectImage";
import findArchillectTextChannel from "./utils/findArchillectTextChannel";
import buildImageEmbed from "./utils/buildImageEmbed";
import { ArchillectImage } from "./types";

class ArchillectBot extends Client {
  public latestImage?: ArchillectImage;
  private task?: Job;

  public constructor() {
    super({
      disabledEvents: ["TYPING_START"],
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

  private isSameImageMessage(message: Message, newEmbed: RichEmbed): boolean {
    return (
      message.author.id === this.user.id &&
      message.embeds.length === 1 &&
      newEmbed.url === message.embeds[0].url
    );
  }

  public async sendImageEmbedToGuild(
    guild: Guild,
    embed: RichEmbed
  ): Promise<void> {
    let channel: TextChannel = findArchillectTextChannel(guild);

    if (!channel) {
      console.log(`Trying to create text channel for guild ${guild.name}`);
      channel = (await guild.createChannel(
        "archillect",
        "text",
        undefined,
        "Archillect's images will be sent in this channel"
      )) as TextChannel;
      channel.send(
        "Hello! On this channel I'll send Archillect's images every 10 minutes."
      );
    } else {
      let lastMessages = await channel.fetchMessages({ limit: 1 });
      if (lastMessages && lastMessages.size === 1) {
        let lastMessage = lastMessages.get(lastMessages.firstKey());
        if (lastMessage && this.isSameImageMessage(lastMessage, embed)) {
          return;
        }
      }
    }

    channel.send({ embed });
  }

  public sendImageToGuilds(image: ArchillectImage): Promise<void>[] {
    const embed = buildImageEmbed(image);
    return this.guilds.map(
      (guild): Promise<void> => this.sendImageEmbedToGuild(guild, embed)
    );
  }
}

export default ArchillectBot;
