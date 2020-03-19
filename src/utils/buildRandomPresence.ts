import { PresenceData } from "discord.js";
import ArchillectBot from "../ArchillectBot";
// @ts-ignore TS6059
import presences from "../../presences.json";

interface Replacement {
  string: string;
  replacer: (client: ArchillectBot) => string;
}

const replacements: Replacement[] = [
  {
    string: "{guilds}",
    replacer: (client): string => client.guilds.cache.size.toString(),
  },
  {
    string: "{users}",
    replacer: (client): string => client.users.cache.size.toString(),
  },
];

const buildRandomPresence = (client: ArchillectBot): PresenceData => {
  const randomIndex = Math.floor(Math.random() * presences.length);
  const presence = presences[randomIndex] as PresenceData;

  if (!presence || !presence.activity) {
    throw new Error("Invalid presence");
  }

  let presenceName = presence.activity.name || "";
  replacements.forEach(replacement => {
    presenceName = presenceName.replace(
      replacement.string,
      replacement.replacer(client)
    );
  });

  presence.activity.name = presenceName;

  return presence;
};

export default buildRandomPresence;
