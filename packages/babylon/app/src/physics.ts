import * as R from 'fp-ts/Record';
import {
  CannonJSPlugin,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import * as CANNON from 'cannon';
import {
  buildMeshWithSpecsBuilder,
  buildMeshWithSpecToType,
  MeshWithSpecBuilder,
} from './meshes/builders';
import { setPhysics } from './interactions/physics';
import { pipe } from 'fp-ts/function';

export const setupPhysics = (scene: Scene) => {
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new CannonJSPlugin(true, 10, CANNON)
  );
  return scene;
};

export const setupImpostors = (scene: Scene) => {
  const MeshWithPhysicsBuilder = pipe(
    MeshWithSpecBuilder,
    R.map((creator) => buildMeshWithSpecToType(creator, setPhysics))
  );
  const ground = MeshWithPhysicsBuilder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene,
    // bad tuple typin
    [PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0.5 }]
  );
  const sphere = MeshWithPhysicsBuilder.CreateSphere(
    'sphere',
    { diameter: 4 },
    scene,
    [PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0, restitution: 0.8 }]
  );
  sphere.position = new Vector3(0, 15, 1);
  const box = MeshWithPhysicsBuilder.CreateBox('box', { size: 2 }, scene, [
    PhysicsImpostor.BoxImpostor,
    { mass: 1, friction: 0, restitution: 0.6 },
  ]);
  box.position = new Vector3(0, 10, 0);

  return scene;
};
