const http = require('http');

const ID_REGEX = new RegExp(/(?:<a href=\/)(\d*?)(?:>)/);
const ARCHILLECT_URL = 'http://archillect.com/';

const fetchLatestArchillectId = () =>
  new Promise((resolve, reject) => {
    const request = http.get(ARCHILLECT_URL, response => {
      const statusCode = response.statusCode;

      if (statusCode !== 200) {
        response.resume();
        reject(new Error(`Request Failed. Status Code: ${statusCode}`));
        return;
      }

      let id;

      response.setEncoding('utf8');
      response.on('data', chunk => {
        let chunkString = chunk.toString('utf8');
        let regexResults = ID_REGEX.exec(chunkString);

        if (regexResults && regexResults[1]) {
          id = parseInt(regexResults[1]);
          response.destroy();
        }
      });

      response.on('end', () => resolve(id));

      response.on('error', reject);
    });
    request.on('error', reject);
    request.end();
  });

module.exports = fetchLatestArchillectId;
