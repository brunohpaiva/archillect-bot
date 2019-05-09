import dotenv from "dotenv";
import path from "path";
import readDir from "./utils/readDir";
import ArchillectBot from "./ArchillectBot";

const eventsFolder = path.join(__dirname, "events");

const registerEvents = async (client: ArchillectBot): Promise<void> => {
  const files = await readDir(eventsFolder);
  for (const file of files) {
    const event = file.split(".")[0];
    const module = await import(path.join(eventsFolder, file));
    const executor = module.default;
    const boundExecutor = executor.bind(undefined, client);
    client.on(event, boundExecutor);
  }
};

const start = async (): Promise<void> => {
  const client = new ArchillectBot();

  try {
    await registerEvents(client);
  } catch (e) {
    console.error("Error registering events.", e);
  }

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN);
  } catch (e) {
    console.error("Error logging in discord api", e);
  }
};

dotenv.config();
start();
