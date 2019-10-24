const Cursor = require("../objects/Cursor.js");

class TestScene extends Phaser.Scene {
  constructor() {
    super({
      key: `test`
    });
  }

  create() {
    //
    this.createZone();
    //
    this.createCircle();
    //
    this.createOverlap();
    //
    this.setupListeners();
  }
  createOverlap() {
    this.physics.add.overlap(this.circle, this.zone);
  }

  setupListeners() {
    this.zone.on("enterzone", () => console.log("enterzone"));
    this.zone.on("leavezone", () => console.log("leavezone"));
    //
    this.input.on("pointermove", this.pointerMoveHandler);
  }

  pointerMoveHandler(e) {
    //console.log(e);
    //console.log(this.circle);
    //this.circle.x = e.x;
    //this.circle.y = e.y;
  }

  createCircle() {
    this.circle = new Cursor(this, 0, 100);
    this.circle.physicsBodyType = Phaser.Physics.ARCADE;
    this.circle.checkWorldBounds = true;
    this.circle.body.setAllowGravity(false);
    this.createOverlap();
  }

  createZone() {
    this.zone = this.add.zone(300, 100).setSize(100, 100);
    this.physics.world.enable(this.zone, 0); // (0) DYNAMIC (1) STATIC
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;
  }

  update() {
    this.circle.x++;
    var touching = this.zone.body.touching;
    var wasTouching = this.zone.body.wasTouching;

    if (touching.none && !wasTouching.none) {
      this.zone.emit("leavezone");
    } else if (!touching.none && wasTouching.none) {
      this.zone.emit("enterzone");
    }

    this.zone.body.debugBodyColor = this.zone.body.touching.none
      ? 0x00ff00
      : 0xff0000;
  }
}
module.exports = TestScene;
