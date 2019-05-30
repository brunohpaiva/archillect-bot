import dotenv from "dotenv";
import path from "path";
import readDir from "./utils/readDir";
import ArchillectBot from "./ArchillectBot";

const registerEvents = async (client: ArchillectBot): Promise<void> => {
  const eventsFolder = path.join(__dirname, "events");
  const files = await readDir(eventsFolder);
  for (const file of files) {
    const event = file.split(".")[0];
    const module = await import(path.join(eventsFolder, file));
    const executor = module.default.bind(undefined, client);
    client.on(event, executor);
  }
};

const registerCommands = async (client: ArchillectBot): Promise<void> => {
  const commandsFolder = path.join(__dirname, "commands");
  const files = await readDir(commandsFolder);
  for (const file of files) {
    const commandName = file.split(".")[0];
    const module = await import(path.join(commandsFolder, file));
    client.commands.set(commandName, new module.default());
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
    await registerCommands(client);
  } catch (e) {
    console.error("Error registering commands.", e);
  }

  try {
    await client.login(process.env.DISCORD_BOT_TOKEN);
  } catch (e) {
    console.error("Error logging in discord api", e);
  }
};

dotenv.config();
start();
