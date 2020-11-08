(function () {
  let alarmDict = {}
  const periodInMinutes = 1;
  const alarmNamePrefix = "auto_tab_close";

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    const alarmName = alarmNamePrefix + tabId;

    const targetUrls = [
      "https://twitter.com/",
      "https://tweetdeck.twitter.com/",
    ];

    let isTargetUrl = false;
    targetUrls.forEach(url => {
      if (tab.url.includes(url)) {
        isTargetUrl = true;
      }
    });

    if (isTargetUrl) {
      if (!alarmDict[alarmName]) {
        chrome.alarms.create(alarmName, { "periodInMinutes": periodInMinutes });
        alarmDict[alarmName] = { url: tab.url, tabId: tabId };
      }
    } else {
      chrome.alarms.clear(alarmName);
      delete alarmDict[alarmName];
    }

  });

  chrome.tabs.onRemoved.addListener(function (tabId, changeInfo) {
    const alarmName = alarmNamePrefix + tabId;
    chrome.alarms.clear(alarmName);
    delete alarmDict[alarmName];
  });

  chrome.alarms.onAlarm.addListener(function (alarm) {
    const targetTabId = alarmDict[alarm.name].tabId;
    // chrome.tabs.remove(targetTabId)
    var url = "https://www.pinterest.jp/";
		// var url = "https://www.tumblr.com/dashboard";
		chrome.tabs.update(targetTabId, {url: url})
    chrome.alarms.clear(alarm.name);
    delete alarmDict[alarm.name];
  });
})();

