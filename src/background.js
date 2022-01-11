chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message == 'Start ToMute') {
    sendResponse('Success');
  }
});
