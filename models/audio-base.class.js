class AudioBase {
  constructor() {
    this.throw_audio = new Audio('./audio/swing-whoosh-in-room-7-234261.mp3');
    this.splash_audio = new Audio('./audio/bottle-shattering-105398.mp3');
    this.jumping_audio = new Audio('./audio/cartoon-jump-6462.mp3');
    this.chicken_dead_audio = new Audio('./audio/chicken-single-alarm-call-6056.mp3');
    this.bossChicken_dead_audio = new Audio('./audio/077354_chicken-scream-48055.mp3');
    this.coin_audio = new Audio('./audio/coin-recieved-230517.mp3');
    this.game_win_audio = new Audio('./audio/success-1-6297.mp3');
    this.walking_audio = new Audio('./audio/walking-soundscape-200112.mp3');
    this.hurt_audio = new Audio('./audio/young-man-being-hurt-95628.mp3');
    this.game_lost_audio = new Audio('./audio/sad-trumpet-46384.mp3');
    this.bossfight_audio = new Audio('./audio/horror-chase-music-loop-67634.mp3');
    this.bossChicke_walk_audio = new Audio('./audio/chicken-single-alarm-call-6056.mp3');
    this.background = new Audio('./audio/guitar-spanish-chords-fingerpicking-166298.mp3');
    this.snoring = new Audio('./audio/snoring-8486.mp3');
    this.click = new Audio('./audio/mouse-click-sound-233951.mp3');

    this.initializeAudio();
  }

  createAudio(src, volume = 1.0) {
    const audio = new Audio(src);
    audio.volume = volume;
    return audio;
  }

  initializeAudio() {
    this.setMuteStatus(false);
  }

  setMuteStatus(isMuted) {
    Object.values(this).forEach((audioElement) => {
      if (audioElement instanceof Audio) {
        audioElement.muted = isMuted;
      }
    });
  }

  muteAll() {
    this.setMuteStatus(true);
  }

  unmuteAll() {
    this.setMuteStatus(false);
  }
}
