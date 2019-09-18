import { Message } from "discord.js";
import { Command, GuildSettings } from "../types";
import ArchillectBot from "../ArchillectBot";

export default class Help implements Command {
  public usage = "help";

  public async run(
    _args: string[],
    message: Message,
    client: ArchillectBot
  ): Promise<void> {
    const guildSettings = (await client.guildSettings.fetch(
      message.guild.id
    )) as GuildSettings;
    const guildPrefix = guildSettings ? guildSettings.prefix : "a!";

    message.channel.send(`\`\`\`
${guildPrefix}help - Shows this help message
${guildPrefix}prefix <prefix> - Changes the guild prefix
\`\`\``);
  }
}
