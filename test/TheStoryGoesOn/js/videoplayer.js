

$(document).ready(function() {
// opacity when paused
	var vid = document.getElementById("videoBox");
	var pButton = document.getElementById("playButton");
	vid.onplay = function() {
		$(vid).css('opacity', '1');
		$(pButton).css('opacity', '0');
	};
	vid.onpause = function() {
		$(vid).css('opacity', '1');
		$(pButton).css('opacity', '1');
	};

	// vid onclick playstate toggle
	$(vid).add(pButton).click(function() {
		if (vid.paused) {
			vid.play();
			vid.setAttribute("controls","controls")
		}
		else {
			vid.pause();
		}
	});

  // playbutton animation
  $(pButton).add(vid).mouseover(function() {
    $(pButton).attr('src', 'img/play_button.png');
  });
  $(pButton).add(vid).mouseout(function() {
	$(pButton).attr('src', 'img/play_buttonWhite.png');
  });
});
