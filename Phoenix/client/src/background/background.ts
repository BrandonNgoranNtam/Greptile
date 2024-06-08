chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log(msg);
    console.log(sender);
    sendResponse("Front the background Script");
})

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

/*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateBlockedKeywords') {
      chrome.storage.local.set({ blockedKeywords: message.keywords }, () => {
          chrome.tabs.query({}, (tabs) => {
              tabs.forEach(tab => {
                   chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      files: ['contentScript.js']
                  });
              });
          });
      });
      sendResponse({ status: 'success' });
  }
});*/



