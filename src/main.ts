import { Engine, DisplayMode, Timer } from "excalibur";
import { Player } from "./actors/Player";
import { ResourceLoader } from "./resources";
import { Ghost } from "./actors/Ghost";
import { Ground } from "./actors/Ground";

// EXTENDS: Uitbreiden van een class. Game krijgt nu alle krachten van de Excalibur Engine.
// CLASS: Laat zien hoe iets eruit komt te zien (de blauwdruk voor onze game motor).
class Game extends Engine {
  constructor() {
    // SUPER: Verwijzing naar de parent class (Engine) om Excalibur op de achtergrond op te starten.
    super({
      width: 800,
      height: 400,
      displayMode: DisplayMode.FitScreen,
    });
  }

  // onInitialize: Excalibur event dat eenmalig afvuurt wanneer deze specifieke Engine opstart.
  onInitialize() {
    console.log("De game start nu!");

    const ground1 = new Ground(400); // Grond-deel 1: Staat direct op het scherm
    const ground2 = new Ground(1200); // Grond-deel 2: Staat rechts buiten het scherm te wachten

    this.add(ground1);
    this.add(ground2);

    const player = new Player();
    this.add(player);

    // --- RANDOM SPOOKJES SPAWNER (TIMER) ---
    // NEW & OBJECT: We maken een Timer aan die elke 2000ms (2 seconden) een functie tikt.
    const ghostSpawner = new Timer({
      fcn: () => this.spawnRandomGhost(), // METHOD: De functie die we hieronder hebben gebouwd
      interval: 1500, // Tijd tussen de spookjes in milliseconden
      repeats: true, // Moet oneindig blijven doorgaan
    });

    // METHOD: Voeg de timer toe aan de game engine en start hem direct op
    this.add(ghostSpawner);
    ghostSpawner.start();
  }

  // METHOD: Onze eigen functie om een willekeurig spookje op het scherm te toveren
  private spawnRandomGhost() {
    // RANDOM LOGICA: 50% kans op een grond-spook, 50% kans op een lucht-spook
    const chosenType = Math.random() > 0.5 ? "ground" : "air";

    // NEW & INSTANCE: Maak het spookje aan in het geheugen
    const newGhost = new Ghost(chosenType);

    // METHOD: Voeg hem toe aan de lopende game
    this.add(newGhost);

    console.log(`👻 Spookje gespawned van type: ${chosenType}`);
  }
}

// NEW: We maken het hoofdgame-object aan en starten de motor.
const game = new Game();
game.start(ResourceLoader);
