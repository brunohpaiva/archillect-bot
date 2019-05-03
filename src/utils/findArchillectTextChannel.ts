import { Guild, TextChannel } from "discord.js";

const findArchillectTextChannel = (guild: Guild): TextChannel =>
  guild.channels.find(
    (channel): boolean =>
      channel.type === "text" && channel.name === "archillect"
  ) as TextChannel;

export default findArchillectTextChannel;
