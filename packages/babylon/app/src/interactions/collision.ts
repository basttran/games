import {
  Mesh,
  Nullable,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { buildMeshWithSpecsBuilder, setPhysics } from '../meshes/builders';

export const setupCollisions = (
  colliderMesh: Mesh,
  collidedAgainstMesh: Mesh,
  onCollide: (
    collider: PhysicsImpostor,
    collidedAgainst: PhysicsImpostor,
    point: Nullable<Vector3>
  ) => void
) => {
  if (
    colliderMesh.physicsImpostor === null ||
    collidedAgainstMesh.physicsImpostor === null
  ) {
    return;
  }
  colliderMesh.physicsImpostor.registerOnPhysicsCollide(
    collidedAgainstMesh.physicsImpostor,
    onCollide
  );
};
export const setupImposturedMeshesWithCollisions = (scene: Scene) => {
  const Builder = buildMeshWithSpecsBuilder(setPhysics);
  const ground = Builder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene,
    [PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0.5 }]
  );
  // const sphere = MeshWithPhysicsBuilder.CreateSphere(
  //   'sphere',
  //   { diameter: 4 },
  //   { mass: 1, friction: 0, restitution: 0.8 },
  //   scene
  // );
  // sphere.position = new Vector3(0, 15, 1);
  // const box = MeshWithPhysicsBuilder.CreateBox(
  //   'box',
  //   { size: 2 },
  //   { mass: 1, friction: 0, restitution: 0.6 },
  //   scene
  // );
  // box.position = new Vector3(0, 10, 0);

  return scene;
};
