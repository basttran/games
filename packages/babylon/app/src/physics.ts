import { CannonJSPlugin, Engine, GoldbergMesh, GroundMesh, LinesMesh, Mesh, MeshBuilder, PhysicsImpostor, Scene, Vector3 } from "@babylonjs/core";
import * as CANNON from 'cannon';

export const setupPhysics = (scene: Scene) => {
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new CannonJSPlugin(true, 10, CANNON)
  );
  return scene;
}

export const setupImpostors = (scene: Scene) => {
  const box = MeshBuilder.CreateBox('box', { size: 2});
  box.position = new Vector3(0,10,0);
  box.physicsImpostor = new PhysicsImpostor(
    box,
    PhysicsImpostor.BoxImpostor,
    { mass: 1, friction: 0, restitution: 0.6}
  );
  
  
  const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20});
  ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0.5});
  
  // const sphere = MeshBuilder.CreateSphere(4);
  // sphere.position = new Vector3(0,13,0.5);
  // sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0, restitution: 0.8});

  // const ImposturedMeshBuilder = buildImposturedMeshBuilder(scene);
}

type MeshBuilderType = typeof MeshBuilder;

const buildCreator = <T extends keyof typeof MeshBuilder, U extends (typeof MeshBuilder)[T]>(key: T, creator: U) => {
  return creator as (...args: Parameters<U>) => Mesh
} 
const buildLineCreator = <T extends keyof typeof MeshBuilder, U extends (typeof MeshBuilder)[T]>(key: T, creator: U) => {
  return creator as (...args: Parameters<U>) => LinesMesh
} 
const buildGroundCreator = <T extends keyof typeof MeshBuilder, U extends (typeof MeshBuilder)[T]>(key: T, creator: U) => {
  return creator as (...args: Parameters<U>) => GroundMesh
} 
const buildGoldbergCreator = <T extends keyof typeof MeshBuilder, U extends (typeof MeshBuilder)[T]>(key: T, creator: U) => {
  return creator as (...args: Parameters<U>) => GoldbergMesh
} 

const Builder: MeshBuilderType = {
    CreateSphere: buildCreator('CreateSphere', MeshBuilder.CreateSphere),
    CreateBox: buildCreator('CreateBox', MeshBuilder.CreateBox),
    CreateTiledBox: buildCreator('CreateTiledBox',MeshBuilder.CreateTiledBox),
    CreateDisc: buildCreator('CreateDisc',MeshBuilder.CreateDisc),
    CreateIcoSphere: buildCreator('CreateIcoSphere',MeshBuilder.CreateIcoSphere),
    CreateRibbon: buildCreator('CreateRibbon',MeshBuilder.CreateRibbon),
    CreateCylinder: buildCreator('CreateCylinder',MeshBuilder.CreateCylinder),
    CreateTorus: buildCreator('CreateTorus',MeshBuilder.CreateTorus),
    CreateTorusKnot: buildCreator('CreateTorusKnot',MeshBuilder.CreateTorusKnot),
    ExtrudeShape: buildCreator('ExtrudeShape',MeshBuilder.ExtrudeShape),
    ExtrudeShapeCustom: buildCreator('ExtrudeShapeCustom',MeshBuilder.ExtrudeShapeCustom),
    CreateLathe: buildCreator('CreateLathe',MeshBuilder.CreateLathe),
    CreateTiledPlane: buildCreator('CreateTiledPlane',MeshBuilder.CreateTiledPlane),
    CreatePlane: buildCreator('CreatePlane',MeshBuilder.CreatePlane),
    CreateTiledGround: buildCreator('CreateTiledGround', MeshBuilder.CreateTiledGround),
    CreatePolygon: buildCreator('CreatePolygon',MeshBuilder.CreatePolygon),
    ExtrudePolygon: buildCreator('ExtrudePolygon',MeshBuilder.ExtrudePolygon),
    CreateTube: buildCreator('CreateTube',MeshBuilder.CreateTube),
    CreatePolyhedron: buildCreator('CreatePolyhedron',MeshBuilder.CreatePolyhedron),
    CreateGeodesic: buildCreator('CreateGeodesic',MeshBuilder.CreateGeodesic),
    CreateDecal: buildCreator('CreateDecal',MeshBuilder.CreateDecal),
    CreateCapsule: buildCreator('CreateCapsule',MeshBuilder.CreateCapsule),
    CreateText: buildCreator('CreateText',MeshBuilder.CreateText),
    CreateLineSystem: buildLineCreator('CreateLineSystem',MeshBuilder.CreateLineSystem),
    CreateLines: buildLineCreator('CreateLines',MeshBuilder.CreateLines),
    CreateDashedLines: buildLineCreator('CreateDashedLines',MeshBuilder.CreateDashedLines),
    CreateGround: buildGroundCreator('CreateGround',MeshBuilder.CreateGround),
    CreateGroundFromHeightMap: buildGroundCreator('CreateGroundFromHeightMap',MeshBuilder.CreateGroundFromHeightMap),
    CreateGoldberg: buildGoldbergCreator('CreateGoldberg',MeshBuilder.CreateGoldberg),
} 

Builder.CreateSphere('bob', { diameter: 1}, new Scene(new Engine(new HTMLCanvasElement)))
Builder.CreateBox('bob', { size: 1}, new Scene(new Engine(new HTMLCanvasElement)))


