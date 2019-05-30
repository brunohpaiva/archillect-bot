import { Message } from "discord.js";
import ArchillectBot from "./ArchillectBot";

export interface ArchillectImage {
  id: number;
  url: string;
  sources: {
    google: string;
    otherLinks: string[];
  };
}

export interface GuildSettings {
  prefix: string;
  channelId?: string;
}

export interface Command {
  usage: string;
  aliases?: string[];
  run(args: string[], message: Message, client: ArchillectBot): Promise<void>;
}
