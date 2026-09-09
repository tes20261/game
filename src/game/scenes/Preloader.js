import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.add.image(400, 225, "background");

    this.add.rectangle(400, 400, 468, 32).setStrokeStyle(4, 0xffffff);
    const bar = this.add.rectangle(400 - 230, 400, 4, 28, 0xffffff);

    this.load.on("progress", (progress) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath("assets");

    this.load.tilemapTiledJSON("map", "map/map.json");
    this.load.image("grass", "map/grass.png");
    this.load.image("shadows", "map/shadows.png");
    this.load.image("items", "map/items.png");

    this.load.spritesheet("tobias", "tobias.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("lola", "lola.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.audio("owl", "audio/owl.mp3");
    this.load.audio("cemetery", "audio/cemetery.mp3");
  }

  create() {
    this.scene.stop();
    this.scene.start("MainMenu");
  }
}
