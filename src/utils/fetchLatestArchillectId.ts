import { get } from "http";

const ID_REGEX = new RegExp(/(?:<a href=\/)(\d*?)(?:>)/);
const ARCHILLECT_URL = "http://archillect.com/";

const fetchLatestArchillectId = (): Promise<number> =>
  new Promise(
    (resolve, reject): void => {
      const request = get(
        ARCHILLECT_URL,
        (response): void => {
          const statusCode = response.statusCode;

          if (statusCode !== 200) {
            response.resume();
            reject(new Error(`Request Failed. Status Code: ${statusCode}`));
            return;
          }

          let id: number;

          response.setEncoding("utf8");
          response.on(
            "data",
            (chunk): void => {
              let chunkString = chunk.toString("utf8");
              let regexResults = ID_REGEX.exec(chunkString);

              if (regexResults && regexResults[1]) {
                id = parseInt(regexResults[1]);
                response.destroy();
              }
            }
          );

          response.on("end", (): void => resolve(id));
          response.on("error", reject);
        }
      );
      request.on("error", reject);
      request.end();
    }
  );

export default fetchLatestArchillectId;
