import { Color3, Color4, ParticleSystem, Scene, Texture, Vector3 } from "@babylonjs/core";

export const setupBackground = (scene: Scene) => {
    scene.clearColor = Color4.FromColor3(new Color3(0, 0, 0));
    return scene
  }
  
export const setupStarfield = (scene: Scene) => {
    const starfield = new ParticleSystem('starfield', 5_000, scene);
    // We want to emit the particles on the surface of a sphere 1000 in radius
    starfield.createSphereEmitter(5_000, 0);
  
  // We want to emit all of the particles at once, to immiediately fill the scene
    starfield.manualEmitCount = 5_000;
  
  // We want the stars to live forever
    starfield.minLifeTime = Number.MAX_VALUE;
    starfield.maxLifeTime = Number.MAX_VALUE;
  
  // We want the stars to vary in size
    starfield.minSize = 0.1 * 1_000;
    starfield.maxSize = 0.25 * 1_000;
  
  // We don't want the stars to move
    starfield.minEmitPower = 0;
    starfield.maxEmitPower = 0;
    starfield.gravity = new Vector3(0, 0, 0);
  
  // Star colours will pick from somewhere between these two colours
    starfield.color1 = new Color4(1, 0.8, 0.8, 1.0);
    starfield.color2 = new Color4(1, 1, 1, 1.0);
    starfield.particleTexture = new Texture('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADNJREFUOE9jZKAQMFKon2HUAAYah8H/////g2KJkZERZ2DjjQWKDSAmjYymA1qnA2JiAQB3SAgRq6BZyAAAAABJRU5ErkJggg==', scene);
    starfield.start();  
    return scene
  }
  