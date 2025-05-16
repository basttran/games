import {
  CannonJSPlugin,
  Color3,
  LinesMesh,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  PhysicsImpostor,
  PhysicsImpostorParameters,
  Scene,
  Vector3
} from '@babylonjs/core';
import * as CANNON from 'cannon';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import {
  buildMeshWithSpecToType
} from '../meshes/builders';

export const setupPhysics = (scene: Scene) => {
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new CannonJSPlugin(true, 10, CANNON)
  );
  return scene;
};
export const setPhysics =
  (
    impostorType: number,
    physicsImpostorParameters: PhysicsImpostorParameters
  ) =>
  <T extends (Mesh | LinesMesh)>(mesh: T): T => {
    return pipe(
      mesh,
      O.fromNullable,
      O.map((m) => {
        m.physicsImpostor = new PhysicsImpostor(
          m,
          impostorType,
          physicsImpostorParameters
        );
        return m;
      }),
      O.getOrElse(() => mesh)
    );
  };
export const setColor =
  (color: Color3, scene: Scene) =>
  <T extends (Mesh | LinesMesh)>(mesh: T): T => {
    const material = new PBRMaterial(color.toHexString(), scene);
    material.roughness = 1;
    material.albedoColor = color;

    return pipe(
      mesh,
      O.fromNullable,
      O.map((m) => {
        m.material = material;
        return m;
      }),
      O.getOrElse(() => mesh)
    );
  };

export const setupImposturedMeshes = (scene: Scene) => {
  const BoxBuilder = buildMeshWithSpecToType(MeshBuilder.CreateBox, setPhysics);
  const SphereBuilder = buildMeshWithSpecToType(
    MeshBuilder.CreateSphere,
    setPhysics
  );
  const GroundBuilder = buildMeshWithSpecToType(
    MeshBuilder.CreateGround,
    setPhysics
  );

  const ground = GroundBuilder('ground', { width: 20, height: 20 }, scene, [
    PhysicsImpostor.BoxImpostor,
    { mass: 0, friction: 0.2, restitution: 0.4 },
  ]);
  const sphere = SphereBuilder('sphere', { diameter: 4 }, scene, [
    PhysicsImpostor.SphereImpostor,
    { mass: 1, friction: 0, restitution: 0.8 },
  ]);
  sphere.position = new Vector3(0, 15, 1);
  const box = BoxBuilder('box', { size: 2 }, scene, [
    PhysicsImpostor.BoxImpostor,
    { mass: 1, friction: 0.2, restitution: 0.6 },
  ]);
  box.position = new Vector3(0, 10, 0);

  return scene;
};
