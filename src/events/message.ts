import ArchillectBot from "../ArchillectBot";
import { Message } from "discord.js";
import { Command } from "../types";

const escapeRegex = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const executor = async (
  client: ArchillectBot,
  message: Message
): Promise<void> => {
  if (message.author.bot || message.channel.type === "dm") return;

  const guildSettings = client.settingsManager.get(message.guild);
  const guildPrefix = guildSettings ? escapeRegex(guildSettings.prefix) : "a!";

  const regex = new RegExp(`^(<@!?${client.user.id}>|${guildPrefix})\\s*`);

  if (!regex.test(message.content)) {
    return;
  }

  const regexResults = message.content.match(regex);
  if (!regexResults) {
    return;
  }

  const [, prefix] = regexResults;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  let commandName = args.shift();

  if (!commandName || commandName.length === 0) {
    return;
  }

  commandName = commandName.toLowerCase();

  if (!client.commands.has(commandName)) {
    message.reply(`Unknown command! Run \`${guildPrefix}help\``);
    return;
  }

  const command = client.commands.get(commandName) as Command;

  try {
    command.run(args, message, client);
  } catch (e) {
    console.error(e);
  }
};

export default executor;
