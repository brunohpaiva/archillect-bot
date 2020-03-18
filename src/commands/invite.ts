import { Message, MessageEmbed } from "discord.js";
import { Command } from "../types";
import ArchillectBot from "../ArchillectBot";

const INVITE_URL =
  "https://discordapp.com/oauth2/authorize?client_id={id}&scope=bot&permissions=2064";

export default class Help implements Command {
  public usage = "invite";

  public async run(
    _args: string[],
    message: Message,
    client: ArchillectBot
  ): Promise<void> {
    const inviteUrl = INVITE_URL.replace("{id}", client.user?.id!);
    const embed = new MessageEmbed({
      description: `Click **[HERE](${inviteUrl})** to invite the Archillect Bot to a server`,
    });
    await message.channel.send(embed);
  }
}
