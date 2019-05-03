import { Guild } from "discord.js";
import ArchillectBot from "../ArchillectBot";
import buildImageEmbed from "../utils/buildImageEmbed";

const executor = (client: ArchillectBot, guild: Guild): void => {
  if (client.latestImage) {
    client.sendImageEmbedToGuild(guild, buildImageEmbed(client.latestImage));
  }
};

export default executor;
