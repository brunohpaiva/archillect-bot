import ArchillectBot from "../ArchillectBot";

const executor = (client: ArchillectBot): void => {
  console.log(`Logged in as ${client.user?.tag}`);
  client.startJob();
  client.startUpdatingPresence();
};

export default executor;
