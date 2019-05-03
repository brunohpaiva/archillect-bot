import dotenv from "dotenv";
import path from "path";
import ArchillectBot from "./ArchillectBot";
import readDir from "./utils/readDir";

const eventsFolder = path.join(__dirname, "events");

async function registerEvents(client: ArchillectBot): Promise<void> {
  const files = await readDir(eventsFolder);
  for (let file of files) {
    const event = file.split(".")[0];
    const module = await import(path.join(eventsFolder, file));
    const executor = module.default;
    const boundExecutor = executor.bind(undefined, client);
    client.on(event, boundExecutor);
  }
}

async function start(): Promise<void> {
  const client = new ArchillectBot();

  try {
    await registerEvents(client);
  } catch (e) {
    console.error("Error registering events.", e);
  }

  await client.login(process.env.DISCORD_BOT_TOKEN);
}

dotenv.config();
start();
