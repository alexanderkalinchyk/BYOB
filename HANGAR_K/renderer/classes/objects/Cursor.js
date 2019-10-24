class Cursor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "cursor");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.enableBody = true;
    this.setCollideWorldBounds(true);
    this.setScale(1);
  }
}

module.exports = Cursor;
