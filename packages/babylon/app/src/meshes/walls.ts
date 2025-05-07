import { Color3, CSG, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { doCreateColorMaterial } from "../material";
    
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