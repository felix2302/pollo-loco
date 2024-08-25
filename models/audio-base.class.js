/**
 * Class representing a collection of audio elements with common controls.
 */
class AudioBase {
  /**
   * Initialize the AudioBase class with predefined audio files.
   */
  constructor() {
    this.throw_audio = this.createAudio('./audio/swing-whoosh-in-room-7-234261.mp3');
    this.splash_audio = this.createAudio('./audio/bottle-shattering-105398.mp3');
    this.jumping_audio = this.createAudio('./audio/cartoon-jump-6462.mp3');
    this.chicken_dead_audio = this.createAudio('./audio/chicken-single-alarm-call-6056.mp3');
    this.bossChicken_dead_audio = this.createAudio('./audio/077354_chicken-scream-48055.mp3');
    this.coin_audio = this.createAudio('./audio/coin-recieved-230517.mp3');
    this.game_win_audio = this.createAudio('./audio/success-1-6297.mp3');
    this.walking_audio = this.createAudio('./audio/walking-soundscape-200112.mp3');
    this.hurt_audio = this.createAudio('./audio/young-man-being-hurt-95628.mp3');
    this.game_lost_audio = this.createAudio('./audio/sad-trumpet-46384.mp3');
    this.bossfight_audio = this.createAudio('./audio/horror-chase-music-loop-67634.mp3');
    this.bossChicke_walk_audio = this.createAudio('./audio/chicken-single-alarm-call-6056.mp3');
    this.background = this.createAudio('./audio/guitar-spanish-chords-fingerpicking-166298.mp3');
    this.snoring = this.createAudio('./audio/snoring-8486.mp3');
    this.click = this.createAudio('./audio/mouse-click-sound-233951.mp3');

    this.initializeAudio();
  }

  /**
   * Creates a new audio element with a specified source and sets its volume.
   *
   * @param {string} src - The source URL of the audio file.
   * @returns {HTMLAudioElement} The created audio element.
   */
  createAudio(src) {
    const audio = new Audio(src);
    audio.volume = 0.2; 
    return audio;
  }

  /**
   * Initializes the audio elements, setting their mute status to unmuted by default.
   */
  initializeAudio() {
    this.setMuteStatus(false);
  }

  /**
   * Mutes or unmutes all audio elements.
   *
   * @param {boolean} isMuted - If true, mutes all audio elements; otherwise, unmutes them.
   */
  setMuteStatus(isMuted) {
    Object.values(this).forEach((audioElement) => {
      if (audioElement instanceof Audio) {
        audioElement.muted = isMuted;
      }
    });
  }

  /**
   * Mutes all audio elements.
   */
  muteAll() {
    this.setMuteStatus(true);
  }

  /**
   * Unmutes all audio elements.
   */
  unmuteAll() {
    this.setMuteStatus(false);
  }
}
