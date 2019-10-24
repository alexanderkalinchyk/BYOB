class Window extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.enableBody = true;
    this.setCollideWorldBounds(true);
    this.setScale(0.03);
  }
}

module.exports = Window;
