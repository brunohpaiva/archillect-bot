import { Message } from "discord.js";
import { Command, GuildSettings } from "../types";
import ArchillectBot from "../ArchillectBot";

export default class Prefix implements Command {
  public usage = "prefix <prefix>";

  public async run(
    args: string[],
    message: Message,
    client: ArchillectBot
  ): Promise<void> {
    const guildSettings = (await client.guildSettings.fetch(
      message.guild.id
    )) as GuildSettings;
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

    client.guildSettings.set(message.guild.id, newPrefix, "prefix");
    message.reply("New prefix set!");
  }
}
