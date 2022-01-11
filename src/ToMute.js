function ToMute() {
  let spans = document.getElementsByTagName('span');
  let spanArr = spans && spans.length ? [...spans] : undefined;
  let isAdPlaying = spanArr
    ? spanArr.some(
        (x) =>
          x.hasAttribute('data-a-target') &&
          x.getAttribute('data-a-target') == 'video-ad-label'
      )
    : undefined;

  let buttons = document.getElementsByTagName('button');
  let buttonArr = buttons && buttons.length ? [...buttons] : undefined;
  let muteButton =
    buttonArr && buttonArr.length
      ? buttonArr.find(
          (x) =>
            x.hasAttribute('data-a-target') &&
            x.getAttribute('data-a-target') == 'player-mute-unmute-button'
        )
      : undefined;
  let isMuted = muteButton
    ? muteButton.getAttribute('aria-label') == 'Unmute (m)'
    : undefined;

  if (isAdPlaying != isMuted) {
    muteButton.click();
  }
}

chrome.runtime.sendMessage('Start ToMute', function (response) {
  if (response == 'Success') {
    var readyStateCheckInterval = setInterval(function () {
      if (document.readyState === 'complete') {
        clearInterval(readyStateCheckInterval);
        // ----------------------------------------------------------
        // This part of the script triggers when page is done loading
        MutationObserver =
          window.MutationObserver || window.WebKitMutationObserver;
        var observer = new MutationObserver(function (mutations, observer) {
          ToMute();
        });

        let videoPlayer = document.getElementsByClassName('video-player')[0];
        if (videoPlayer) {
          //Initial run of method so we don't have to wait for a mutation on page load.
          ToMute();
          observer.observe(videoPlayer, {
            attributes: true,
            subtree: true,
          });
        }
        // ----------------------------------------------------------
      }
    }, 10);
  }
});
