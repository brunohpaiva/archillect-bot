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
    const guildSettings = client.settingsManager.get(message.guild);
    const currentPrefix = guildSettings ? guildSettings.prefix : "a!";

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return;
    }

    if (args.length === 0) {
      message.channel.send(
        `Wrong usage! Use \`${currentPrefix}${this.usage}\``
      );
      return;
    }

    const newPrefix = args[0].toLowerCase();

    client.settingsManager.updateField(message.guild.id, "prefix", newPrefix);
    message.reply("New prefix set!");
  }
}
