import { ArchillectImage } from "../types";
import { RichEmbed } from "discord.js";

const buildImageEmbed = (image: ArchillectImage): RichEmbed => {
  const embed = new RichEmbed({
    title: "New image",
    url: `http://archillect.com/${image.id}`,
    color: 16700087,
    timestamp: new Date(),
    author: {
      name: "Archillect",
      url: "http://archillect.com",
      icon_url:
        "https://pbs.twimg.com/profile_images/1045579977067024384/S0luKMwQ_400x400.jpg",
    },
    image: { url: image.url },
  });

  embed.addField("Google Image Search", image.sources.google);

  if (image.sources.otherLinks.length > 0)
    embed.addField("Links", image.sources.otherLinks.join("\n"));

  return embed;
};

export default buildImageEmbed;
