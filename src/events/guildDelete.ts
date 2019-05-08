import { Guild } from "discord.js";
import ArchillectBot from "../ArchillectBot";

const executor = (client: ArchillectBot, guild: Guild): void => {
  client.guildSettings.delete(guild.id);
};

export default executor;
