// EXTENDS: De Player class breidt de Excalibur 'Actor' uit om te kunnen bewegen, botsen en sprites te tonen.
// CLASS: De blauwdruk die bepaalt hoe ELKE speler in de game eruitziet en wat hij kan.
import { Actor, Color, Engine, Vector, Keys, Animation } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
  // PROPERTY: Eigenschap van deze klasse (eigenlijk een variabele die het object onthoudt).
  // PUBLIC: Maakt de property vanaf overal in het project zichtbaar/aanpasbaar.
  public lives: number = 3;
  public isOnGround: boolean = true; // Onthoudt of de speler op de grond staat of zweeft.

  // CONSTRUCTOR: Speciale functie die direct wordt aangeroepen bij het aanmaken van het object (met 'new').
  constructor() {
    // SUPER: Stuurt de basisgegevens (positie, grootte, kleur) door naar de constructor van de Actor class.
    // VECTOR: Positie (pos) gebruikt een X en Y coordinaat.
    super({
      pos: new Vector(100, 309),
      width: 20,
      height: 18,
      color: Color.Blue,
      anchor: new Vector(0.5, 1),
    });
  }

  onInitialize(engine: Engine): void {
    console.log("pacman met animaties is klaar!");

    const runAnimation = new Animation({
      frames: [
        { graphic: Resources.pacmanClosed.toSprite() },
        { graphic: Resources.pacmanHalf.toSprite() },
        { graphic: Resources.pacmanOpen.toSprite() },
      ],
      frameDuration: 100, // 100ms per frame
    });

    this.graphics.add("run", runAnimation);
    this.graphics.use("run");
  }

  // METHOD: Een functie die specifiek voor dit ene object is.
  // GAMELOOP: Deze update-method wordt door de engine automatisch 60 keer per seconde uitgevoerd.
  update(engine: Engine, delta: number) {
    // SUPER: Zorgt dat de ingebouwde update-logica van de basis-Actor (zoals het verwerken van snelheid) ook draait.
    super.update(engine, delta);

    // --- PHYSICS & ZWAARTEKRACHT ---
    // VELOCITY: Snelheid aanpassen op de Y-as (positief is naar BENEDEN).
    if (!this.isOnGround) {
      this.vel.y += 20; // Trek de speler elke frame een stukje harder naar beneden
    }

    // --- LANDING CHECK (GRENZEN CONTROLEREN) ---
    // ANCHOR: Excalibur meet vanaf het MIDDEN van het object. Positie Y=309 is exact de grondlijn.
    if (this.pos.y >= 309 && !this.isOnGround) {
      this.pos.y = 309; // Corrigeer de positie exact op de grond
      this.vel.y = 0; // Stop de valsnelheid
      this.isOnGround = true; // Zet de property weer op true: we staan stil!
    }

    // --- INPUTS VERWERKEN ---
    const keyboard = engine.input.keyboard;

    // EVENT CHECK: Is de ArrowUp toets op dit moment ingedrukt?
    if (keyboard.isHeld(Keys.ArrowUp) && this.isOnGround) {
      this.vel.y = -500; // Geef negatieve snelheid op de Y-as (schiet omhoog!)
      this.isOnGround = false; // De property verandert: we zijn nu in de lucht!
    }

    // EVENT CHECK: Bukken met ArrowDown
    if (keyboard.isHeld(Keys.ArrowDown) && this.isOnGround) {
      // VECTOR & ANCHOR: We schalen de Y-as naar 0.5 (krimpen naar het midden van het object toe).
      this.scale = new Vector(1, 0.5);
    } else {
      this.scale = new Vector(1, 1); // Reset de schaal naar 100% als de toets losgelaten is
    }
  }
}
