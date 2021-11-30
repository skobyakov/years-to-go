export const onSearchClick = async (searchValue: string) => {
  const currentTab = await browser.tabs.getCurrent();
  browser.search.search({
    query: searchValue,
    tabId: currentTab.id,
  })
};

export const onKeyPressed = async (e: KeyboardEvent, searchValue: string) => {
  if (e.key === 'Enter') {
    await onSearchClick(searchValue);
  }
}
