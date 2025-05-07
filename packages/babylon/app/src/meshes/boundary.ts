import { Color3, CSG, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { doCreateColorMaterial } from "../material";

export const setupBoundary = (scene: Scene) => {
    const createColorMaterial = doCreateColorMaterial(scene);

    const boundary = MeshBuilder.CreateBox(`boundary`, {
      width: 20,
      height: 3,
      depth: 20,
    }, scene);
    boundary.position = new Vector3(0, 1.5, 0);

    const boundaryCSG = CSG.FromMesh(boundary)

    const space = MeshBuilder.CreateBox(`space`, {
        width: 18,
        height: 3,
        depth: 18,
      }, scene);
      space.position = new Vector3(0, 1.5, 0);

    const spaceCSG = CSG.FromMesh(space)

    const material = createColorMaterial(new Color3(0.5,0,0.5));
    const roomCSG = boundaryCSG.subtract(spaceCSG);
    const room = roomCSG.toMesh('room', material, scene);
    room.checkCollisions = true;
    space.dispose();
    boundary.dispose();
    return scene
  }