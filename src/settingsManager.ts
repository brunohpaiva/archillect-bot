import Enmap from "enmap";
import { GuildSettings } from "./types";
import { Guild } from "discord.js";

export const DEFAULT_SETTINGS: GuildSettings = {
  prefix: "a!",
  channelId: undefined,
};

type GuildKey = Guild | string;

const getId = (guildKey: GuildKey): string =>
  typeof guildKey === "string" ? guildKey : guildKey.id;

class SettingsManager {
  public enmap = new Enmap<string, GuildSettings>({
    name: "guild-settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: "deep",
  });

  public ensure(guild: GuildKey): GuildSettings {
    return this.enmap.ensure(getId(guild), DEFAULT_SETTINGS);
  }

  public get(guild: GuildKey): GuildSettings | undefined {
    return this.enmap.get(getId(guild));
  }

  public save(guild: GuildKey, settings: GuildSettings): void {
    this.enmap.set(getId(guild), settings);
  }

  public updateField<F extends keyof GuildSettings, V extends GuildSettings[F]>(
    guild: GuildKey,
    field: F,
    value: V
  ): void {
    this.enmap.set(getId(guild), value, field);
  }

  public delete(guild: GuildKey): void {
    this.enmap.delete(getId(guild));
  }
}

export default SettingsManager;
