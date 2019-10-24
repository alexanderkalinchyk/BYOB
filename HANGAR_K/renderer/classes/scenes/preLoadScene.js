class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }

  preload() {
    this.preloader = this.add.graphics();
    this.load.on(`progress`, this.onProgress, this);
    this.load.on(`fileprogress`, this.fileProgress, this);
    this.load.on(`complete`, this.onComplete, this);

    this.load.image("mansion", [
      "./renderer/assets/mansion.png",
      "./renderer/assets/normalmap.png"
    ]);

    this.load.image("cursor", "./renderer/assets/cursor.png");

    this.load.image("window", "./renderer/assets/window.png");

    this.load.video(
      "raam1",
      "./renderer/assets/raam1.mp4",
      "loadeddata",
      false,
      false
    );

    //this.load.image("atari", "assets/sprites/atari400.png");

    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(240, 270, 320, 50);

    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.loadingText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 100,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    this.loadingText.setOrigin(0.5, 0.5);

    this.percentText = this.make.text({
      x: this.width / 2,
      y: this.height / 2 - 53,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    this.percentText.setOrigin(0.5, 0.5);

    this.assetText = this.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff"
      }
    });
    this.assetText.setOrigin(0.5, 0.5);
  }

  onProgress(value) {
    this.percentText.setText(`${parseInt(value * 100)}%`);
    this.preloader.clear();
    this.preloader.fillStyle(0xfffff, 1);
    this.preloader.fillRect(250, 280, 300 * value, 30);
  }

  fileProgress(file) {
    this.assetText.setText(`Loading asset: ${file.key}`);
  }

  onComplete() {
    this.preloader.destroy();
    this.loadingText.destroy();
    this.percentText.destroy();
    this.assetText.destroy();
    this.scene.start(`start`);
  }

  create() {}
  update() {}
}

module.exports = PreloadScene;
