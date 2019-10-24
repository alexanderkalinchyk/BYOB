//const osc = require("osc");

const Cursor = require("../objects/Cursor.js");
const Window = require("../objects/Window.js");

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });
    this.lightSize = 150;
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

    // const udpPort = new osc.UDPPort({
    //   localAddress: "0.0.0.0",
    //   localPort: 1234
    // });

    // udpPort.on("message", function(oscMessage) {
    //   //console.log(oscMessage.args[2]);

    //   light.x = (oscMessage.args[0] / 1) * 1226;
    //   light.y = 189 / 2;
    //   //console.log(map_range(oscMessage.args[0], 0, 1, 0, 189));
    // });

    this.input.on("pointermove", pointer => {
      this.light.x = pointer.x;
      this.light.y = pointer.y;

      this.cursor.x = pointer.x;
      this.cursor.y = pointer.y;
    });

    // udpPort.open();
  }

  createLight() {
    this.light = this.lights
      .addLight(180, 20, this.lightSize)
      .setColor(0xfcfccc)
      .setIntensity(2);
  }

  createCursor() {
    this.cursor = new Cursor(this, 0, 0);
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
  }

  update() {}
}

module.exports = StartScene;
