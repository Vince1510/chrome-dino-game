// EXTENDS: Ground breidt Actor uit, dus krijgt alle eigenschappen van een bewegend game-object.
// CLASS: De blauwdruk voor de grond die nu minder hoog is vanaf de bovenkant.
import { Actor, Color, Vector, Engine, Canvas } from "excalibur";

export class Ground extends Actor {
  constructor(startX: number) {
    super({
      pos: new Vector(startX, 400), // Onderkant blijft op de bodem van het scherm (400)
      width: 801,

      // HEIGHT: Vul hier een kleiner getal in. Omdat het anker onderaan zit,
      // krimpt de balk vanaf de bovenkant naar beneden toe!
      height: 91, // Was 120, dus de balk is nu de helft minder hoog vanaf de bovenkant.

      anchor: new Vector(0.5, 1), // Houdt de onderkant vergrendeld op Y=400
    });
  }

  onInitialize() {
    this.vel.x = -300;

    // --- NEON GRADIENT MET TRANSPARANTE FADE ---
    const neonCanvas = new Canvas({
      width: 801,
      height: this.height, // Gebruikt automatisch de nieuwe hoogte (60)
      draw: (ctx) => {
        const gradient = ctx.createLinearGradient(0, 0, 801, 0);

        gradient.addColorStop(0, "rgba(255, 0, 127, 0)");
        gradient.addColorStop(0.1, "rgba(255, 0, 127, 1)");
        gradient.addColorStop(0.5, "rgba(127, 0, 255, 1)");
        gradient.addColorStop(0.9, "rgba(0, 245, 255, 1)");
        gradient.addColorStop(1, "rgba(0, 245, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 801, this.height); // Kleurt netjes tot de nieuwe hoogte van 60
      },
    });

    this.graphics.use(neonCanvas);
  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    if (this.pos.x <= -400) {
      this.pos.x = 1200;
    }
  }
}
