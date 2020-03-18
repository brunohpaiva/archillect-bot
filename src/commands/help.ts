import { Message } from "discord.js";
import { Command } from "../types";
import ArchillectBot from "../ArchillectBot";

export default class Help implements Command {
  public usage = "help";

  public async run(
    _args: string[],
    message: Message,
    client: ArchillectBot
  ): Promise<void> {
    if (!message.guild) {
      return;
    }

    const guildSettings = client.settingsManager.get(message.guild);
    const prefix = guildSettings ? guildSettings.prefix : "a!";

    await message.channel.send(`\`\`\`
${prefix}help - Shows this help message
${prefix}prefix <prefix> - Changes the guild prefix
${prefix}invite - Sends the invite link for this bot
\`\`\``);
  }
}
