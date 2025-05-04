import { Color3, CSG, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { doCreateColorMaterial } from "./material";

export const setupGround = (scene: Scene) => {
    const createColorMaterial = doCreateColorMaterial(scene);
    const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20}, scene);
    ground.material = createColorMaterial(new Color3(0,1,0));
    ground.checkCollisions = true;
    return scene;
  }

  export const setupBall = (scene: Scene) => {
    const createColorMaterial = doCreateColorMaterial(scene);
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1}, scene);
    ball.position = new Vector3(0,5,0);
    ball.material = createColorMaterial(new Color3(1,0,0,))
    return scene;
  }
    
  export const setupWalls = (scene: Scene) => {
    const DIMENSIONS = {
      width: 18,
      height: 3,
      depth: 18,
    }
  
    const walls = [
      {
        position: {
          x: 0,
          y: 1.5,
          z: 9.5 
        },
        dimensions: {
          ...DIMENSIONS,
          depth: 1
        }
      },
      {
        position: {
          x: 0,
          y: 1.5,
          z: -9.5 
        },
        dimensions: {
          ...DIMENSIONS,
          depth: 1
        }
      },
      {
        position: {
          x: 9.5,
          y: 1.5,
          z: 0 
        },
        dimensions: {
          ...DIMENSIONS,
          width: 1
        }
      },
      {
        position: {
          x: -9.5,
          y: 1.5,
          z: 0 
        },
        dimensions: {
          ...DIMENSIONS,
          width: 1
        }
      },
  
    ]
  
    walls.forEach(({position, dimensions}) => {
      const createColorMaterial = doCreateColorMaterial(scene);
      console.log('position: ', position);
      
      const { x, y, z } = position;
      const wall = MeshBuilder.CreateBox(`wall-${x}-${y}-${z}`, dimensions, scene);
      wall.position = new Vector3(x, y, z);
      wall.material = createColorMaterial(new Color3(0.5,0,0.5))
    })
    return scene;
}

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
    const room = roomCSG.toMesh('lol', material, scene);
    room.checkCollisions = true;
    space.dispose();
    boundary.dispose();
    return scene
  }