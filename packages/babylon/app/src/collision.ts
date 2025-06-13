import {
  AbstractMesh,
  Color3,
  Mesh,
  Nullable,
  PBRMaterial,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { UniversalBuilder } from './meshes/builders';
import { doCreateColorMaterial } from './meshes/material';
import { setPhysics } from './physics';

const doSetColliderMaterialTo =
  (material: PBRMaterial) =>
  (collider: PhysicsImpostor, _collided: PhysicsImpostor) => {
    (collider.object as AbstractMesh).material = material;
  };

const doSetCollidedMaterialTo =
  (material: PBRMaterial) =>
  (_collider: PhysicsImpostor, collided: PhysicsImpostor) => {
    (collided.object as AbstractMesh).material = material;
  };

export const setupCollision = (
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
  const createMaterial = doCreateColorMaterial(scene);
  const redMaterial = createMaterial(new Color3(1, 0, 0));
  const setCollidedMaterialTo = doSetCollidedMaterialTo(redMaterial);

  const MeshWithPhysicsBuilder = UniversalBuilder(setPhysics);

  const ground = MeshWithPhysicsBuilder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene,
    [PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0.5 }]
  );

  ground.position.y = 0;

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

  setupCollision(
    box,
    sphere,
    (box.physicsImpostor, sphere.physicsImpostor, setCollidedMaterialTo)
  );

  return scene;
};
