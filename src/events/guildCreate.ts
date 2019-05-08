import { Guild, TextChannel } from "discord.js";
import ArchillectBot from "../ArchillectBot";
import buildImageEmbed from "../utils/buildImageEmbed";
import { GuildSettings } from "../types";

const DEFAULT_SETTINGS: GuildSettings = { prefix: "a!", channelId: undefined };

const executor = (client: ArchillectBot, guild: Guild): void => {
  const settings = Object.assign({}, DEFAULT_SETTINGS);

  const channel = guild.channels
    .filter(
      (channel): boolean =>
        channel.type === "text" && channel.name === "archillect"
    )
    .first() as TextChannel;

  if (channel) settings.channelId = channel.id;

  client.guildSettings.set(guild.id, settings);

  if (client.latestImage)
    client.sendEmbedToGuild(guild, buildImageEmbed(client.latestImage));
};

export default executor;
