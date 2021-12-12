browser.contextMenus.create({
  id: 'mtg-quick-search',
  contexts: ['selection'],
  title: 'MTG Quick Search',
});

browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'mtg-quick-search') {
    browser.tabs.executeScript({
      file: 'mtgQuickSearch.js',
    });
  }
});

browser.commands.onCommand.addListener((command) => {
  if (command === 'find-card') {
    browser.tabs.executeScript({
      file: 'mtgQuickSearch.js',
    });
  }
});
