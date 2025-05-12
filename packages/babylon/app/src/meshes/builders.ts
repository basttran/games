import { Mesh, MeshBuilder, PhysicsImpostor, PhysicsImpostorParameters } from "@babylonjs/core";
import { pipe } from "fp-ts/function";
import * as O from 'fp-ts/Option';

type MeshModifier = (mesh: Mesh) => Mesh

export const buildMeshWithPhysicsBuilder = <T extends keyof typeof MeshBuilder, U extends (typeof MeshBuilder)[T]>(
  creator: U, impostorType: number
) => {
  const builder = (
    ...args: [
      typeof creator.arguments[0],
      typeof creator.arguments[1],
      PhysicsImpostorParameters,
      typeof creator.arguments[2] 
    ]
  ) => {
    return pipe(
      creator(args[0], args[1], args[3]),
      O.fromNullable,
      O.map((mesh) => {
        mesh.physicsImpostor = new PhysicsImpostor(mesh, impostorType, args[2]);
        return mesh
      }),
      O.toNullable
    )
  }

  return builder as (
    name: Parameters<U>[0],
    options: Parameters<U>[1],
    impostorParameters: PhysicsImpostorParameters,
    scene: Parameters<U>[2]) => ReturnType<typeof creator>
}

export const buildMeshWithSpecs = <T extends keyof typeof MeshBuilder, U extends (typeof MeshBuilder)[T]>(
  creator: U,
  modifier: MeshModifier
) => {
  const builder = (
    ...args: [
      typeof creator.arguments[0],
      typeof creator.arguments[1],
      typeof creator.arguments[2] 
    ]
  ) => {
    return pipe(
      creator(args[0], args[1], args[2]),
      O.fromNullable,
      O.map(modifier),
      O.toNullable
    )
  }

  return builder as (
    name: Parameters<U>[0],
    options: Parameters<U>[1],
    scene: Parameters<U>[2]) => ReturnType<typeof creator>
}


export const MeshWithPhysicsBuilder = {
    CreateSphere: buildMeshWithPhysicsBuilder(MeshBuilder.CreateSphere, PhysicsImpostor.SphereImpostor),
    CreateBox: buildMeshWithPhysicsBuilder(MeshBuilder.CreateBox, PhysicsImpostor.BoxImpostor),
    CreateTiledBox: buildMeshWithPhysicsBuilder(MeshBuilder.CreateTiledBox, PhysicsImpostor.BoxImpostor),
    CreateDisc: buildMeshWithPhysicsBuilder(MeshBuilder.CreateDisc, PhysicsImpostor.PlaneImpostor),
    CreateIcoSphere: buildMeshWithPhysicsBuilder(MeshBuilder.CreateIcoSphere, PhysicsImpostor.SphereImpostor),
    CreateRibbon: buildMeshWithPhysicsBuilder(MeshBuilder.CreateRibbon, PhysicsImpostor.PlaneImpostor),
    CreateCylinder: buildMeshWithPhysicsBuilder(MeshBuilder.CreateCylinder, PhysicsImpostor.CylinderImpostor),
    CreateTorus: buildMeshWithPhysicsBuilder(MeshBuilder.CreateTorus, PhysicsImpostor.NoImpostor),
    CreateTorusKnot: buildMeshWithPhysicsBuilder(MeshBuilder.CreateTorusKnot, PhysicsImpostor.NoImpostor),
    ExtrudeShape: buildMeshWithPhysicsBuilder(MeshBuilder.ExtrudeShape, PhysicsImpostor.NoImpostor),
    ExtrudeShapeCustom: buildMeshWithPhysicsBuilder(MeshBuilder.ExtrudeShapeCustom, PhysicsImpostor.NoImpostor),
    CreateLathe: buildMeshWithPhysicsBuilder(MeshBuilder.CreateLathe, PhysicsImpostor.NoImpostor),
    CreateTiledPlane: buildMeshWithPhysicsBuilder(MeshBuilder.CreateTiledPlane, PhysicsImpostor.PlaneImpostor),
    CreatePlane: buildMeshWithPhysicsBuilder(MeshBuilder.CreatePlane, PhysicsImpostor.PlaneImpostor),
    CreateTiledGround: buildMeshWithPhysicsBuilder( MeshBuilder.CreateTiledGround, PhysicsImpostor.BoxImpostor),
    CreatePolygon: buildMeshWithPhysicsBuilder(MeshBuilder.CreatePolygon, PhysicsImpostor.NoImpostor),
    ExtrudePolygon: buildMeshWithPhysicsBuilder(MeshBuilder.ExtrudePolygon, PhysicsImpostor.NoImpostor),
    CreateTube: buildMeshWithPhysicsBuilder(MeshBuilder.CreateTube, PhysicsImpostor.NoImpostor),
    CreatePolyhedron: buildMeshWithPhysicsBuilder(MeshBuilder.CreatePolyhedron, PhysicsImpostor.NoImpostor),
    CreateGeodesic: buildMeshWithPhysicsBuilder(MeshBuilder.CreateGeodesic, PhysicsImpostor.NoImpostor),
    CreateDecal: buildMeshWithPhysicsBuilder(MeshBuilder.CreateDecal, PhysicsImpostor.NoImpostor),
    CreateCapsule: buildMeshWithPhysicsBuilder(MeshBuilder.CreateCapsule, PhysicsImpostor.CapsuleImpostor),
    CreateText: buildMeshWithPhysicsBuilder(MeshBuilder.CreateText, PhysicsImpostor.NoImpostor),
    CreateLineSystem: buildMeshWithPhysicsBuilder(MeshBuilder.CreateLineSystem, PhysicsImpostor.NoImpostor),
    CreateLines: buildMeshWithPhysicsBuilder(MeshBuilder.CreateLines, PhysicsImpostor.NoImpostor),
    CreateDashedLines: buildMeshWithPhysicsBuilder(MeshBuilder.CreateDashedLines, PhysicsImpostor.NoImpostor),
    CreateGround: buildMeshWithPhysicsBuilder(MeshBuilder.CreateGround, PhysicsImpostor.BoxImpostor),
    CreateGroundFromHeightMap: buildMeshWithPhysicsBuilder(MeshBuilder.CreateGroundFromHeightMap, PhysicsImpostor.HeightmapImpostor),
    CreateGoldberg: buildMeshWithPhysicsBuilder(MeshBuilder.CreateGoldberg, PhysicsImpostor.NoImpostor),
} 