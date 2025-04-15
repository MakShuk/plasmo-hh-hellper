console.log("Background script starting...");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);

  if (message.action === "ping") {
    console.log("Ping received, sending pong");
    sendResponse({ status: "pong" });
    return true;
  }

  if (message.action === "getPageElement") {
    console.log("Getting page element...");
    // Отправляем сообщение в content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "getPageElement",
          selector: message.selector
        }, (response) => {
          console.log("Received response from content script:", response);
          sendResponse(response);
        });
      }
    });
    return true; // Will respond asynchronously
  }

  if (message.action === "openSidePanel") {
    console.log("Opening side panel...");
    
    if (chrome.sidePanel?.open) {
      chrome.sidePanel.open({ windowId: sender.tab?.windowId }).then(() => {
        console.log("Side panel opened successfully");
        sendResponse({ success: true });
      }).catch((error) => {
        console.log("Failed to open side panel:", error);
        sendResponse({ success: false, error: error.message });
      });
    } else {
      console.log("Side panel API not available");
      sendResponse({ success: false, error: "Side panel API not available" });
    }
    
    return true; // Will respond asynchronously
  }
});

// Обработка установки/обновления расширения
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed/updated:", details.reason);
});