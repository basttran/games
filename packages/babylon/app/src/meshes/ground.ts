import {
  Color3,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { doCreateColorMaterial } from '../material';
import { setPhysics } from '../physics';

export const setupGround = (scene: Scene) => {
  const createColorMaterial = doCreateColorMaterial(scene);
  const ground = MeshBuilder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene
  );
  ground.position = Vector3.Zero();
  ground.material = createColorMaterial(new Color3(0, 1, 0));
  ground.checkCollisions = true;
  return scene;
};
export const setupGroundWithImpostor = (scene: Scene) => {
  const createColorMaterial = doCreateColorMaterial(scene);
  const ground = MeshBuilder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene
  );
  ground.material = createColorMaterial(new Color3(0, 1, 0));
  setPhysics(PhysicsImpostor.BoxImpostor, {
    mass: 0,
    friction: 0,
    restitution: 0,
  })(ground);

  return scene;
};
