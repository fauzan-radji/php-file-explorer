class VideoPlayer {
  constructor(id) {
    this.id = id;
    this.container = document.getElementById(id);
    this.video = this.container.querySelector("video");
    this.currentTimeEl = this.container.querySelector(".current-time");
    this.durationEl = this.container.querySelector(".duration");
    this.progressBar = this.container.querySelector(".progress-bar");
    this.progressBarFilled = this.progressBar.querySelector(
      ".progress-bar .filled"
    );
    this.volumeSlider = this.container.querySelector(".volume-slider");
    this.toggleMuteBtn = this.container.querySelector(".mute-button");
    this.toggleMuteBtnIcon = this.toggleMuteBtn.querySelector(".button__icon");
    this.seekerBtns = this.container.querySelectorAll(".seeker-button");
    this.playBtn = this.container.querySelector(".play-button");
    this.playBtnIcon = this.playBtn.querySelector(".button__icon");
    this.toggleFullscreenBtn =
      this.container.querySelector(".fullscreen-button");
    this.toggleSettingsButton =
      this.container.querySelector(".settings-button");
    this.settingsPopup = this.container.querySelector(".settings-popup");
    this.playbackRateRadios = this.container.querySelectorAll(".playback-rate");

    // Listeners
    this.initListeners();
  }

  mousedown = false;

  initListeners() {
    this.video.addEventListener("play", () => this.playVideo());
    this.video.addEventListener("pause", () => this.pauseVideo());
    this.video.addEventListener("click", () => this.togglePlay());
    this.video.addEventListener("timeupdate", () => this.updateTime());
    this.video.addEventListener("canplay", () => this.updateDuration());

    this.progressBar.addEventListener(
      "mousedown",
      () => (this.mousedown = true)
    );
    window.addEventListener("mouseup", () => (this.mousedown = false));
    this.progressBar.addEventListener("mousemove", (e) => {
      if (this.mousedown) this.updateCurrentTime(e);
    });
    this.progressBar.addEventListener("click", (e) =>
      this.updateCurrentTime(e)
    );

    this.volumeSlider.addEventListener("input", () => {
      this.changeVolume();
    });

    this.toggleMuteBtn.addEventListener("click", () => this.toggleMuteVideo());

    this.seekerBtns.forEach((seekerBtn) =>
      seekerBtn.addEventListener("click", () => {
        this.seekVideo(seekerBtn.dataset.seek);
      })
    );

    this.playBtn.addEventListener("click", () => this.togglePlay());

    this.toggleFullscreenBtn.addEventListener("click", () =>
      this.toggleFullscreen()
    );

    this.toggleSettingsButton.addEventListener("click", () =>
      this.toggleSettingsPopup()
    );
    this.playbackRateRadios.forEach((radio) => {
      radio.addEventListener("change", () =>
        this.changeVideoPlaybackRate(radio.value)
      );
    });
  }

  // Handlers
  togglePlay() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  playVideo() {
    this.playBtnIcon.src = "icons/pause.png";
  }

  pauseVideo() {
    this.playBtnIcon.src = "icons/play.png";
  }

  updateTime() {
    const currentTime = parseTime(this.video.currentTime);
    this.currentTimeEl.textContent = timeStringify(currentTime);

    this.progressBarFilled.style.width =
      (this.video.currentTime / this.video.duration) * 100 + "%";
  }

  updateDuration() {
    const duration = parseTime(this.video.duration);
    this.durationEl.textContent = timeStringify(duration);
  }

  updateCurrentTime(e) {
    const boundRect = this.progressBar.getBoundingClientRect();
    const x = (e.clientX - boundRect.left) / boundRect.width;
    const currentTime = x * this.video.duration;
    const percent = x * 100;

    this.video.currentTime = currentTime;
    this.progressBarFilled.style.width = `${percent}%`;
  }

  changeVolume() {
    const volume = this.volumeSlider.value;
    this.video.volume = keepInRange(volume, 0, 1);
  }

  toggleMuteVideo() {
    this.video.muted = !this.video.muted;
    if (this.video.muted) {
      this.toggleMuteBtnIcon.src = "icons/mute.png";
    } else {
      this.toggleMuteBtnIcon.src = "icons/high-volume.png";
    }
  }

  seekVideo(seek) {
    this.video.currentTime += parseInt(seek);
  }

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.container.requestFullscreen();
    }
  }

  toggleSettingsPopup() {
    this.settingsPopup.classList.toggle("hidden");
    if (this.settingsPopup.classList.contains("hidden")) {
      this.toggleSettingsButton.classList.remove("hover");
    } else {
      this.toggleSettingsButton.classList.add("hover");
    }
  }

  changeVideoPlaybackRate(playback) {
    this.video.playbackRate = parseFloat(playback);
  }
}

// const video = {
//   container: document.querySelector(".container"),
//   video: document.querySelector("#video"),
//   currentTimeEl: document.querySelector(".current-time"),
//   durationEl: document.querySelector(".duration"),
//   progressBar: document.querySelector(".progress-bar"),
//   progressBarFilled: video.progressBar.querySelector(".progress-bar .filled"),
//   volumeSlider: document.querySelector(".volume-slider"),
//   toggleMuteBtn: document.querySelector(".mute-button"),
//   toggleMuteBtnIcon: video.toggleMuteBtn.querySelector(".icon"),
//   seekerBtns: document.querySelectorAll(".seeker-button"),
//   playBtn: document.querySelector(".play-button"),
//   playBtnIcon: video.playBtn.querySelector(".icon"),
//   toggleFullscreenBtn: document.querySelector(".fullscreen-button"),
//   toggleSettingsButton: document.querySelector(".settings-button"),
//   settingsPopup: document.querySelector(".settings-popup"),
//   playbackRateRadios: document.querySelectorAll(".playback-rate"),
// };

// Event Listeners
// video.video.addEventListener("play", playVideo);
// video.video.addEventListener("pause", pauseVideo);
// video.video.addEventListener("click", togglePlay);
// video.video.addEventListener("timeupdate", updateTime);
// video.video.addEventListener("canplay", updateDuration);

// let mousedown = false;
// video.progressBar.addEventListener("mousedown", () => (mousedown = true));
// window.addEventListener("mouseup", () => (mousedown = false));
// video.progressBar.addEventListener("mousemove", (e) => {
//   if (mousedown) updateCurrentTime(e);
// });
// video.progressBar.addEventListener("click", updateCurrentTime);

// video.volumeSlider.addEventListener("input", () => {
//   changeVolume(video.volumeSlider.value);
// });

// video.toggleMuteBtn.addEventListener("click", toggleMuteVideo);

// video.seekerBtns.forEach((seekerBtn) =>
//   seekerBtn.addEventListener("click", () => {
//     seekVideo(seekerBtn.dataset.seek);
//   })
// );

// video.playBtn.addEventListener("click", togglePlay);

// video.toggleFullscreenBtn.addEventListener("click", toggleFullscreen);

// video.toggleSettingsButton.addEventListener("click", toggleSettingsPopup);
// video.playbackRateRadios.forEach((radio) => {
//   radio.addEventListener("change", changeVideoPlaybackRate);
// });

// window.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case " ":
//       togglePlay();
//       break;

//     case "f":
//     case "F":
//       toggleFullscreen();
//       break;

//     case "m":
//     case "M":
//       toggleMuteVideo();
//       break;

//     case "h":
//     case "H":
//       video.video.classList.toggle("hidden-cursor");
//       break;

//     case "ArrowUp":
//       changeVolume(video.video.volume + 0.02);
//       video.volumeSlider.value = video.video.volume;
//       break;

//     case "ArrowDown":
//       changeVolume(video.video.volume - 0.02);
//       video.volumeSlider.value = video.video.volume;
//       break;

//     case "ArrowRight":
//       seekVideo(30);
//       break;

//     case "ArrowLeft":
//       seekVideo(-10);
//       break;
//   }
// });

// Handlers
// function togglePlay() {
//   if (video.video.paused) {
//     video.video.play();
//   } else {
//     video.video.pause();
//   }
// }

// function playVideo() {
//   video.playBtnIcon.src = "icons/pause.png";
// }

// function pauseVideo() {
//   video.playBtnIcon.src = "icons/play.png";
// }

// function updateTime() {
//   const currentTime = parseTime(video.video.currentTime);
//   video.currentTimeEl.textContent = timeStringify(currentTime);

//   video.progressBarFilled.style.width =
//     (video.video.currentTime / video.video.duration) * 100 + "%";
// }

// function updateDuration() {
//   const duration = parseTime(video.video.duration);
//   video.durationEl.textContent = timeStringify(duration);
// }

function timeStringify(timeObj) {
  let { seconds, minutes, hours } = timeObj;

  if (seconds < 10 && seconds >= 0) seconds = "0" + seconds;
  if (minutes < 10 && minutes >= 0) minutes = "0" + minutes;
  if (hours < 10 && hours >= 0) hours = "0" + hours;

  return `${hours}:${minutes}:${seconds}`;
}

function parseTime(seconds) {
  seconds = Math.floor(seconds);

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return { seconds, minutes, hours };
}

// function seekVideo(seek) {
//   video.video.currentTime += parseInt(seek);
// }

// function updateCurrentTime(e) {
//   const boundRect = video.progressBar.getBoundingClientRect();
//   const currentTime = (e.clientX / boundRect.width) * video.duration;
//   const percent = (e.clientX / boundRect.width) * 100;

//   video.video.currentTime = currentTime;
//   video.progressBarFilled.style.width = `${percent}%`;
// }

// function changeVolume(volume) {
//   video.video.volume = keepInRange(volume, 0, 1);
// }

function keepInRange(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

// function toggleMuteVideo() {
//   video.video.muted = !video.video.muted;
//   if (video.video.muted) {
//     video.toggleMuteBtnIcon.src = "icons/mute.png";
//   } else {
//     video.toggleMuteBtnIcon.src = "icons/high-volume.png";
//   }
// }

// function toggleFullscreen() {
//   if (document.fullscreenElement) {
//     document.exitFullscreen();
//   } else {
//     video.container.requestFullscreen();
//   }
// }

// function toggleSettingsPopup() {
//   video.settingsPopup.classList.toggle("hidden");
//   if (video.settingsPopup.classList.contains("hidden")) {
//     video.toggleSettingsButton.classList.remove("hover");
//   } else {
//     video.toggleSettingsButton.classList.add("hover");
//   }
// }

// function changeVideoPlaybackRate() {
//   video.video.playbackRate = parseFloat(this.value);
// }

function parseTimeString(timeString) {
  const details = timeString
    .split(":")
    .map((e) => e.replace(",", "."))
    .map(parseFloat);

  const hours = details[0];
  const minutes = details[1];
  const seconds = details[2];

  const calculatedSeconds = seconds + minutes * 60 + hours * 3600;

  return calculatedSeconds;
}

function isInRange(number, min, max) {
  return number > min && number < max;
}
