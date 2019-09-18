import { get } from "https";
import { ArchillectImage } from "../types";

const mountUrl = (id: number): string => `https://archillect.com/${id}`;
const IMAGE_URL_REGEX = new RegExp(
  /<meta name="twitter:image" content="(...*?)">/
);
const IMAGE_SOURCES_REGEX = new RegExp(
  /(?:<a href=")(...*?)"(?:>)(\?|\d)(?:<\/a>)/g
);
const SUCCESS_STATUS_CODE = 200;

interface UnloadedImage {
  id: number;
  url?: string;
  sources: {
    google?: string;
    otherLinks: string[];
  };
}

const fetchArchillectImage = (id: number): Promise<ArchillectImage> =>
  new Promise((resolve, reject): void => {
    const url = mountUrl(id);
    const request = get(url, (response): void => {
      const statusCode = response.statusCode;

      if (statusCode !== SUCCESS_STATUS_CODE) {
        response.resume();
        reject(new Error(`Request Failed. Status Code: ${statusCode}`));
        return;
      }

      const image: UnloadedImage = {
        id,
        sources: {
          google: undefined,
          otherLinks: [],
        },
      };

      response.setEncoding("utf8");
      response.on("data", (chunk): void => {
        const chunkString = chunk.toString("utf8");

        const imageUrlRegexResult = IMAGE_URL_REGEX.exec(chunkString);
        if (imageUrlRegexResult && imageUrlRegexResult[1]) {
          image.url = imageUrlRegexResult[1];
        }

        let imageSourcesRegexResult;
        while (
          (imageSourcesRegexResult = IMAGE_SOURCES_REGEX.exec(chunkString)) !=
          null
        ) {
          const url = imageSourcesRegexResult[1];
          if (imageSourcesRegexResult[2] === "?") {
            image.sources.google = url;
          } else {
            image.sources.otherLinks.push(url);
          }
        }
      });

      response.on("end", (): void => {
        if (image.url) {
          resolve(image as ArchillectImage);
        } else {
          reject(new Error(`Couldn't find image with id ${id}.`));
        }
      });

      response.on("error", reject);
    });
    request.on("error", reject);
    request.end();
  });

export default fetchArchillectImage;
