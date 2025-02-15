chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      const site = new URL(tab.url).hostname;
      chrome.storage.local.get(["timeSpent"], (data) => {
        let timeSpent = data.timeSpent || {};
        timeSpent[site] = (timeSpent[site] || 0) + 1;
        chrome.storage.local.set({ timeSpent });
      });
    });
  });
  