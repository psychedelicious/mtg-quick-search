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

// handle the shortcut key
browser.commands.onCommand.addListener((command) => {
  if (command === 'find-card') {
    browser.tabs.executeScript({
      file: 'mtgQuickSearch.js',
    });
  }
});

// set default scale if it doesn't exist
browser.storage.local.get().then((data) => {
  const _data = {
    shouldShowGathererIcon:
      typeof data.shouldShowGathererIcon === 'boolean'
        ? data.shouldShowGathererIcon
        : true,
    shouldShowScryfallIcon:
      typeof data.shouldShowScryfallIcon === 'boolean'
        ? data.shouldShowScryfallIcon
        : true,
    shouldShowEdhrecIcon:
      typeof data.shouldShowEdhrecIcon === 'boolean'
        ? data.shouldShowEdhrecIcon
        : true,
  };

  browser.storage.local.clear();
  browser.storage.local.set(_data);
});
