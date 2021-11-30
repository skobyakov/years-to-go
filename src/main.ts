import { onSearchClick, onKeyPressed } from './search';
import { Settings, SettingsController } from './settings';
import { showSettings, showContent } from './layout';
import { showTime, getTimeLeft, getFinalTime } from './time';

const counter = document.getElementById('counter');
const searchInput = <HTMLInputElement>document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

export const start = (settings: Settings) => {
  if (counter && searchInput && searchBtn) {
    const finalTime = getFinalTime(settings.birthday);
    if (finalTime !== null) {
      setInterval(() => showTime(counter, getTimeLeft(finalTime)), 1000);
      showTime(counter, getTimeLeft(finalTime));
      searchBtn.addEventListener('click', () => onSearchClick(searchInput.value));
      searchInput.addEventListener('keypress', (e) => onKeyPressed(e, searchInput.value));
    }
  }
}

(async () => {
  const settingsController = new SettingsController('settings');
  const settings = await settingsController.getSettings();
  if (!settings) {
    showSettings(settingsController, (s) => start(s));
  } else {
    showContent();
    start(settings);
  }
})();


