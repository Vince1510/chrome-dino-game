import { Engine, DisplayMode } from "excalibur";
import { Player } from "./actors/Player";

class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 400,
      displayMode: DisplayMode.FitScreen, // Zorgt dat het canvas mooi schaalt
    });
  }

  onInitialize() {
    console.log("De game start nu!");

    const player = new Player();

    //player toevoegen aan game
    this.add(player);
  }
}

const game = new Game();
game.start();
