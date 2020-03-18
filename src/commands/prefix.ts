import { Message } from "discord.js";
import { Command } from "../types";
import ArchillectBot from "../ArchillectBot";

export default class Prefix implements Command {
  public usage = "prefix <prefix>";

  public async run(
    args: string[],
    message: Message,
    client: ArchillectBot
  ): Promise<void> {
    if (!message.guild) {
      return;
    }

    const guildSettings = client.settingsManager.get(message.guild);
    const currentPrefix = guildSettings ? guildSettings.prefix : "a!";

    if (!message.member?.hasPermission("ADMINISTRATOR")) {
      return;
    }

    if (args.length === 0) {
      await message.channel.send(`Current prefix: \`${currentPrefix}\`
Use \`${currentPrefix}${this.usage}\` to change it.`);
      return;
    }

    const newPrefix = args[0].toLowerCase();

    client.settingsManager.updateField(message.guild.id, "prefix", newPrefix);
    await message.reply("New prefix set!");
  }
}
