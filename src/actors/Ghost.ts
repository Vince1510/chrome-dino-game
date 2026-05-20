import { Actor, Engine, Vector, Color } from "excalibur";
import { Resources } from "../resources";

export class Ghost extends Actor {
  private ghostType: "ground" | "air";
  constructor(type: "ground" | "air") {
    super({
      pos: new Vector(900, type === "ground" ? 300 : 283),
      width: 20,
      height: 20,
    });
    this.ghostType = type;
  }

  onInitialize(engine: Engine) {
    const ghostSprite = Resources.redGhost.toSprite();
    this.graphics.use(ghostSprite);
    this.vel.x = -300; // Ghosts bewegen naar links met een snelheid van 100 pixels per seconde
  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    // Verwijder de ghost als hij uit beeld is
    if (this.pos.x < -50) {
      this.kill();
      console.log("Ghost verwijderd omdat hij uit beeld is!");
    }
  }
}
