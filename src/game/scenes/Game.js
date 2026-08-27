import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.tobias = this.physics.add.sprite(300, 225, "tobias", 14);

    this.anims.create({
      key: "tobias-parado-cima",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 28,
        end: 28,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "tobias-parado-baixo",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 14,
        end: 14,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "tobias-parado-esquerda",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 36,
        end: 36,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "tobias-parado-direita",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 52,
        end: 52,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "tobias-cavando-cima",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 28,
        end: 35,
      }),
      frameRate: 10,
      repeat: 3,
    });

    this.anims.create({
      key: "tobias-cavando-baixo",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 44,
        end: 51,
      }),
      frameRate: 10,
      repeat: 3,
    });

    this.anims.create({
      key: "tobias-cavando-esquerda",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 36,
        end: 43,
      }),
      frameRate: 10,
      repeat: 3,
    });

    this.anims.create({
      key: "tobias-cavando-direita",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 52,
        end: 59,
      }),
      frameRate: 10,
      repeat: 3,
    });

    this.anims.create({
      key: "tobias-andando-cima",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 60,
        end: 68,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-andando-baixo",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 78,
        end: 86,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-andando-esquerda",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 69,
        end: 77,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-andando-direita",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 87,
        end: 95,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-correndo-cima",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 236,
        end: 243,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-correndo-baixo",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 252,
        end: 259,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-correndo-esquerda",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 244,
        end: 251,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "tobias-correndo-direita",
      frames: this.anims.generateFrameNumbers("tobias", {
        start: 260,
        end: 267,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.lola = this.physics.add.sprite(500, 225, "lola", 14);

    this.time.delayedCall(2000, () => {
      this.scene.stop();
      this.scene.start("GameOver");
    });
  }
}
