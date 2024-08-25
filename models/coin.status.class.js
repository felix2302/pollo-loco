/**
 * Status bar that represents the number of coins collected.
 */
class CoinStatusBar extends StatusBar {

  /**
   * Creates an instance of CoinStatusBar.
   * Initializes the status bar with images representing different levels of coin collection,
   * and sets the position, size, and initial percentage.
   */
  constructor() {

    super(
      [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
      ],
      20,
      80,
      150,
      40,
      0
    );
  }
}
