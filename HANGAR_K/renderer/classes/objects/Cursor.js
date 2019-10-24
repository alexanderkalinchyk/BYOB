class Cursor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, scale) {
    super(scene, x, y, "cursor");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.enableBody = true;
    this.setCollideWorldBounds(true);
    this.setScale(scale);
    this.alpha = 0.05;
  }
}

module.exports = Cursor;
