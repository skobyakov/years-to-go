export const showTime = (targetElm: HTMLElement, time: string) => {
  targetElm.textContent = time;
};

export const formatDiffTime = (diff: number): string => {
  if (diff <= 0) {
    return '';
  }

  let ms = diff;

  const dd = Math.floor(ms / 1000 / 60 / 60 / 24);
  ms -= dd * 1000 * 60 * 60 * 24;

  const hh = Math.floor(ms / 1000 / 60 / 60);
  ms -= hh * 1000 * 60 * 60;

  const mm = Math.floor(ms / 1000 / 60);
  ms -= mm * 1000 * 60;

  const ss = Math.floor(ms / 1000);
  ms -= ss * 1000;

  if (dd) {
    return `${dd} days ${hh} hours ${mm} minutes ${ss} seconds`;
  }

  if (hh) {
    return `${hh} hours ${mm} minutes ${ss} seconds`;
  }

  if (mm) {
    return `${mm} minutes ${ss} seconds`;
  }

  return `${ss} seconds`;
};

export const getTimeLeft = (end: number): string => {
  const date = Date.now();
  const diff = end - date;
  if (diff > 0) {
    return formatDiffTime(diff);
  }

  return '';
};

export const getFinalTime = (birthday: number): number | null => {
  const diff = Date.now() - birthday;
  if (birthday <= 0 || diff < 0) {
    return null;
  }
  const age = (Date.now() - birthday) / 1000 / 60 / 60 / 24 / 365;
  return new Date(0).setFullYear(new Date().getFullYear() + (80 - age));
}
