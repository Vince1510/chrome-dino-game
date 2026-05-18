import { Actor, Color, Engine, Vector, Keys } from "excalibur";

export class Player extends Actor {
  public lives: number = 3;

  //kijken wanneer de player op de grond is
  public isOnGround: boolean = true;
  constructor() {
    super({
      pos: new Vector(100, 300),
      width: 40,
      height: 60,
      color: Color.Blue,
    });
  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    //zwaartekracht
    if (!this.isOnGround) {
      this.vel.y += 20;
    }

    //deze code zorgt ervoor dat hij op de grond blijft
    if (this.pos.y >= 300 && !this.isOnGround) {
      this.pos.y = 300;
      this.vel.y = 0;
      this.isOnGround = true;
    }

    const keyboard = engine.input.keyboard;

    if (keyboard.isHeld(Keys.ArrowUp) && this.isOnGround) {
      this.vel.y = -500;
      //zorgt ervoor dat je niet oneindig omhoog kan vliegen
      this.isOnGround = false;
    }

    if (keyboard.isHeld(Keys.ArrowDown) && this.isOnGround) {
      this.scale = new Vector(1, 0.5); // Krimpt naar 50% hoogte op de Y-as
    } else {
      this.scale = new Vector(1, 1); // Weer terug naar 100%
    }
  }
}
