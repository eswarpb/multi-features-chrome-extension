chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "updateBlocking") {
    if (request.enabled) {
      blockAds(request.customRules);
    }
  }
});

function blockAds(customRules) {
  const adSelectors = [
    "iframe[src*='ad']",
    "div[class*='ad']",
    "img[src*='ad']",
    "a[href*='ad']",
  ];

  if (customRules.length > 0) {
    customRules.forEach((rule) => {
      adSelectors.push(`iframe[src*='${rule}']`);
      adSelectors.push(`div[class*='${rule}']`);
    });
  }

  const ads = document.querySelectorAll(adSelectors.join(","));
  ads.forEach((ad) => ad.remove());

  chrome.storage.local.get(["blockedCount"], (data) => {
    const newCount = (data.blockedCount ?? 0) + ads.length;
    chrome.storage.local.set({ blockedCount: newCount });
  });
}

setInterval(() => {
  chrome.storage.local.get(["enabled", "customRules"], (data) => {
    if (data.enabled) {
      blockAds(data.customRules);
    }
  });
}, 3000);
