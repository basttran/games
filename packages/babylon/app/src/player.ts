import {
  AbstractMesh,
  Color3,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { doCreateColorMaterial } from './material';
import { doJumpPlayerController, doPlayerController } from './controls';
import {
  doPlayerWithVelocityController,
  doStablePlayerWithVelocityController,
} from './interactions/controls';
import { setPhysics } from './physics';

export const setupPlayer = (scene: Scene) => {
  const createColorMaterial = doCreateColorMaterial(scene);
  const box = MeshBuilder.CreateBox(
    `player`,
    { width: 1, height: 1, depth: 1 },
    scene
  );
  box.position = new Vector3(0, 0.5, -2);
  box.material = createColorMaterial(new Color3(1, 0, 0));
  box.checkCollisions = true;
  const { keyboard, player } = doPlayerController(box);
  scene.onKeyboardObservable.add(keyboard.registerInputs);
  scene.registerBeforeRender(() => player.move());

  return scene;
};
export const setupJumpPlayer = (scene: Scene) => {
  // const createColorMaterial = doCreateColorMaterial(scene);
  const box = MeshBuilder.CreateBox(`player`, { size: 1 }, scene);
  box.position = new Vector3(0, 0.5, 0);
  // box.material = createColorMaterial(new Color3(1, 0, 0));
  // box.checkCollisions = true;
  const { keyboard, player } = doJumpPlayerController(box, scene);
  scene.onKeyboardObservable.add(keyboard.registerInputs);
  scene.registerBeforeRender(() => player.move());

  return scene;
};

export const setupPlayerWithVelocity = (scene: Scene) => {
  const createColorMaterial = doCreateColorMaterial(scene);
  const box = MeshBuilder.CreateBox(
    `player`,
    { width: 1, height: 1, depth: 1 },
    scene
  );
  box.position = new Vector3(0, 1, -2);
  box.material = createColorMaterial(new Color3(1, 0, 0));
  setPhysics(PhysicsImpostor.BoxImpostor, {
    mass: 1,
    friction: 0.5,
    restitution: 0.2,
  })(box);
  if (box.physicsImpostor) {
    const { keyboard, player } = doPlayerWithVelocityController(box);
    scene.onKeyboardObservable.add(keyboard.registerInputs);
    scene.registerBeforeRender(() => player.move());
  }
  return scene;
};
export const setupStablePlayerWithVelocity = (scene: Scene) => {
  const createColorMaterial = doCreateColorMaterial(scene);
  const cylinder = MeshBuilder.CreateCylinder(
    `player`,
    { height: 1, diameter: 1 },
    scene
  );
  cylinder.position = new Vector3(0, 1, -2);
  cylinder.material = createColorMaterial(new Color3(1, 0, 0));
  setPhysics(PhysicsImpostor.BoxImpostor, {
    mass: 1,
    friction: 0,
    restitution: 0,
  })(cylinder);
  if (cylinder.physicsImpostor) {
    cylinder.physicsImpostor.physicsBody.angularDamping = 1;
    const { keyboard, player } = doStablePlayerWithVelocityController(
      cylinder,
      scene
    );
    scene.onKeyboardObservable.add(keyboard.registerInputs);
    scene.registerBeforeRender(() => player.move());
  }
  return scene;
};
