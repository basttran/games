import {
  ActionManager,
  Color3,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { doCreateColorMaterial } from './material';
import { UniversalBuilder } from './meshes/builders';
import { setPhysics } from './physics';

export const setupMeshWithVelocity = (scene: Scene): Scene => {
  const createMaterial = doCreateColorMaterial(scene);
  const redMaterial = createMaterial(new Color3(1, 0, 0));
  const groundMaterial = createMaterial(new Color3(0.3, 0, 0.3));
  //   const setCollidedMaterialTo = doSetCollidedMaterialTo(redMaterial);

  const MeshWithPhysicsBuilder = UniversalBuilder(setPhysics);

  const ground = MeshWithPhysicsBuilder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene,
    [PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.3, restitution: 0.5 }]
  );

  ground.position.y = 0;
  ground.material = groundMaterial;

  const box = MeshWithPhysicsBuilder.CreateBox(
    'box',
    { width: 2, depth: 2, height: 4 },
    scene,
    [PhysicsImpostor.BoxImpostor, { mass: 1, friction: 0.3, restitution: 0 }]
  );
  box.position.y = 2;
  box.visibility = 0.8;

  const flyBox = () => {
    box.physicsImpostor?.setLinearVelocity(box.up);
    box.physicsImpostor?.setAngularVelocity(new Vector3(0, 1, 0));
  };

  let gameOver = false;
  if (!gameOver) {
    scene.registerBeforeRender(flyBox);
  }
  scene.onPointerDown = () => {
    gameOver = true;
    scene.unregisterBeforeRender(flyBox);
  };

  return scene;
};
