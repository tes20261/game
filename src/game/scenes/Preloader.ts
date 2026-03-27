import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.add.image(512, 384, "background");

    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    this.load.on("progress", (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath("assets");

    // Main Menu
    this.load.image("logo", "logo.png");

    // Main Game
    this.load.tilemapTiledJSON("map", "map.json");
    this.load.spritesheet("android", "SpaceStation_Android_Sheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("character", "SpaceStation_Character_Sheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("objects", "SpaceStation_Objects.png");
    this.load.spritesheet("projectiles", "SpaceStation_Projectiles_Sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image("tileset", "SpaceStation_Tileset.png");
    this.load.spritesheet("turret", "SpaceStation_Turret_Sheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio("music", "music.mp3");
    this.load.audio("laser", "laser.mp3");
  }

  create() {
    this.scene.start("MainMenu");
  }
}
