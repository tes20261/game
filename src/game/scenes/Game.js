import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.tobias = this.physics.add.sprite(300, 225, "tobias", 14);

    this.lola = this.physics.add.sprite(500, 225, "lola", 14);

    this.time.delayedCall(2000, () => {
      this.scene.stop();
      this.scene.start("GameOver");
    });
  }
}
