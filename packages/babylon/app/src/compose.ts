import { Scene } from "@babylonjs/core";
import { flow, pipe } from "fp-ts/function";
import { setupBackground } from "./background";
import { setupFirstPersonCamera, setupOverviewCamera } from "./camera";
import { setupLights } from "./lights";
import { setupBoundary } from "./meshes/boundary";
import { setupBoxes } from "./meshes/boxes";
import { setupGround } from "./meshes/ground";
import { setupImpostors, setupPhysics } from "./physics";
import { setupPlayer } from "./player";
import { setupScene } from "./scene";

export const compositions = {
  basic: flow(
        setupScene,
        setupBackground,
        setupLights,
        setupGround,
        setupBoxes,
        setupBoundary,
        setupOverviewCamera,
        setupPlayer
  ),
  basicFPS: flow(
        setupScene,
        setupBackground,
        setupLights,
        setupGround,
        setupBoxes,
        setupBoundary,
        setupFirstPersonCamera,
  ),
  physics: flow(
        setupScene,
        setupBackground,
        setupLights,
        setupOverviewCamera,
        setupPhysics,
        setupImpostors
  ),
}

export type Compositions = typeof compositions[keyof typeof compositions]

export const composeScene = (composition: Compositions) => (scene: Scene) => { 
  return composition(scene)
}