import { Engine, IPointerEvent, Scene, Vector3 } from "@babylonjs/core";
import { pipe } from "fp-ts/function";
import { setupBackground } from "./background";
import { setupFirstPersonCamera, setupOverviewCamera } from "./camera";
import { setupGround } from "./meshes/ground";
import { setupLights } from "./lights";
import { setupBoxes } from "./meshes/boxes";
import { setupBoundary } from "./meshes/boundary";
import { setupImpostors, setupPhysics } from "./physics";

export const createAndRenderScene = (engine: Engine) => {
  const scene = pipe(
    new Scene(engine),
    // setupScene,
    setupBackground,
    setupLights,
    // setupGround,
    // setupBoxes,
    // setupBoundary,
    // setupFirstPersonCamera,
    setupOverviewCamera,
    setupPhysics,
    setupImpostors
    // setupPlayer
  );

  scene.onPointerDown = ({ button }: IPointerEvent) => {
    if (button === 0) { engine.enterPointerlock()}
    if (button === 1) { engine.exitPointerlock()}
  }


  engine.runRenderLoop(() => {
    scene.render();
  });
}

const setupScene = (scene: Scene) => {
    const FRAMES_PER_SECOND = 60; 
    const GRAVITY = -9.81;
    
    scene.gravity = new Vector3(0, GRAVITY/FRAMES_PER_SECOND, 0);
    scene.collisionsEnabled = true;
  return scene
}




