import { Guild } from "discord.js";
import ArchillectBot from "../ArchillectBot";

const executor = (client: ArchillectBot, guild: Guild): void => {
  client.settingsManager.delete(guild.id);
};

export default executor;
