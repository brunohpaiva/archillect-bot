export interface ArchillectImage {
  id: number;
  url: string;
  sources: {
    google: string;
    otherLinks: string[];
  };
}

export interface GuildSettings {
  prefix: string;
  channelId?: string;
}
