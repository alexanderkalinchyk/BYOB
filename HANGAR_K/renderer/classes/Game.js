const PreloadScene = require("./scenes/preloadScene.js");
const StartScene = require("./scenes/startScene.js");
const TestScene = require("./scenes/TestScene.js");

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 1226,
      height: 189,
      title: `Hazard K`,
      scene: [PreloadScene, StartScene],
      //scene: [TestScene],
      url: `http://www.devine.be`,
      version: `1.0`,
      physics: {
        default: `arcade`,
        arcade: {
          gravity: { y: 700 },
          debug: true
        }
      }
    });
  }
}

module.exports = Game;
