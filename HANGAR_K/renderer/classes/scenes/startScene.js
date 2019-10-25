const osc = require("osc");

const Cursor = require("../objects/Cursor.js");
const Window = require("../objects/Window.js");

const map = (value, low1, high1, low2, high2) => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });

    this.radius = 180;
    this.visible = true;
  }

  create() {
    const music = this.sound.add("scary");
    music.play();
    music.setLoop(true);
    this.lights.enable().setAmbientColor(0x404040);

    this.mansion = this.add
      .image(0, 0, "mansion")
      .setOrigin(0)
      .setScale(1);

    this.mansion.setPipeline("Light2D");

    this.createLight();
    this.createBackgroundLights();
    this.createWindows();
    this.createWindowBox1();
    this.createWindowBox2();
    this.createWindowBox4();
    this.createWindowBox5();
    this.createWindowDeur();
    this.createCursor();

    this.udpPort = new osc.UDPPort({
      localAddress: "0.0.0.0",
      localPort: 1234
    });

    //wii remote control
    this.udpPort.on("message", oscMessage => {
      console.log(oscMessage.args);
      // console.log(oscMessage.args[0], oscMessage.args[1]);
      // let x = map(oscMessage.args[0], 0.2, 0.8, 0, this.game.renderer.width);
      // if (x < 0) x = 0;
      // if (x > this.game.renderer.width) x = this.game.renderer.width;
      // let y = map(oscMessage.args[1], 0.2, 0.8, this.game.renderer.height, 0);
      // if (y < 0) y = 0;
      // if (y > this.game.renderer.height) y = this.game.renderer.height;

      // console.log(x, y);
      // this.light.x = x;
      // this.light.y = y;
      // this.cursor.x = x;
      // this.cursor.y = y;
    });

    //mouse control
    this.input.on("pointermove", pointer => {
      this.light.x = pointer.x;
      this.light.y = pointer.y;
      this.cursor.x = pointer.x;
      this.cursor.y = pointer.y;
    });

    this.udpPort.open();
  }

  createLight() {
    this.light = this.lights.addLight(180, 20, 180, 0xfcfccc, 3);
  }

  createBackgroundLights() {
    this.lights.addLight(1375, 350, 130, 0xfcfccc, 2.5);
    this.lights.addLight(2715, 350, 130, 0xfcfccc, 2.5);
    this.lights.addLight(3390, 350, 130, 0xfcfccc, 2.5);
    this.tweens.add({
      targets: [this.lights.addLight(314, 600, 140, 0xfcfccc, 1)],
      intensity: {
        value: 2.0,
        duration: 1500,
        ease: "linear",
        repeat: -1,
        yoyo: true
      }
    });

    this.tweens.add({
      targets: [this.lights.addLight(1660, 600, 140, 0xfcfccc, 1)],
      intensity: {
        value: 2.0,
        duration: 2500,
        ease: "linear",
        repeat: -1,
        yoyo: true
      }
    });

    this.tweens.add({
      targets: [this.lights.addLight(2990, 600, 140, 0xfcfccc, 1)],
      intensity: {
        value: 2.0,
        duration: 1000,
        ease: "linear",
        repeat: -1,
        yoyo: true
      }
    });

    this.tweens.add({
      targets: [this.lights.addLight(810, 410, 120, 0xfcfccc, 2)],
      intensity: {
        value: 4.0,
        duration: 1000,
        ease: "linear",
        repeat: -1,
        yoyo: true
      }
    });
  }

  createCursor() {
    this.cursor = new Cursor(this, 0, 0, 3);
    this.cursor.physicsBodyType = Phaser.Physics.ARCADE;
    this.cursor.checkWorldBounds = true;
    this.cursor.body.moves = false;
    this.cursor.setScale(2);
  }

  createWindows() {
    this.window1 = this.add.video(600, 675, "raam1").setScale(0.225);
    this.window2 = this.add.video(1300, 675, "raam2").setScale(0.225);
    this.window3 = this.add.video(2000, 675, "deur").setScale(0.225);
    this.window4 = this.add.video(2700, 675, "raam3").setScale(0.225);
    this.window5 = this.add.video(3300, 675, "raam4").setScale(0.225);
  }

  createWindowBox1() {
    this.windowBox1 = new Window(this, 600, 675, "raam1");
    this.windowBox1.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox1.checkWorldBounds = true;
    this.windowBox1.body.moves = false;
  }
  createWindowBox2() {
    this.windowBox2 = new Window(this, 1300, 675, "raam2");
    this.windowBox2.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox2.checkWorldBounds = true;
    this.windowBox2.body.moves = false;
  }

  createWindowDeur() {
    this.windowBox3 = new Window(this, 2000, 675, "deur");
    this.windowBox3.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox3.checkWorldBounds = true;
    this.windowBox3.body.moves = false;
    this.windowBox3.setScale(0.015);
  }

  createWindowBox4() {
    this.windowBox4 = new Window(this, 2700, 675, "raam3");
    this.windowBox4.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox4.checkWorldBounds = true;
    this.windowBox4.body.moves = false;
  }
  createWindowBox5() {
    this.windowBox5 = new Window(this, 3300, 675, "raam4");
    this.windowBox5.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox5.checkWorldBounds = true;
    this.windowBox5.body.moves = false;
  }

  checkOverlap(window, windowBox, Bx, Ax, By, Dy) {
    if (
      this.cursor.x < Bx &&
      this.cursor.x > Ax &&
      this.cursor.y < By &&
      this.cursor.y > Dy
    ) {
      window.play();
      this.tweens.add({
        targets: windowBox,
        alpha: 0,
        ease: "linear",
        duration: 100,
        repeat: 0,
        yoyo: false
      });
    } else {
      window.stop();
      this.tweens.add({
        targets: windowBox,
        alpha: 1,
        ease: "linear",
        duration: 100,
        repeat: 0,
        yoyo: false
      });
    }
  }

  update() {
    this.checkOverlap(this.window1, this.windowBox1, 691, 509, 770.5, 579.5);
    this.checkOverlap(this.window2, this.windowBox2, 1391, 1209, 770.5, 579.5);
    this.checkOverlap(this.window3, this.windowBox3, 2091, 1909, 770.5, 579.5);
    this.checkOverlap(this.window4, this.windowBox4, 2791, 2609, 770.5, 579.5);
    this.checkOverlap(this.window5, this.windowBox5, 3391, 3209, 770.5, 579.5);
  }
}

module.exports = StartScene;
