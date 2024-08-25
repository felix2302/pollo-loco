/**
 * Represents the boss's status bar in the game, showing the boss's health visually.
 * Inherits from the StatusBar class and initializes with specific boss health images.
 */
class BossStatusBar extends StatusBar {

  /**
   * Constructs a BossStatusBar instance with predefined images and dimensions.
   * The status bar is positioned near the top center of the screen.
   */
  constructor() {
    super(
      [
        './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
      ],
      550,
      80,
      150,
      40
    );
  }
}
