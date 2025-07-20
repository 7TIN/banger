chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    console.log("BACKGROUND: Sending TOGGLE_SIDEBAR message to tab " + tab.id); // <-- ADD THIS
    chrome.tabs.sendMessage(tab.id, {
      type: "TOGGLE_SIDEBAR",
    },
    // This callback is a good practice to prevent the "Receiving end does not exist" error on pages where the script can't be injected.
    () => chrome.runtime.lastError
    );
  }
});