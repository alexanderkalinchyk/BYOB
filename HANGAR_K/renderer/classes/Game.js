const PreloadScene = require("./scenes/preloadScene.js");
const StartScene = require("./scenes/startScene.js");
const TestScene = require("./scenes/TestScene.js");

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 3840,
      height: 1080,
      title: `Hazard K`,
      scene: [PreloadScene, StartScene],
      url: `http://www.devine.be`,
      version: `1.0`,
      physics: {
        default: `arcade`,
        arcade: {
          debug: false
        }
      }
    });
  }
}

module.exports = Game;
