import { Scene } from "phaser";

export class GameOver extends Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.lights.enable().setAmbientColor(0x333333);
    this.add.image(400, 225, "background").setLighting(true);

    this.add
      .text(400, 400, "Fim do jogo", {
        fontFamily: "Rubik Glitch",
        fontSize: 36,
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.stop();
      this.scene.start("MainMenu");
    });
  }
}
