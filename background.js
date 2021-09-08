(function () {
	let alarmDict = {}
	const alarmNamePrefix = "auto_tab_close";

	localStorage["src_pages"] = "https://twitter.com/\nhttps://tweetdeck.twitter.com/"
	localStorage["dst_page"] = "https://calendar.google.com/calendar/u/0/r/week"
	localStorage["duration"] = "1"

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		const alarmName = alarmNamePrefix + tabId;
		const targetUrls = localStorage["src_pages"].split("\n");
		let isTargetUrl = false;
		targetUrls.forEach(url => {
			if (tab.url.includes(url)) {
				isTargetUrl = true;
			}
		});

		const periodInMinutes = parseFloat(localStorage["duration"]);

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
		var url = localStorage["dst_page"]
		chrome.tabs.update(targetTabId, { url: url })
		chrome.alarms.clear(alarm.name);
		delete alarmDict[alarm.name];
	});
})();

