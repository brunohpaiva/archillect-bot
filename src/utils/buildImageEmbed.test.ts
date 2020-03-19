import buildImageEmbed from "./buildImageEmbed";
import { ArchillectImage } from "../types";
import { MessageEmbedOptions } from "discord.js";

it("builds embed from image", () => {
  const image: ArchillectImage = {
    id: 12345,
    url: "https://example.com/image.png",
    sources: {
      google:
        "https://www.google.com/searchbyimage?safe=off&image_url=https://example.com/image.png",
      otherLinks: [
        "https://example.com/linkOne",
        "https://example.com/linkTwo",
      ],
    },
  };
  const embed = buildImageEmbed(image);
  expect(embed).toMatchObject<MessageEmbedOptions>({
    title: "New image",
    description: undefined,
    url: `https://archillect.com/${image.id}`,
    author: {
      name: "Archillect",
      url: "https://archillect.com",
      iconURL:
        "https://pbs.twimg.com/profile_images/1045579977067024384/S0luKMwQ_400x400.jpg",
    },
    fields: [
      {
        name: "Links",
        value: image.sources.otherLinks.join("\n"),
        inline: false,
      },
    ],
    image: { url: image.url },
  });
});
