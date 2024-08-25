/**
 * Represents a status bar for bottles with varying levels.
 */
class BottleStatusBar extends StatusBar {

  /**
   * Initializes the BottleStatusBar instance with images and dimensions.
   */
  constructor() {
    super(
      [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
      ],
      20,
      40,
      150,
      40,
      0
    );
  }
}
