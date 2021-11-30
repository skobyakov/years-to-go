import { Settings, SettingsController } from "./settings";

export const showContent = () => {
  const contentContainer = document.getElementById('content');
  const searchInput = <HTMLInputElement>document.getElementById('search-input');
  if (contentContainer) {
    contentContainer.style.display = 'block';
    searchInput.focus();
  }
};

export const hideSettings = () => {
  const settingsContainer = document.getElementById('settings');
  if (settingsContainer) {
    settingsContainer.style.display = 'none';
  }
};

export const onBirthdayBtnClicked = async (
  value: string,
  settingsController: SettingsController,
  cb: (settings: Settings) => void,
) => {
  const birthday = new Date(value).getTime();
  if (!isNaN(birthday) && birthday < Date.now()) {
    const nextSettings = { birthday };
    await settingsController.setSettings(nextSettings);
    cb(nextSettings);
    hideSettings();
    showContent();
  }
};

export const showSettings = (settingsController: SettingsController, cb: (settings: Settings) => void) => {
  const settingsContainer = document.getElementById('settings');
  const birthdayInput = <HTMLInputElement>document.getElementById('birthday-input');
  const birthdayBtn = document.getElementById('birthday-btn');

  if (!birthdayInput || !birthdayBtn || !settingsContainer) {
    return;
  }

  birthdayInput.setAttribute('max', new Date().toISOString().split('T')[0]);
  birthdayBtn.addEventListener('click', () => onBirthdayBtnClicked(birthdayInput.value, settingsController, cb));
  settingsContainer.style.display = 'block';
  birthdayInput.focus();
};
