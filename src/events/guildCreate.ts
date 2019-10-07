import { Guild } from "discord.js";
import ArchillectBot from "../ArchillectBot";
import buildImageEmbed from "../utils/buildImageEmbed";

const executor = (client: ArchillectBot, guild: Guild): void => {
  client.settingsManager.ensure(guild.id);

  const channel = guild.channels.find(
    (channel): boolean =>
      channel.type === "text" && channel.name === "archillect"
  );

  if (channel) {
    client.settingsManager.updateField(guild, "channelId", channel.id);
  }

  if (client.latestImage) {
    client.sendEmbedToGuild(guild, buildImageEmbed(client.latestImage));
  }
};

export default executor;
