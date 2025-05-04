import { ActionManager, Color3, CSG, IncrementValueAction, InterpolateValueAction, MeshBuilder, Scene, SetValueAction, Vector3 } from "@babylonjs/core";
import { doCreateColorMaterial } from "./material";


export  const setupBoxes = (scene: Scene) => {
    const xes = [-4, 0, 4];
    const zes = [-4, 0, 4];
  
    scene.actionManager = new ActionManager(scene);
    const positions = xes.flatMap((x) => zes.map((z) => ({x, y: 0.5, z}))).flat()
  
    positions.forEach((position) => {
        
        const doToggleTexture = () => {
          const createColorMaterial = doCreateColorMaterial(scene);
          const textures = [
            createColorMaterial(new Color3(0,0,1)),
            createColorMaterial(new Color3(0.5,0,0.5))
          ]
          let currentTextureIndex = 0;

          return () => {
              if (currentTextureIndex === textures.length -1) {
                  currentTextureIndex = 0;
              } else {
                  currentTextureIndex += 1;
              }
              return textures[currentTextureIndex]
          }
      }

        const toggleTexture = doToggleTexture()
        const { x, y, z } = position;
        const box = MeshBuilder.CreateBox(`box-${x}-${y}-${z}`, { width: 1, height: 1, depth: 1}, scene);
        box.position = new Vector3(x, y, z);
        box.material = toggleTexture();
        box.checkCollisions = true;
        box.actionManager = new ActionManager(scene);
        scene.actionManager.registerAction(new IncrementValueAction(ActionManager.OnEveryFrameTrigger, box, "rotation.y", 0.05))
        box.actionManager.registerAction(
            new SetValueAction(
                ActionManager.OnLeftPickTrigger,
                box,
                "material",
                toggleTexture()
            )
        )?.then(
            new SetValueAction(
                ActionManager.OnLeftPickTrigger,
                box,
                "material",
                toggleTexture()
            )
        )
        box.actionManager.registerAction(
            new InterpolateValueAction(
                ActionManager.OnPointerOverTrigger,
                box,
                "visibility",
                0.5
            )
        )
        box.actionManager.registerAction(
            new InterpolateValueAction(
                ActionManager.OnPointerOutTrigger,
                box,
                "visibility",
                1
            )
        )
        box.actionManager.registerAction(new IncrementValueAction(
            ActionManager.OnEveryFrameTrigger,
            box,
            "rotation.y",
            0.05
        ))
    })
    return scene;
  }