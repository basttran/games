import { Scene } from '@babylonjs/core';
import { flow } from 'fp-ts/function';
import { setupBackground } from './background';
import { setupFirstPersonCamera, setupOverviewCamera } from './camera';
import { setupImposturedMeshesWithCollisions } from './interactions/collision';
import { setupLights } from './lights';
import { setupBoundary } from './meshes/boundary';
import { setupBoxes, setupBoxesWithImpostors } from './meshes/boxes';
import { setupGround, setupGroundWithImpostor } from './meshes/ground';
import { setupImpostors, setupPhysics } from './physics';
import { setupPlayer, setupPlayerWithVelocity } from './player';
import { setupPointerLock, setupScene } from './scene';
import { setupImposturedMeshesWithTriggers } from './trigger';
import { setupMeshWithVelocity } from './velocity';

export const compositions = {
  basic: flow(
    setupScene,
    setupPointerLock,
    setupBackground,
    setupLights,
    setupGround,
    setupBoxes(true),
    setupBoundary,
    setupOverviewCamera,
    setupPlayer
  ),
  basicFPS: flow(
    setupScene,
    setupPointerLock,
    setupBackground,
    setupLights,
    setupGround,
    setupBoxes(true),
    setupBoundary,
    setupFirstPersonCamera
  ),
  physics: flow(
    setupScene,
    setupPointerLock,
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupPhysics,
    setupImpostors
  ),
  collisions: flow(
    setupScene,
    setupPointerLock,
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupPhysics,
    setupImposturedMeshesWithCollisions
  ),
  triggers: flow(
    setupScene,
    setupPointerLock,
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupPhysics,
    setupImposturedMeshesWithTriggers
  ),
  velocity: flow(
    setupScene,
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupPhysics,
    setupMeshWithVelocity
  ),
  velocityPlayer: flow(
    setupScene,
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupPhysics,
    setupBoxesWithImpostors,
    setupGroundWithImpostor,
    setupPlayerWithVelocity
  ),
};

export type Compositions = (typeof compositions)[keyof typeof compositions];

export const composeScene =
  (composition: Compositions) =>
  (scene: Scene): Scene => {
    return composition(scene);
  };
