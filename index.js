// TODO convert skip-back and skip-forward button styles to only include the arrow and use ::before {content:"15"} for the number
// TODO derive skip-back and skip-forward values from data attributes (data-adl-skip-back and data-adl-skip-forward?)
// TODO add timestamp-based poster images
// TODO use CSS variables for colors, dimensions, 15 seconds number (via :before or :after + content: --var(...)), etc.
(function(d) {
    var UI_FONT_STACK =
        'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif';
    var CIRCLE_ARROW_PATH =
        'M81.7 35.2C73.5 20.4 54.8 15 40 23.1c-9.8 5.4-15.8 15.8-15.8 26.8L18 43.7c-.8-.8-2-.8-2.8 0-.8.8-.8 2 0 2.8l9.6 9.6c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6l10-10c.8-.8.8-2 0-2.8-.8-.8-2-.8-2.8 0l-6.5 6.5c.1-9.5 5.3-18.5 13.8-23.2 6.2-3.4 13.4-4.3 20.3-2.3s12.5 6.5 16 12.7c3.4 6.2 4.3 13.4 2.3 20.3-2 6.8-6.5 12.5-12.7 16-6.2 3.4-13.4 4.3-20.3 2.3-6.8-2-12.5-6.5-16-12.7-.5-1-1.7-1.3-2.7-.8-1 .5-1.3 1.8-.8 2.7 4 7.2 10.5 12.4 18.4 14.7 2.8.8 5.7 1.2 8.6 1.2 5.1 0 10.2-1.3 14.8-3.8 7.2-4 12.4-10.5 14.7-18.4 1.9-7.9.9-16.2-3-23.3z';
    var SKIP_BACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' x='0px' y='0px'%3E%3Cpath style='fill:white;transform:rotateZ(83deg);transform-origin:center center' d='${CIRCLE_ARROW_PATH}'/%3E%3Ctext x='35px' y='65px' style='fill:white;${UI_FONT_STACK};font-size:1.8em'%3E15%3C/text%3E%3C/svg%3E`;
    var SKIP_FORWARD_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' x='0px' y='0px'%3E%3Cpath style='fill:white;transform:rotateY(180deg) rotateZ(83deg);transform-origin:center center' d='${CIRCLE_ARROW_PATH}'/%3E%3Ctext x='34px' y='65px' style='fill:white;${UI_FONT_STACK};font-size:1.8em'%3E15%3C/text%3E%3C/svg%3E`;
    var NEXT_TRACK_SVG =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' x='0px' y='0px'%3E%3Cpath fill='%23fff' d='M70.38,23a2,2,0,0,0-2,2V46.43L30.67,23.29a2,2,0,0,0-3,1.71V75a2,2,0,0,0,3,1.71L68.38,53.57V75a2,2,0,0,0,4,0V25A2,2,0,0,0,70.38,23ZM31.62,71.43V28.57L66.56,50Z'/%3E%3C/svg%3E";
    var PLAY_SVG =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' x='0px' y='0px'%3E%3Cpath fill='white' d='M11.32848,8.29709l-5.31391,3.068A.343.343,0,0,1,5.5,11.068V4.932a.343.343,0,0,1,.51457-.29709l5.31391,3.068A.343.343,0,0,1,11.32848,8.29709Z'/%3E%3C/svg%3E";
    var STYLES = `
.audile{position:relative;min-width:330px;max-width:550px;width:100%;margin:0 auto;padding:26px 20px 20px;text-align:center;font-size:26px;background-color:#424242;color:#fff;box-sizing:border-box}
.audile[data-adl-attach="top"],.audile[data-adl-attach="bottom"]{position:fixed;left:0}
.audile[data-adl-attach="top"]{top:0}
.audile[data-adl-attach="bottom"]{bottom:0}
@media screen and (min-width:552px){
  .audile{border-radius:20px}
  .audile[data-adl-attach="top"],.audile[data-adl-attach="bottom"]{left:50%;transform:translateX(-50%)}
  .audile[data-adl-attach="top"]{border-radius:0 0 20px 20px}
  .audile[data-adl-attach="bottom"]{border-radius:20px 20px 0 0}
}
.audile audio{position:absolute;visibility:hidden}
.audile button,.audile input{touch-action:manipulation}
.audile button{position:relative;width:60px;height:56px;background-position:center center;background-repeat:no-repeat;background-size:contain;background-color:transparent;color:transparent;border-width:0;border-radius:5px;overflow:hidden}
.audile button:focus{border-color:rgb(54,113,177)}
.audile button[disabled]{opacity:0.5;cursor:not-allowed}
.audile button:not([disabled]):hover{cursor:pointer;box-shadow:0 0 7px 0 rgba(0,0,0,0.5)}
.audile .audile-button-skip-back,.audile .audile-button-skip-forward{background-position:center -2px}
.audile .audile-button-skip-back{background-image:url("${SKIP_BACK_SVG}")}
.audile .audile-button-skip-forward{background-image:url("${SKIP_FORWARD_SVG}")}
.audile .audile-button-track-previous,.audile .audile-button-track-next{background-image:url("${NEXT_TRACK_SVG}");background-size:110% 110%;background-position:-3px -2px}
.audile .audile-button-track-previous{transform:rotateY(180deg)}
.audile .audile-button-track-next{background-image:url("${NEXT_TRACK_SVG}")}
.audile-top-row{position:relative;padding-bottom:50px}
.audile-controls{display:flex;flex-direction:row;align-items:center;justify-content:space-around;max-width:390px;margin:0 auto}
.audile-current-title,.audile-progress-bar{width:100%}
.audile.loading .audile-current-title{color:#bbb;font-style:italic}
.audile-progress-bar,.audile-scrubber-bar[type=range]{-webkit-appearance:none;position:absolute;left:0;bottom:20px;top:auto;width:100%;height:10px;margin:0;background-color:transparent;opacity:1}
.audile-scrubber-bar[type=range]{left:-2px}
.audile-progress-bar{overflow:hidden}
.audile-progress-bar:focus{outline:none}
.loading .audile-progress-bar::before{content:"";position:absolute;width:200px;height:10px;top:0;left:0;background-size:200px 10px;background-image:linear-gradient(to right,transparent,#407bbb,transparent);transform:translateX(-100%);animation:audile-loading-progress 2.1s linear infinite}
@keyframes audile-loading-progress{
  to{transform:translateX(180%)}
}
progress.audile-progress-bar::-webkit-progress-bar{background-position:0 0;background-color:#aaa;border-radius:5px}
progress.audile-progress-bar::-webkit-progress-value{background:#407bbb;border-radius:5px 0 0 5px}
.audile-scrubber-bar[type=range]::-webkit-slider-runnable-track,.audile-scrubber-bar[type=range]:focus::-webkit-slider-runnable-track{-webkit-appearance:none;border:0;background-color:transparent;height:auto}
.audile-scrubber-bar[type=range]::-webkit-slider-thumb{-webkit-appearance:none;cursor:pointer;box-shadow:none;border:1px solid rgba(255,255,255,0.6);background:#407bbb;height:21px;width:21px;margin-top:0;border-radius:50%}
.audile-scrubber-bar[type=range]::-webkit-slider-thumb:hover{background:rgb(55,114,178)}
.audile-current-time,.audile-duration{position:absolute;bottom:0;${UI_FONT_STACK};font-size:13px;line-height:1;color:#aaa}
.audile-current-time{left:0}
.audile-duration{right:0}
.audile-duration:first-letter{letter-spacing:1px}
.audile .audile-button-play-pause{width:80px;height:74px;background-image:url("${PLAY_SVG}");background-size:150px 150px;background-position:-38px center;}
.audile.playing .audile-button-play-pause{background:none}
.audile-button-play-pause:before,.audile-button-play-pause:after{content:"";position:absolute}
.audile.playing .audile-button-play-pause:before,.audile.playing .audile-button-play-pause:after{width:17px;top:10px;left:16px;height:55px;background-color:#fff;border-radius:3px}
.audile.playing .audile-button-play-pause:after{left:45px;}
.audile.loading .audile-button-play-pause{background-image:none}
.audile.loading .audile-button-play-pause:before{top:11px;left:10px;width:50px;height:50px;border:3px solid rgba(255,255,255,.3);border-radius:50%;border-top-color:#fff;animation:audile-spin 1s ease-in-out infinite;}
@keyframes audile-spin{
  to {transform:rotate(360deg)}
}
.audile.loading .audile-scrubber-bar{display:none}
`;
    var KEY_TRACK_SRC = 'audile-track-src';
    var KEY_TRACK_PROGRESS = 'audile-track-progress';

    function formatTimestamp(seconds) {
        seconds = Math.floor(seconds); // ignore milliseconds
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        seconds = seconds % 60;
        var timestamp = '';
        if (hours) {
            timestamp = hours + ':';
        }
        timestamp += minutes < 10 && hours ? '0' : '';
        timestamp += minutes + ':';
        timestamp += seconds < 10 ? '0' : '';
        timestamp += seconds;
        return timestamp;
    }

    var savedTrackSrc = localStorage.getItem(KEY_TRACK_SRC);
    var savedProgress = localStorage.getItem(KEY_TRACK_PROGRESS);

    function attachPlayers() {
        d.querySelectorAll('.audile').forEach(function(wrapper) {
            var tracks = wrapper.querySelectorAll('audio');
            if (!tracks.length) return;

            wrapper.classList.add('loading');

            var topRow = d.createElement('div');
            topRow.className = 'audile-top-row';
            var controls = d.createElement('div');
            controls.className = 'audile-controls';
            var buttonTrackPrevious = d.createElement('button');
            buttonTrackPrevious.className = 'audile-button-track-previous';
            buttonTrackPrevious.textContent = 'Previous track';
            var buttonTrackNext = d.createElement('button');
            buttonTrackNext.className = 'audile-button-track-next';
            buttonTrackNext.textContent = 'Next track';
            var currentTitle = d.createElement('span');
            currentTitle.className = 'audile-current-title';
            currentTitle.innerText = 'Loading…';
            var buttonSkipBack = d.createElement('button');
            buttonSkipBack.className = 'audile-button-skip-back';
            buttonSkipBack.textContent = 'Fast forward 15 seconds';
            var buttonSkipForward = d.createElement('button');
            buttonSkipForward.className = 'audile-button-skip-forward';
            buttonSkipForward.textContent = 'Rewind 15 seconds';
            var buttonPlayPause = d.createElement('button');
            buttonPlayPause.className = 'audile-button-play-pause';
            var progressBar = d.createElement('progress');
            progressBar.className = 'audile-progress-bar';
            progressBar.min = '0';
            progressBar.max = '100';
            // progressBar.value = '0';
            var scrubberBar = d.createElement('input');
            scrubberBar.className = 'audile-scrubber-bar';
            scrubberBar.type = 'range';
            scrubberBar.min = '0';
            scrubberBar.max = '100';
            // scrubberBar.value = '0';
            var currentTime = d.createElement('span');
            currentTime.className = 'audile-current-time';
            currentTime.textContent = '0:00';
            var duration = d.createElement('span');
            duration.className = 'audile-duration';
            duration.textContent = '--:--';

            topRow.appendChild(currentTitle);
            topRow.appendChild(progressBar);
            topRow.appendChild(scrubberBar);
            topRow.appendChild(currentTime);
            topRow.appendChild(duration);
            // topRow.appendChild(timeDisplay);
            if (tracks.length > 1) {
                controls.appendChild(buttonTrackPrevious);
            }
            controls.appendChild(buttonSkipBack);
            controls.appendChild(buttonPlayPause);
            controls.appendChild(buttonSkipForward);
            if (tracks.length > 1) {
                controls.appendChild(buttonTrackNext);
            }

            wrapper.appendChild(topRow);
            wrapper.appendChild(controls);

            var styleElement = d.createElement('style');
            styleElement.innerHTML = STYLES;
            d.head.appendChild(styleElement);

            var isPlaying = false;
            var currentIndex = 0;
            var initialIndex = 0;
            var trackStateBySrc = {};
            if (savedTrackSrc) {
                for (var index = 0; index < tracks.length; index++) {
                    if (tracks[index].src !== savedTrackSrc) continue;
                    initialIndex = index;
                    break;
                }
            }

            if (!tracks[initialIndex]) return;

            function initializePlayer() {
                wrapper.classList.remove('loading');
                updateTrackIndex(initialIndex);
                if (savedProgress) {
                    updateTrackProgress(tracks[initialIndex], savedProgress);
                }
                tracks[initialIndex].removeEventListener('canplay', initializePlayer);
            }

            tracks[initialIndex].addEventListener('canplay', initializePlayer);
            tracks[initialIndex].load();

            function updateTrackProgress(track, time) {
                if (Math.floor(track.currentTime) !== Math.floor(time)) {
                    track.currentTime = time;
                }
                // Only update UI controls if this is the current track and we know its duration
                if (tracks[currentIndex] !== track || Number.isNaN(track.duration)) return;

                var progressValue = parseFloat(((time / track.duration) * 100).toFixed(6));
                progressBar.value = progressValue;
                scrubberBar.value = progressValue;
                currentTime.textContent = formatTimestamp(time);
                duration.textContent = '–' + formatTimestamp(track.duration - track.currentTime);
            }

            function updateTrackIndex(nextIndex) {
                if (!tracks.length) return;
                // Keep it wihin the bounds of the available audio tracks
                nextIndex = Math.max(Math.min(nextIndex, tracks.length - 1), 0);

                tracks.forEach(function(track, index) {
                    track.pause();
                    updateTrackProgress(track, 0);
                });

                currentIndex = nextIndex;
                buttonTrackPrevious.disabled = currentIndex === 0;
                buttonTrackNext.disabled = currentIndex === tracks.length - 1;

                var nextTrack = tracks[currentIndex];
                currentTitle.innerText = nextTrack.title || nextTrack.src;
                duration.textContent = Number.isNaN(nextTrack.duration)
                    ? '--:--'
                    : '–' + formatTimestamp(nextTrack.duration);
                if (isPlaying) {
                    nextTrack.play();
                }
            }

            buttonPlayPause.addEventListener('click', function() {
                if (!tracks.length) return;

                if (!tracks[currentIndex]) {
                    currentIndex = tracks.length - 1;
                }
                // Ensure all non-current tracks are stopped
                tracks.forEach(function(track, index) {
                    if (index === currentIndex) return;
                    track.pause();
                });

                if (isPlaying) {
                    wrapper.classList.remove('playing');
                    tracks[currentIndex].pause();
                } else {
                    wrapper.classList.add('playing');
                    tracks[currentIndex].play();
                }

                isPlaying = !isPlaying;
            });

            buttonTrackPrevious.addEventListener('click', function() {
                var track = tracks[currentIndex];
                if (track && track.currentTime >= 3) {
                    updateTrackProgress(track, 0);
                    return;
                }

                updateTrackIndex(currentIndex - 1);
            });

            buttonTrackNext.addEventListener('click', function() {
                updateTrackIndex(currentIndex + 1);
            });

            buttonSkipBack.addEventListener('click', function() {
                var track = tracks[currentIndex];
                if (!track) return;

                if (track.currentTime < 2) {
                    // If no previous track, reset time to 0
                    if (currentIndex === 0) {
                        updateTrackProgress(track, 0);
                        return;
                    }
                    var previousIndex = currentIndex - 1;
                    var previousTrack = tracks[previousIndex];
                    updateTrackIndex(previousIndex);
                    updateTrackProgress(previousTrack, Math.max(0, previousTrack.duration - 15));
                    return;
                }

                if (track.currentTime <= 15) {
                    updateTrackProgress(track, 0);
                    track.currentTime = 0;
                    return;
                }
                updateTrackProgress(track, track.currentTime - 15);
            });

            buttonSkipForward.addEventListener('click', function() {
                var track = tracks[currentIndex];
                if (!track) return;

                var trackDuration = track.duration;
                var timeFromEnd = trackDuration - track.currentTime;
                // If almost at end and there’s no next track, reset time to end of track
                if (timeFromEnd <= 15) {
                    if (currentIndex >= tracks.length - 1) {
                        track.currentTime = trackDuration;
                        return;
                    }
                    // If within 15 seconds of the end, jump to next track
                    var nextIndex = currentIndex + 1;
                    var nextTrack = tracks[nextIndex];
                    updateTrackIndex(nextIndex);
                    // If more than 7 seconds from the end, start the next track at the beginning
                    if (timeFromEnd >= 7) return;
                    // Else start the next track 15 seconds from current time
                    nextTrack.currentTime = Math.min(nextTrack.duration, 15 - timeFromEnd);
                    return;
                }

                track.currentTime += 15;
            });

            scrubberBar.addEventListener('input', function() {
                var track = tracks[currentIndex];
                if (!track) return;

                var nextTime = (scrubberBar.value / 100) * track.duration;
                updateTrackProgress(track, nextTime);
            });

            tracks.forEach(function(track, index) {
                // Listen for canplaythrough event for each to determine when to show loader and when to play
                track.addEventListener('canplaythrough', function(event) {
                    if (!trackStateBySrc[track.src]) {
                        trackStateBySrc[track.src] = { loaded: true };
                    } else {
                        trackStateBySrc[track.src].loaded = true;
                    }
                });

                track.addEventListener('ended', function() {
                    var nextTrack = tracks[index + 1] || tracks[0];
                    updateTrackIndex(nextTrack);
                });

                track.addEventListener('play', function() {
                    localStorage.setItem(KEY_TRACK_SRC, track.src);
                });

                track.addEventListener('timeupdate', function() {
                    updateTrackProgress(track, track.currentTime);
                    localStorage.setItem(KEY_TRACK_PROGRESS, track.currentTime);
                });
            });
        });
    }

    if (d.readyState === 'loading') {
        d.addEventListener('DOMContentLoaded', attachPlayers);
    } else {
        attachPlayers();
    }
})(document);
