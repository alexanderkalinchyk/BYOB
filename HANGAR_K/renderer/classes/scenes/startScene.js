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

    //mansion.setPipeline("Light2D");

    this.createLight();
    this.createWindow1();
    this.createWindow2();
    this.createWindowbox1();
    this.createWindowbox2();
    this.createCursor();

    this.createCollideWindow1();
    this.createCollideWindow2();

    this.udpPort = new osc.UDPPort({
      localAddress: "0.0.0.0",
      localPort: 1234
    });

    this.udpPort.on("message", oscMessage => {
      console.log(oscMessage.args);
      this.light.x = this.map_range(1 - oscMessage.args[0], 0, 1, 0, 1226);
      this.light.y = this.map_range(1 - oscMessage.args[1], 0, 1, 0, 189);
      this.cursor.x = this.map_range(1 - oscMessage.args[0], 0, 1, 0, 1226);
      this.cursor.y = this.map_range(1 - oscMessage.args[1], 0, 1, 0, 189);
      // console.log(map_range(oscMessage.args[1], 0, 1, 0, 189));
    });

    this.input.on("pointermove", pointer => {
      // this.light.x = pointer.x;
      // this.light.y = pointer.y;
      // this.cursor.x = pointer.x;
      // this.cursor.y = pointer.y;
    });

    this.udpPort.open();
  }

  map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  createLight() {
    this.light = this.lights
      .addLight(180, 20, this.radius)
      .setColor(0xfcfccc)
      .setIntensity(3);
  }

  createCursor() {
    this.cursor = new Cursor(this, 0, 0, 3);
    this.cursor.physicsBodyType = Phaser.Physics.ARCADE;
    this.cursor.checkWorldBounds = true;
    this.cursor.body.moves = false;
  }

  createWindow1() {
    this.window1 = this.add.video(600, 675, "raam1").setScale(0.225);
  }

  createWindow2() {
    this.window2 = this.add.video(1300, 675, "raam2").setScale(0.225);
  }

  createWindow3() {
    this.window3 = this.add.video(600, 675, "deur").setScale(0.225);
  }

  createWindow4() {
    this.window4 = this.add.video(600, 675, "raam3").setScale(0.225);
  }

  createWindow5() {
    this.window5 = this.add.video(600, 675, "raam4").setScale(0.225);
  }

  createWindowbox1() {
    this.windowBox1 = new Window(this, 600, 675, "raam1");
    this.windowBox1.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox1.checkWorldBounds = true;
    this.windowBox1.body.moves = false;
  }

  createWindowbox2() {
    this.windowBox2 = new Window(this, 1300, 675, "raam2");
    this.windowBox2.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox2.checkWorldBounds = true;
    this.windowBox2.body.moves = false;
  }

  createWindowbox3() {
    this.windowBox3 = new Window(this, 600, 675, "deur");
    this.windowBox3.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox3.checkWorldBounds = true;
    this.windowBox3.body.moves = false;
  }

  createWindowbox4() {
    this.windowBox4 = new Window(this, 600, 675, "raam3");
    this.windowBox4.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox4.checkWorldBounds = true;
    this.windowBox4.body.moves = false;
  }

  createWindowbox5() {
    this.windowBox5 = new Window(this, 600, 675, "raam4");
    this.windowBox5.physicsBodyType = Phaser.Physics.ARCADE;
    this.windowBox5.checkWorldBounds = true;
    this.windowBox5.body.moves = false;
  }

  createCollideWindow1() {
    this.physics.add.overlap(
      this.cursor,
      this.windowBox1,
      this.hitBox1,
      null,
      this
    );
  }

  createCollideWindow2() {
    this.physics.add.overlap(
      this.cursor,
      this.windowBox2,
      this.hitBox2,
      null,
      this
    );
  }

  hitBox1() {
    this.windowBox1.destroy();
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

  hitBox2() {
    this.windowBox2.destroy();
    this.window2.play().setLoop(true);
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
