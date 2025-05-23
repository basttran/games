import {
  CannonJSPlugin,
  Color3,
  GoldbergMesh,
  GroundMesh,
  LinesMesh,
  Mesh,
  PBRMaterial,
  PhysicsImpostor,
  PhysicsImpostorParameters,
  Scene,
  Vector3,
  AmmoJSPlugin,
  HavokPlugin,
} from '@babylonjs/core';
import * as CANNON from 'cannon';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { UniversalBuilder } from './meshes/builders';
import Ammo from 'ammojs-typed';
import HavokPhysics from '@babylonjs/havok';

export const setupBasicPhysics = (scene: Scene) => {
  const FRAMES_PER_SECOND = 60;
  const GRAVITY = -9.81;

  scene.gravity = new Vector3(0, GRAVITY / FRAMES_PER_SECOND, 0);
  scene.collisionsEnabled = true;
  return scene;
};

export const setupCannonPhysics = (scene: Scene): Scene => {
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new CannonJSPlugin(true, 10, CANNON)
  );
  return scene;
};

export const setupAmmoPhysics = async (scene: Scene): Promise<Scene> => {
  const ammo = await Ammo();
  scene.enablePhysics(new Vector3(0, -9.81, 0), new AmmoJSPlugin(true, ammo));
  return scene;
};

export const setupHavokPhysics = async (scene: Scene): Promise<Scene> => {
  const havokInterface = await HavokPhysics();
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new HavokPlugin(true, havokInterface)
  );
  return scene;
};

export const setPhysics =
  (
    impostorType: number,
    physicsImpostorParameters: PhysicsImpostorParameters
  ) =>
  <T extends Mesh | LinesMesh | GoldbergMesh | GroundMesh>(mesh: T): T => {
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
  <T extends Mesh | LinesMesh | GoldbergMesh | GroundMesh>(mesh: T): T => {
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

export const setupImpostors = (scene: Scene) => {
  const MeshWithPhysicsBuilder = UniversalBuilder(setPhysics);
  const ground = MeshWithPhysicsBuilder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene,
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
  const text = MeshWithPhysicsBuilder.CreateText(
    'text',
    { text: '~', size: 4 },
    scene,
    [PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0.1 }]
  );

  text.position = new Vector3(0, 4, 0);

  return scene;
};
