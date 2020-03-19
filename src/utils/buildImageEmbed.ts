import { ArchillectImage } from "../types";
import { MessageEmbed } from "discord.js";

const buildImageEmbed = (image: ArchillectImage): MessageEmbed => {
  const embed = new MessageEmbed({
    title: "New image",
    url: `https://archillect.com/${image.id}`,
    timestamp: new Date(),
    author: {
      name: "Archillect",
      url: "https://archillect.com",
      icon_url:
        "https://pbs.twimg.com/profile_images/1045579977067024384/S0luKMwQ_400x400.jpg",
    },
    image: { url: image.url },
  });

  if (image.sources.otherLinks.length > 0)
    embed.addField("Links", image.sources.otherLinks.join("\n"));

  return embed;
};

export default buildImageEmbed;
