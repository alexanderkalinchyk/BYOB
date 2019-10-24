class Window extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "window");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.enableBody = true;
    this.setCollideWorldBounds(true);
    this.setScale(0.1);
  }
}

module.exports = Window;
