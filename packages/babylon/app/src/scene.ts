import { Scene, Vector3 } from "@babylonjs/core";

export const setupScene = (scene: Scene) => {
    const FRAMES_PER_SECOND = 60; 
    const GRAVITY = -9.81;
    
    scene.gravity = new Vector3(0, GRAVITY/FRAMES_PER_SECOND, 0);
    scene.collisionsEnabled = true;
  return scene
}
