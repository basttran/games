import {
  Color3,
  Mesh,
  Nullable,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { UniversalBuilder } from './meshes/builders';
import { doCreateColorMaterial } from './meshes/material';
import { setPhysics } from './physics';

export const setupTrigger = (
  colliderMesh: Mesh,
  collidedAgainstMesh: Mesh,
  onTrigger: (
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
    onTrigger
  );
};

export const setupImposturedMeshesWithTriggers = (scene: Scene) => {
  const createMaterial = doCreateColorMaterial(scene);
  const redMaterial = createMaterial(new Color3(1, 0, 0));
  const groundMaterial = createMaterial(new Color3(0.3, 0, 0.3));
  //   const setCollidedMaterialTo = doSetCollidedMaterialTo(redMaterial);

  const MeshWithPhysicsBuilder = UniversalBuilder(setPhysics);

  const ground = MeshWithPhysicsBuilder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene,
    [PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0.5 }]
  );

  ground.position.y = 0;
  ground.material = groundMaterial;

  const sphere = MeshWithPhysicsBuilder.CreateSphere(
    'sphere',
    { diameter: 4 },
    scene,
    [PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0, restitution: 0.8 }]
  );
  sphere.position = new Vector3(0, 15, 1);
  const box = MeshWithPhysicsBuilder.CreateBox(
    'box',
    { width: 4, depth: 4, height: 1 },
    scene,
    [PhysicsImpostor.NoImpostor, { mass: 0, friction: 0, restitution: 0 }]
  );
  box.position.y = 0.5;
  box.visibility = 0.2;

  let counter = 0;

  scene.registerBeforeRender(() => {
    if (box.intersectsMesh(sphere)) {
      counter += 1;
      console.log(`intersected ${counter}`);
    }
  });

  return scene;
};
