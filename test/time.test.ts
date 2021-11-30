import { test } from 'uvu';
import { equal, is } from 'uvu/assert';
import { spyOn, restoreAll } from 'nanospy';

import { showTime, formatDiffTime, getTimeLeft, getFinalTime } from '../src/time';

test.before.each(() => {
  restoreAll();
});

test('showTime changes target element with value', () => {
  const testTarget = { textContent: 'old' } as HTMLElement;
  showTime(testTarget, 'new');
  equal(testTarget, { textContent: 'new' });
});

test('formatDiffTime returns correct string with seconds', () => {
  is(formatDiffTime(2000), '2 seconds');
});

test('formatDiffTime returns correct string with minutes', () => {
  is(formatDiffTime(120000), '2 minutes 0 seconds');
});

test('formatDiffTime returns correct string with hours', () => {
  is(formatDiffTime(7200000), '2 hours 0 minutes 0 seconds');
});

test('formatDiffTime returns correct string with days', () => {
  is(formatDiffTime(172800000), '2 days 0 hours 0 minutes 0 seconds');
});

test('formatDiffTime returns correct string', () => {
  is(formatDiffTime(180122000), '2 days 2 hours 2 minutes 2 seconds');
});

test('formatDiffTime returns empty string for negative diff', () => {
  is(formatDiffTime(-1), '');
});

test('formatDiffTime returns empty string for zero diff', () => {
  is(formatDiffTime(0), '');
});

test('getTimeLeft returns correct string', () => {
  spyOn(global.Date, 'now', () => 1000);
  is(getTimeLeft(3000), '2 seconds');
});

test('getTimeLeft returns empty string for date in past', () => {
  spyOn(global.Date, 'now', () => 10);
  is(getTimeLeft(5), '');
});

test('getFinalTime returns correct value', () => {
  const now = 1638294999404;
  spyOn(global.Date, 'now', () => now);
  is(getFinalTime(1638208599404), 4102444800000);
});

test('getFinalTime returns `null` for negative number', () => {
  spyOn(global.Date, 'now', () => 10);
  is(getFinalTime(-20), null);
});

test('getFinalTime returns `null` for value in the future', () => {
  spyOn(global.Date, 'now', () => 10);
  is(getFinalTime(20), null);
});

test.run();
