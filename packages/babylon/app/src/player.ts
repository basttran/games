import {
  AbstractMesh,
  Color3,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { doCreateColorMaterial } from './material';
import { doPlayerController } from './controls';
import { doPlayerWithVelocityController } from './interactions/controls';
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
