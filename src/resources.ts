// CLASS: ImageSource is de Excalibur blauwdruk om een losse afbeelding in te laden.
import { ImageSource, Loader, Resource } from "excalibur";

// OBJECT: Ons centrale opslagpunt voor alle assets.
// PROPERTY: We splitsen Pacman nu op in 3 aparte frames (dicht, half-open, open).
const Resources = {
  pacmanClosed: new ImageSource("/images/pacman-art/pacman-right/1.png"),
  pacmanHalf: new ImageSource("/images/pacman-art/pacman-right/2.png"),
  pacmanOpen: new ImageSource("/images/pacman-art/pacman-right/3.png"),

  redGhost: new ImageSource("/images/pacman-art/ghosts/blinky.png"),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
