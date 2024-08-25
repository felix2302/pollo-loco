let canvas;
let world;
let keyboard = new Keyboard();
let audio = new AudioBase();
let isMuted = false;

function load() {
  checkDevice();
  loadMuteStatus();
  setPlayAgainReload();
}

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, audio);
}

function startGame() {
  document.getElementById('play-screen').classList.remove('d-none');
  document.getElementById('start-screen').classList.add('d-none');
  document.getElementById('canvas').style.display = 'block';
  document.getElementById('loading-screen').classList.add('d-none');
  init();
}

function playAgain() {
  localStorage.setItem('playAgain', 'true');
  window.location.reload();
}

function setPlayAgainReload() {
  if (localStorage.getItem('playAgain') === 'true') {
    localStorage.removeItem('playAgain');
    startGame();
  }
}

function backToMenu() {
  world.gameOver = false;
  world.gameWin = false;
  window.location.reload(true);
}

function muteGame() {
  isMuted = !isMuted;
  checkMuteStatus();
  localStorage.setItem('isMuted', isMuted);
}

function loadMuteStatus() {
  let savedMutedState = localStorage.getItem('isMuted');
  if (savedMutedState !== null) {
    isMuted = JSON.parse(savedMutedState);
    checkMuteStatus();
  }
}

function checkMuteStatus() {
  let image = document.getElementById('mute');
  if (isMuted) {
    audio.muteAll();
    image.src = './img/10_icons/no_sound_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png';
  } else {
    audio.unmuteAll();
    image.src = './img/10_icons/volume_up_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png';
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    openFullScreen();
  } else {
    closeFullScreen();
  }
}

function openFullScreen() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
  document.getElementById('full-screen').src = './img/10_icons/fullscreen_exit_24dp_434343_FILL0_wght400_GRAD0_opsz24.png';
}

function closeFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  document.getElementById('full-screen').src = './img/10_icons/fullscreen_24dp_434343_FILL0_wght400_GRAD0_opsz24.png';
}

function isMobileOrTablet() {
  return /Mobil|Android|iPad|iPhone/i.test(navigator.userAgent);
}

function checkDevice() {
  let rotateDevice = document.getElementById('rotate-device');
  let walkButtons = document.getElementById('walk-buttons');
  let instructions = document.getElementById('btn-description-container');
  let jumpThrowButtons = document.getElementById('jump-throw-buttons');

  if (!isMobileOrTablet()) {
    hideButtons(rotateDevice, walkButtons, jumpThrowButtons, instructions);
    return;
  }

  if (window.innerWidth < window.innerHeight) {
    rotateDevice.classList.remove('d-none');
  } else {
    rotateDevice.classList.add('d-none');
    instructions.classList.add('d-none');
  }

  walkButtons.classList.remove('d-none');
  jumpThrowButtons.classList.remove('d-none');
}

function hideButtons(rotateDevice, walkButtons, jumpThrowButtons, instructions) {
  rotateDevice.classList.add('d-none');
  walkButtons.classList.add('d-none');
  jumpThrowButtons.classList.add('d-none');
}

window.addEventListener('resize', checkDevice);
window.addEventListener('orientationchange', checkDevice);
window.addEventListener('load', checkDevice);

window.addEventListener('keydown', (e) => {
  if (keyboard) {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      e.preventDefault();
    }
    if (e.keyCode === 37) {
      keyboard.LEFT = true;
    } else if (e.keyCode === 39) {
      keyboard.RIGHT = true;
    } else if (e.keyCode === 38) {
      keyboard.UP = true;
    } else if (e.keyCode === 40) {
      keyboard.DOWN = true;
    } else if (e.keyCode === 32) {
      keyboard.SPACE = true;
    } else if (e.keyCode === 68) {
      keyboard.D = true;
    }
  }
});

window.addEventListener('keyup', (e) => {
  if (keyboard) {
    if (e.keyCode === 37) {
      keyboard.LEFT = false;
    } else if (e.keyCode === 39) {
      keyboard.RIGHT = false;
    } else if (e.keyCode === 38) {
      keyboard.UP = false;
    } else if (e.keyCode === 40) {
      keyboard.DOWN = false;
    } else if (e.keyCode === 32) {
      keyboard.SPACE = false;
    } else if (e.keyCode === 68) {
      keyboard.D = false;
    }
  }
});

function addButtonEventListener(buttonId, key) {
  let button = document.getElementById(buttonId);

  let setKeyTrue = (event) => {
    if (event.cancelable) {
      event.preventDefault();
    }
    keyboard[key] = true;
  };

  let setKeyFalse = (event) => {
    if (event.cancelable) {
      event.preventDefault();
    }
    keyboard[key] = false;
  };
  button.addEventListener('mousedown', setKeyTrue);
  button.addEventListener('mouseup', setKeyFalse);
  button.addEventListener('touchstart', setKeyTrue);
  button.addEventListener('touchend', setKeyFalse);
}

addButtonEventListener('button-left', 'LEFT');
addButtonEventListener('button-throw', 'D');
addButtonEventListener('button-jump', 'SPACE');
addButtonEventListener('button-right', 'RIGHT');
