import { CannonJSPlugin, Mesh, MeshBuilder, PhysicsImpostor, PhysicsImpostorParameters, Scene, Tuple, Vector3 } from "@babylonjs/core";
import { name } from "@babylonjs/gui";
import * as CANNON from 'cannon';
import * as A from 'fp-ts/Array';
import * as R from 'fp-ts/Record';
import * as T from 'fp-ts/Tuple';
import { pipe } from "fp-ts/lib/function";
import { ReadableStreamDefaultController } from "stream/web";

export const setupPhysics = (scene: Scene) => {
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new CannonJSPlugin(true, 10, CANNON)
  );
  return scene;
}

export const setupImpostors = (scene: Scene) => {
  // const box = MeshBuilder.CreateBox('box', { size: 2});
  // box.position = new Vector3(0,10,0);
  // box.physicsImpostor = new PhysicsImpostor(
  //   box,
  //   PhysicsImpostor.BoxImpostor,
  //   { mass: 1, friction: 0, restitution: 0.6}
  // );
  
  
  const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20});
  ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0.5});
  
  // const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 3});
  // sphere.position = new Vector3(0,13,0.5);
  // sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0, restitution: 0.8});

  // const ImposturedMeshBuilder = buildImposturedMeshBuilder(scene);

  // const box2 = ImposturedMeshBuilder.CreateBox(['box2', { size: 5}], { mass: 1, friction: 0, restitution: 0.5});
  // box2.position = new Vector3(0,8,1.5);

  // return scene
}

type ImposturableMesh =
  | 'Box'
  | 'Sphere'
  | 'Plane'
  | 'Capsule'
  | 'Cylinder'
  | 'Disc'
  | 'Polyhedron'
  | 'IcoSphere'
  // | 'TiledBox'
  // | 'TiledPlane'
  // | 'Geodesic'
  // | 'Goldberg'
  // | 'TiledGround'
  // | 'Ribbon'
  // | 'Torus'
  // | 'TorusKnot'
  // | 'LineSystem'
  // | 'Lines'
  // | 'DashedLines'
  // | 'Lathe'
  // | 'Ground'
  // | 'GroundFromHeightMap'
  // | 'Polygon'
  // | 'Tube'
  // | 'Decal'
  // | 'Text'

// const ImpostorableMeshBuilder = pipe(
//   MeshBuilder,
//   // R.keys,
//   // A.filter((key) => key.startsWith('Create')),
//   R.keys,
//   A.map(
//     ((key) => {
//       const creator = MeshBuilder[key];
//       // type CreatorType = typeof creator;
      
//       return (meshArguments: [Parameters<typeof MeshBuilder[typeof key]>]) => {
//         const mesh = creator(...meshArguments as const)
//         // const ar0gs = (new Array(creator.length)).map((_value, index) => meshArguments[index]);
//         // const params = [...meshArguments] as Parameters<CreatorType>
//       }
//     })
//   )


// )



// const buildImposturedMeshBuilder = (scene: Scene) => {
//   // const imposturableMeshes: ImposturableMesh[] = ['Box', 'Sphere', 'Plane', 'Capsule', 'Cylinder'];

//   const builders: Record<keyof typeof MeshBuilder, ([typeof MeshBuilder.CreateBox, number] | [typeof MeshBuilder.CreateCylinder, number])> = {
//     CreateBox: [MeshBuilder.CreateBox, PhysicsImpostor.BoxImpostor],
//     CreateSphere: [MeshBuilder.CreateSphere, PhysicsImpostor.SphereImpostor],
//     CreateCylinder: [MeshBuilder.CreateCylinder, PhysicsImpostor.CylinderImpostor],
//     CreateCapsule: [MeshBuilder.CreateCapsule, PhysicsImpostor.CapsuleImpostor],
//     CreatePlane: [MeshBuilder.CreatePlane, PhysicsImpostor.PlaneImpostor],
//     CreateDisc: [MeshBuilder.CreateDisc, PhysicsImpostor.NoImpostor],
//     CreateIcoSphere: [MeshBuilder.CreateIcoSphere, PhysicsImpostor.NoImpostor],
//     CreatePolyhedron: [MeshBuilder.CreatePolyhedron, PhysicsImpostor.NoImpostor],

//     // CreateTiledBox: [MeshBuilder.CreateTiledBox, PhysicsImpostor.NoImpostor],
//     // CreateGeodesic: [MeshBuilder.CreateGeodesic, PhysicsImpostor.NoImpostor],
//     // CreateGoldberg: [MeshBuilder.CreateGoldberg, PhysicsImpostor.NoImpostor],
//     // CreateTiledPlane: [MeshBuilder.CreateTiledPlane, PhysicsImpostor.NoImpostor],

//     // CreateTiledGround: [MeshBuilder.CreateTiledGround, PhysicsImpostor.NoImpostor],
//     // CreateRibbon: [MeshBuilder.CreateRibbon, PhysicsImpostor.NoImpostor],
//     // CreateTorus: [MeshBuilder.CreateTorus, PhysicsImpostor.NoImpostor],
//     // CreateTorusKnot: [MeshBuilder.CreateTorusKnot, PhysicsImpostor.NoImpostor],
//     // CreateLineSystem: [MeshBuilder.CreateLineSystem, PhysicsImpostor.NoImpostor],
//     // CreateLines: [MeshBuilder.CreateLines, PhysicsImpostor.NoImpostor],
//     // CreateDashedLines: [MeshBuilder.CreateDashedLines, PhysicsImpostor.NoImpostor],
//     // CreateLathe: [MeshBuilder.CreateLathe, PhysicsImpostor.NoImpostor],
//     // CreateGround: [MeshBuilder.CreateGround, PhysicsImpostor.NoImpostor],
//     // CreateGroundFromHeightMap: [MeshBuilder.CreateGroundFromHeightMap, PhysicsImpostor.NoImpostor],
//     // CreatePolygon: [MeshBuilder.CreatePolygon, PhysicsImpostor.NoImpostor],
//     // CreateTube: [MeshBuilder.CreateTube, PhysicsImpostor.NoImpostor],
//     // CreateDecal: [MeshBuilder.CreateDecal, PhysicsImpostor.NoImpostor],
//     // CreateText: [MeshBuilder.CreateText, PhysicsImpostor.NoImpostor],
//     // ExtrudePolygon: [MeshBuilder.ExtrudePolygon, PhysicsImpostor.NoImpostor],
//     // ExtrudeShape: [MeshBuilder.ExtrudeShape, PhysicsImpostor.NoImpostor],
//     // ExtrudeShapeCustom: [MeshBuilder.ExtrudeShapeCustom, PhysicsImpostor.NoImpostor],
//   };

//   return pipe(
//     builders,
//     R.map(([builder, impostor]) => {
//       return (
//         meshOptions: [...Parameters<typeof builder>],
//         impostorOption: PhysicsImpostorParameters,
//       ) =>  {
//         if (typeof builder === typeof MeshBuilder.CreateBox) {
//           const imposturedMesh = builder(...meshOptions);
//           imposturedMesh.physicsImpostor = new PhysicsImpostor(imposturedMesh, impostor, impostorOption);
//           return imposturedMesh;
//         } else {
//           console.log('typeof builder: ', typeof builder);
//         }
//       }}
//     )
//   )
// }

