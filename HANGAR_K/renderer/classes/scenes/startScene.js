const osc = require("osc");

const Cursor = require("../objects/Cursor.js");
const Window = require("../objects/Window.js");

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });

    this.radius = 150;
  }

  create() {
    this.lights.enable().setAmbientColor(0x00);

    const mansion = this.add
      .image(0, 0, "mansion")
      .setOrigin(0)
      .setScale(1);

    mansion.setPipeline("Light2D");

    this.createLight();
    this.createWindow1();
    this.createWindowbox();
    this.createCursor();

    this.createCollideWindow();

    this.udpPort = new osc.UDPPort({
      localAddress: "0.0.0.0",
      localPort: 1234
    });

    this.udpPort.on("message", oscMessage => {
      console.log(oscMessage.args);
      // this.light.x = map_range(oscMessage.args[0], 0, 1, 0, 1226);
      // this.light.y = map_range(oscMessage.args[1], 0, 1, 0, 189);

      // this.cursor.x = map_range(oscMessage.args[0], 0, 1, 0, 1226);
      // this.cursor.y = map_range(oscMessage.args[1], 0, 1, 0, 189);

      // console.log(map_range(oscMessage.args[1], 0, 1, 0, 189));
    });

    this.input.on("pointermove", pointer => {
      this.light.x = pointer.x;
      this.light.y = pointer.y;

      this.cursor.x = pointer.x;
      this.cursor.y = pointer.y;
    });

    this.udpPort.open();
  }

  createLight() {
    this.light = this.lights
      .addLight(180, 20, this.radius)
      .setColor(0xfcfccc)
      .setIntensity(3);
  }

  createCursor() {
    this.cursor = new Cursor(this, 0, 0, 1);
    this.cursor.physicsBodyType = Phaser.Physics.ARCADE;
    this.cursor.checkWorldBounds = true;
    this.cursor.body.moves = false;
  }

  createWindow1() {
    this.window1 = this.add.video(450, 130, "raam1").setScale(0.1);
  }

  createWindowbox() {
    this.window = new Window(this, 450, 130);
    this.window.physicsBodyType = Phaser.Physics.ARCADE;
    this.window.checkWorldBounds = true;
    this.window.body.moves = false;
  }

  createCollideWindow() {
    this.physics.add.overlap(this.cursor, this.window, this.hitBox, null, this);
  }

  hitBox() {
    this.window.destroy();
    this.window1.play().setLoop(true);
    this.tweens.add({
      targets: this.cursor,
      scale: { from: 1, to: 2 },
      ease: "linear",
      duration: 200,
      repeat: 0,
      yoyo: false
    });
  }

  update() {}
}

module.exports = StartScene;
