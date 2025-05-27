import { Scene } from '@babylonjs/core';
import { flow } from 'fp-ts/function';
import { setupBackground } from './background';
import { setupFirstPersonCamera, setupOverviewCamera } from './camera';
import { setupImposturedMeshesWithCollisions } from './interactions/collision';
import { setupLights } from './lights';
import { setupBoundary } from './meshes/boundary';
import { setupBoxes, setupBoxesWithImpostors } from './meshes/boxes';
import { setupGround, setupGroundWithImpostor } from './meshes/ground';
import {
  setupBasicPhysics,
  setupCannonPhysics,
  setupImpostors,
  setupSceneCollisions,
} from './physics';
import {
  setupJumpPlayer,
  setupPlayer,
  setupPlayerWithVelocity,
  setupStablePlayerWithVelocity,
} from './player';
import { setupPointerLock } from './scene';
import { setupImposturedMeshesWithTriggers } from './trigger';
import { setupMeshWithVelocity } from './velocity';

export const compositions = {
  basic: flow(
    setupBasicPhysics,
    setupPointerLock,
    setupBackground,
    setupLights,
    setupGround,
    setupBoxes(true),
    setupBoundary,
    setupOverviewCamera,
    setupPlayer
  ),
  basicJump: flow(
    setupSceneCollisions,
    setupBackground,
    setupLights,
    setupGround,
    // setupBoxes(false),
    // setupBoundary,
    setupOverviewCamera,
    setupJumpPlayer
  ),
  basicFPS: flow(
    setupBasicPhysics,
    setupPointerLock,
    setupBackground,
    setupLights,
    setupGround,
    setupBoxes(true),
    setupBoundary,
    setupFirstPersonCamera
  ),
  physics: flow(
    setupPointerLock,
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupCannonPhysics,
    setupImpostors
  ),
  collisions: flow(
    setupPointerLock,
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupCannonPhysics,
    setupImposturedMeshesWithCollisions
  ),
  triggers: flow(
    setupPointerLock,
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupCannonPhysics,
    setupImposturedMeshesWithTriggers
  ),
  velocity: flow(
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupCannonPhysics,
    setupMeshWithVelocity
  ),
  velocityPlayer: flow(
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupCannonPhysics,
    setupBoxesWithImpostors,
    setupGroundWithImpostor,
    setupPlayerWithVelocity
  ),
  stableVelocityPlayer: flow(
    setupBackground,
    setupLights,
    setupOverviewCamera,
    setupCannonPhysics,
    setupBoxesWithImpostors,
    setupGroundWithImpostor,
    setupStablePlayerWithVelocity
  ),
};

export type Compositions = (typeof compositions)[keyof typeof compositions];

export const composeScene =
  (composition: Compositions) =>
  (scene: Scene): Scene => {
    return composition(scene);
  };
