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

    this.load.audio("scary", "./renderer/assets/sounds/scary.m4a");
    this.load.image("cursor", "./renderer/assets/cursor.png");

    this.load.image("raam", "./renderer/assets/raam.png");
    this.load.image("raam1", "./renderer/assets/raam1.png");
    this.load.image("raam2", "./renderer/assets/raam2.png");
    this.load.image("raam3", "./renderer/assets/raam3.png");
    this.load.image("raam4", "./renderer/assets/raam4.png");
    this.load.image("deur", "./renderer/assets/deur.png");

    this.load.video("mansionvid", "./renderer/assets/mansion.webm");

    this.load.video(
      "raam1",
      "./renderer/assets/raam1.mp4",
      "loadeddata",
      false,
      false
    );

    this.load.video(
      "raam2",
      "./renderer/assets/raam2.mp4",
      "loadeddata",
      false,
      false
    );

    this.load.video(
      "raam3",
      "./renderer/assets/raam3.mp4",
      "loadeddata",
      false,
      false
    );

    this.load.video(
      "raam4",
      "./renderer/assets/raam4.mp4",
      "loadeddata",
      false,
      false
    );

    this.load.video(
      "deur",
      "./renderer/assets/deur.mp4",
      "loadeddata",
      false,
      false
    );

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
