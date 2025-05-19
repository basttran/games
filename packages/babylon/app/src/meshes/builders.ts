import {
  Engine,
  GoldbergMesh,
  GroundMesh,
  LinesMesh,
  Mesh,
  MeshBuilder,
  PhysicsImpostor,
  PhysicsImpostorParameters,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { MeshBuilderCreateText } from '../font-data';
import { pipe } from 'fp-ts/function';
import * as R from 'fp-ts/Record';
import * as O from 'fp-ts/Option';

export const MeshWithSpecBuilder = {
  CreateBox: MeshBuilder.CreateBox,
  CreateTiledBox: MeshBuilder.CreateTiledBox,
  CreateSphere: MeshBuilder.CreateSphere,
  CreateDisc: MeshBuilder.CreateDisc,
  CreateIcoSphere: MeshBuilder.CreateIcoSphere,
  CreateRibbon: MeshBuilder.CreateRibbon,
  CreateCylinder: MeshBuilder.CreateCylinder,
  CreateTorus: MeshBuilder.CreateTorus,
  CreateTorusKnot: MeshBuilder.CreateTorusKnot,
  CreateLineSystem: MeshBuilder.CreateLineSystem,
  CreateLines: MeshBuilder.CreateLines,
  CreateDashedLines: MeshBuilder.CreateDashedLines,
  ExtrudeShape: MeshBuilder.ExtrudeShape,
  ExtrudeShapeCustom: MeshBuilder.ExtrudeShapeCustom,
  CreateLathe: MeshBuilder.CreateLathe,
  CreateTiledPlane: MeshBuilder.CreateTiledPlane,
  CreatePlane: MeshBuilder.CreatePlane,
  CreateGround: MeshBuilder.CreateGround,
  CreateTiledGround: MeshBuilder.CreateTiledGround,
  CreateGroundFromHeightMap: MeshBuilder.CreateGroundFromHeightMap,
  CreatePolygon: MeshBuilder.CreatePolygon,
  ExtrudePolygon: MeshBuilder.ExtrudePolygon,
  CreateTube: MeshBuilder.CreateTube,
  CreatePolyhedron: MeshBuilder.CreatePolyhedron,
  CreateGeodesic: MeshBuilder.CreateGeodesic,
  CreateGoldberg: MeshBuilder.CreateGoldberg,
  CreateDecal: MeshBuilder.CreateDecal,
  CreateCapsule: MeshBuilder.CreateCapsule,
  CreateText: MeshBuilderCreateText, // MeshBuilder.CreateText,
};

export const buildMeshWithSpecToType = <
  T extends keyof typeof MeshWithSpecBuilder,
  U extends (
    ...args: any[]
  ) => <V extends Mesh | LinesMesh | GoldbergMesh | GroundMesh>(mesh: V) => V
>(
  key: T,
  modifier: U
) => {
  const creator = MeshWithSpecBuilder[key];
  const builder = (
    ...args: [
      (typeof creator.arguments)[0],
      (typeof creator.arguments)[1],
      (typeof creator.arguments)[2],
      Parameters<U>
    ]
  ) => {
    const mesh = creator(args[0], args[1], args[2]);
    const modify = modifier(...args[3]);
    const modifiedMesh = modify(mesh);
    return modifiedMesh;
  };

  return (
    name: Parameters<(typeof MeshWithSpecBuilder)[T]>[0],
    meshOptions: Parameters<(typeof MeshWithSpecBuilder)[T]>[1],
    scene: Parameters<(typeof MeshWithSpecBuilder)[T]>[2],
    modifierArgs: Parameters<U>
  ) => {
    return builder(name, meshOptions, scene, modifierArgs);
  };
};

export const UniversalBuilder = <
  T extends (
    ...args: any[]
  ) => <U extends Mesh | LinesMesh | GoldbergMesh | GroundMesh>(mesh: U) => U
>(
  modifier: T
) =>
  pipe(
    MeshWithSpecBuilder,
    R.mapWithIndex((creatorIndex, _creator) =>
      buildMeshWithSpecToType(creatorIndex, modifier)
    )
  );

export const buildMeshWithSpecsBuilder = (
  modifier: (
    ...args: any[]
  ) => <V extends Mesh | LinesMesh | GoldbergMesh | GroundMesh>(mesh: V) => V
) => ({
  CreateSphere: buildMeshWithSpecToType('CreateSphere', modifier),
  CreateBox: buildMeshWithSpecToType('CreateBox', modifier),
  CreateTiledBox: buildMeshWithSpecToType('CreateTiledBox', modifier),
  CreateDisc: buildMeshWithSpecToType('CreateDisc', modifier),
  CreateIcoSphere: buildMeshWithSpecToType('CreateIcoSphere', modifier),
  CreateRibbon: buildMeshWithSpecToType('CreateRibbon', modifier),
  CreateCylinder: buildMeshWithSpecToType('CreateCylinder', modifier),
  CreateTorus: buildMeshWithSpecToType('CreateTorus', modifier),
  CreateTorusKnot: buildMeshWithSpecToType('CreateTorusKnot', modifier),
  ExtrudeShape: buildMeshWithSpecToType('ExtrudeShape', modifier),
  ExtrudeShapeCustom: buildMeshWithSpecToType('ExtrudeShapeCustom', modifier),
  CreateLathe: buildMeshWithSpecToType('CreateLathe', modifier),
  CreateTiledPlane: buildMeshWithSpecToType('CreateTiledPlane', modifier),
  CreatePlane: buildMeshWithSpecToType('CreatePlane', modifier),
  CreateTiledGround: buildMeshWithSpecToType('CreateTiledGround', modifier),
  CreatePolygon: buildMeshWithSpecToType('CreatePolygon', modifier),
  ExtrudePolygon: buildMeshWithSpecToType('ExtrudePolygon', modifier),
  CreateTube: buildMeshWithSpecToType('CreateTube', modifier),
  CreatePolyhedron: buildMeshWithSpecToType('CreatePolyhedron', modifier),
  CreateGeodesic: buildMeshWithSpecToType('CreateGeodesic', modifier),
  CreateDecal: buildMeshWithSpecToType('CreateDecal', modifier),
  CreateCapsule: buildMeshWithSpecToType('CreateCapsule', modifier),
  CreateLineSystem: buildMeshWithSpecToType('CreateLineSystem', modifier),
  CreateLines: buildMeshWithSpecToType('CreateLines', modifier),
  CreateDashedLines: buildMeshWithSpecToType('CreateDashedLines', modifier),
  CreateGround: buildMeshWithSpecToType('CreateGround', modifier),
  CreateGroundFromHeightMap: buildMeshWithSpecToType(
    'CreateGroundFromHeightMap',
    modifier
  ),
  CreateGoldberg: buildMeshWithSpecToType('CreateGoldberg', modifier),
  CreateText: buildMeshWithSpecToType('CreateText', modifier),
});

const setPhysics =
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

const BoxMaker = buildMeshWithSpecToType('CreateBox', setPhysics);
const DecalMaker = buildMeshWithSpecToType('CreateDecal', setPhysics);
const TextMaker = buildMeshWithSpecToType('CreateText', setPhysics);

// const scene = new Scene(new Engine(new HTMLCanvasElement()));

// const box = BoxMaker('box', { size: 4 }, scene, [
//   PhysicsImpostor.BoxImpostor,
//   { mass: 1, friction: 0.2, restitution: 0.4 },
// ]);
// const decal = DecalMaker('boxDecal', box, {}, [
//   PhysicsImpostor.NoImpostor,
//   { mass: 0, friction: 0, restitution: 0 },
// ]);

// const text = TextMaker('text', { text: '~' }, scene, [
//   PhysicsImpostor.NoImpostor,
//   { mass: 0, friction: 0, restitution: 0 },
// ]);

// box.position = new Vector3(0, 0, 0);
export const setRotation = (rotation: Vector3) => (mesh: Mesh) => {
  mesh.rotation = rotation;
  return mesh;
};
