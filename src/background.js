// create context menu item
browser.contextMenus.create({
  id: 'mtg-quick-search',
  contexts: ['selection'],
  title: 'MTG Quick Search',
});

// handle clicking the context menu item
browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'mtg-quick-search') {
    browser.tabs.executeScript({
      file: 'mtgQuickSearch.js',
    });
  }
});

// handle the keyboard shortcuts
browser.commands.onCommand.addListener((command) => {
  if (command === 'find-card') {
    browser.tabs.executeScript({
      file: 'mtgQuickSearchFindCard.js',
    });
  } else if (command === 'enter-card') {
    browser.tabs.executeScript({
      file: 'mtgQuickSearchEnterCard.js',
    });
  }
});

// set default options & clean any bad data
let temp;

browser.storage.local
  .get()
  .then((data) => {
    temp = data;
    return browser.storage.local.clear();
  })
  .then(() => {
    return browser.storage.local.set({
      scale: isNaN(temp.scale) ? 1 : temp.scale,
      changeScale: false,
    });
  });
