import fs from "fs";

const readDir = (path: fs.PathLike): Promise<string[]> =>
  new Promise((resolve, reject): void =>
    fs.readdir(
      path,
      (error: NodeJS.ErrnoException | null, result: string[]): void =>
        error ? reject(error) : resolve(result)
    )
  );

export default readDir;
