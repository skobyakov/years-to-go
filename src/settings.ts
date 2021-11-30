export interface Settings {
  birthday: number;
};

export class SettingsController {
  private key: string;
  private settings: Settings | null;

  constructor(key: string) {
    this.key = key;
    this.settings = null;
  }

  async getSettings(): Promise<Settings | null> {
    if (this.settings) {
      return this.settings;
    }
    const settings: { settings?: Settings } = await browser.storage.local.get(this.key);
    if (settings && settings.settings && settings.settings.birthday) {
      this.settings = settings.settings;
      return settings.settings;
    }

    return null;
  }

  async setSettings(settings: Settings) {
    await browser.storage.local.set({
      [this.key]: settings
    });
    this.settings = settings;
  }
}
