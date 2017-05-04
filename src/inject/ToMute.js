chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		var observer = new MutationObserver(function(mutations, observer) {
			if (document.getElementsByClassName("player-ad-overlay js-player-ad-overlay")[0].getAttribute("target") != "_blank" 
				&& document.getElementsByClassName("player-tip")[2].getAttribute("data-tip") == "Mute") {
				document.getElementsByClassName("player-button player-button--volume qa-control-volume")[0].click();
			}
			if (document.getElementsByClassName("player-ad-overlay js-player-ad-overlay")[0].getAttribute("target") == "_blank" 
				&& document.getElementsByClassName("player-tip")[2].getAttribute("data-tip") == "Unmute") {
				document.getElementsByClassName("player-button player-button--volume qa-control-volume")[0].click();
			}
		});
		observer.observe(document.getElementsByClassName("player-ad-overlay js-player-ad-overlay")[0], {
			attributes: true
		});
		// ----------------------------------------------------------

	}
	}, 10);
});