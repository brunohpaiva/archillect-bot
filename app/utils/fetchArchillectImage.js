const http = require('http');

const mountUrl = id => `http://archillect.com/${id}`;
const IMAGE_URL_REGEX = new RegExp(
  /<meta name="twitter:image" content="(...*?)">/
);
const IMAGE_SOURCES_REGEX = new RegExp(
  /(?:<a href=")(...*?)"(?:>)(\?|\d)(?:<\/a>)/g
);

const fetchArchillectImage = id =>
  new Promise((resolve, reject) => {
    const request = http.get(mountUrl(id), response => {
      const statusCode = response.statusCode;

      if (statusCode !== 200) {
        response.resume();
        reject(new Error(`Request Failed. Status Code: ${statusCode}`));
        return;
      }

      const image = {
        id,
        url: undefined,
        sources: {
          google: undefined,
          otherLinks: [],
        },
      };

      response.setEncoding('utf8');
      response.on('data', chunk => {
        let chunkString = chunk.toString('utf8');

        let imageUrlRegexResult = IMAGE_URL_REGEX.exec(chunkString);
        if (imageUrlRegexResult && imageUrlRegexResult[1]) {
          image.url = imageUrlRegexResult[1];
        }

        let imageSourcesRegexResult;
        while (
          (imageSourcesRegexResult = IMAGE_SOURCES_REGEX.exec(chunkString)) !=
          null
        ) {
          let url = imageSourcesRegexResult[1];
          if (imageSourcesRegexResult[2] === '?') {
            image.sources.google = url;
          } else {
            image.sources.otherLinks.push(url);
          }
        }
      });

      response.on('end', () => {
        if (image.url) {
          resolve(image);
        } else {
          reject(new Error(`Couldn't find image with id ${id}.`));
        }
      });

      response.on('error', reject);
    });
    request.on('error', reject);
    request.end();
  });

module.exports = fetchArchillectImage;
