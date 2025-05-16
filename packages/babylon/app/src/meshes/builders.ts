import { LinesMesh, Mesh, MeshBuilder, Vector3 } from '@babylonjs/core';
import { pipe } from 'fp-ts/function';
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
};

type MeshBuilderKey = keyof typeof MeshWithSpecBuilder;
type MeshBuilderCreatorType<T extends MeshBuilderKey> = (typeof MeshBuilder)[T];

export const buildMeshWithSpecToType = <
  T extends MeshBuilderKey,
  U extends MeshBuilderCreatorType<T>,
  V extends Mesh | LinesMesh,
  W extends (...args: any[]) => (mesh: V) => V
>(
  creator: U,
  modifier: W
): ((
  name: Parameters<U>[0],
  options: Parameters<U>[1],
  scene: Parameters<U>[2],
  modifierArgs: Parameters<W>
) => ReturnType<U>) => {
  const builder = (
    ...args: [
      (typeof creator.arguments)[0],
      (typeof creator.arguments)[1],
      (typeof creator.arguments)[2],
      Parameters<W>
    ]
  ) => {
    const result = pipe(
      creator(args[0], args[1], args[2]),
      O.fromPredicate((m) => m != null),
      O.map(modifier),
      O.toNullable
    );
    return result as ReturnType<U>;
  };

  return builder;
};

type MeshModifier = (
  ...modifierArgs: any[]
) => <T extends Mesh | LinesMesh>(mesh: T) => T;

export const buildMeshWithSpecsBuilder = (modifier: MeshModifier) => ({
  CreateSphere: buildMeshWithSpecToType(MeshBuilder.CreateSphere, modifier),
  CreateBox: buildMeshWithSpecToType(MeshBuilder.CreateBox, modifier),
  CreateTiledBox: buildMeshWithSpecToType(MeshBuilder.CreateTiledBox, modifier),
  CreateDisc: buildMeshWithSpecToType(MeshBuilder.CreateDisc, modifier),
  CreateIcoSphere: buildMeshWithSpecToType(
    MeshBuilder.CreateIcoSphere,
    modifier
  ),
  CreateRibbon: buildMeshWithSpecToType(MeshBuilder.CreateRibbon, modifier),
  CreateCylinder: buildMeshWithSpecToType(MeshBuilder.CreateCylinder, modifier),
  CreateTorus: buildMeshWithSpecToType(MeshBuilder.CreateTorus, modifier),
  CreateTorusKnot: buildMeshWithSpecToType(
    MeshBuilder.CreateTorusKnot,
    modifier
  ),
  ExtrudeShape: buildMeshWithSpecToType(MeshBuilder.ExtrudeShape, modifier),
  ExtrudeShapeCustom: buildMeshWithSpecToType(
    MeshBuilder.ExtrudeShapeCustom,
    modifier
  ),
  CreateLathe: buildMeshWithSpecToType(MeshBuilder.CreateLathe, modifier),
  CreateTiledPlane: buildMeshWithSpecToType(
    MeshBuilder.CreateTiledPlane,
    modifier
  ),
  CreatePlane: buildMeshWithSpecToType(MeshBuilder.CreatePlane, modifier),
  CreateTiledGround: buildMeshWithSpecToType(
    MeshBuilder.CreateTiledGround,
    modifier
  ),
  CreatePolygon: buildMeshWithSpecToType(MeshBuilder.CreatePolygon, modifier),
  ExtrudePolygon: buildMeshWithSpecToType(MeshBuilder.ExtrudePolygon, modifier),
  CreateTube: buildMeshWithSpecToType(MeshBuilder.CreateTube, modifier),
  CreatePolyhedron: buildMeshWithSpecToType(
    MeshBuilder.CreatePolyhedron,
    modifier
  ),
  CreateGeodesic: buildMeshWithSpecToType(MeshBuilder.CreateGeodesic, modifier),
  CreateDecal: buildMeshWithSpecToType(MeshBuilder.CreateDecal, modifier),
  CreateCapsule: buildMeshWithSpecToType(MeshBuilder.CreateCapsule, modifier),
  CreateLineSystem: buildMeshWithSpecToType(
    MeshBuilder.CreateLineSystem,
    modifier
  ),
  CreateLines: buildMeshWithSpecToType(MeshBuilder.CreateLines, modifier),
  CreateDashedLines: buildMeshWithSpecToType(
    MeshBuilder.CreateDashedLines,
    modifier
  ),
  CreateGround: buildMeshWithSpecToType(MeshBuilder.CreateGround, modifier),
  CreateGroundFromHeightMap: buildMeshWithSpecToType(
    MeshBuilder.CreateGroundFromHeightMap,
    modifier
  ),
  CreateGoldberg: buildMeshWithSpecToType(MeshBuilder.CreateGoldberg, modifier),
});

export const setRotation = (rotation: Vector3) => (mesh: Mesh) => {
  mesh.rotation = rotation;
  return mesh;
};
