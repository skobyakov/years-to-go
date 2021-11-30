import { test } from 'uvu';
import { is, equal } from 'uvu/assert';
import { spy } from 'nanospy';

import { onSearchClick, onKeyPressed } from '../src/search';

test.before.each(() => {
  global.browser = {
    search: {
      search: spy(),
    },
    tabs: {
      getCurrent: spy(() => ({ id: 42 })),
    },
    storage: {},
  }
});

test('onSearchClick runs Tabs API', async () => {
  await onSearchClick('Test');
  is(browser.tabs.getCurrent.callCount, 1);
});

test('onSearchClick runs Search API with correct args', async () => {
  await onSearchClick('Test');
  is(browser.search.search.callCount, 1);
  equal(browser.search.search.calls, [[{ query: 'Test', tabId: 42 }]]);
});

test('onKeyPressed calls onSearchClick if `enter` was pressed', async () => {
  await onKeyPressed({ key: 'Enter' } as KeyboardEvent, 'Test');
  equal(browser.search.search.calls, [[{ query: 'Test', tabId: 42 }]]);
});

test('onKeyPressed doesnt call onSearchClick if any other key was pressed', async () => {
  await onKeyPressed({ key: 'test' } as KeyboardEvent, 'Test');
  is(browser.search.search.callCount, 0);
});

test.run();
