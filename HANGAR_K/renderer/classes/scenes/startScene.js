class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });
    this.lightSize = 150;
  }
  create() {
    this.lights.enable().setAmbientColor(0x00);

    //const cat = this.add.image(400, 250, "cat").setScale(2);
    const cat = this.add
      .image(0, 0, "mansion")
      .setOrigin(0)
      .setScale(1);
    cat.setPipeline("Light2D");

    // const box = this.add
    //   .graphics()
    //   .fillStyle(0x222222)
    //   .fillRect(0, 0, 320, 50);

    // const box2 = this.add
    //   .graphics()
    //   .fillStyle(0x444444)
    //   .fillRect(0, 0, 50, 50);

    //  Our spotlight. 100px radius and white in color.
    const light = this.lights
      .addLight(180, 20, this.lightSize)
      .setColor(0xfcfccc)
      .setIntensity(1.4);

    this.input.on("pointermove", function(pointer) {
      light.x = pointer.x;
      //box2.x = pointer.x;
      light.y = pointer.y;
      //box2.y = pointer.y;
    });

    //this.physics.add.overlap(this.box2, this.box, this.hitBox, null, this);
  }

  hitBox() {
    console.log("hey");
  }
}

module.exports = StartScene;
