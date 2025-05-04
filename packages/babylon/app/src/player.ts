import { Color3, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { doCreateColorMaterial } from "./material";
import { doPlayerController } from "./controls";

export const setupPlayer = (scene: Scene) => {
    const createColorMaterial = doCreateColorMaterial(scene);
    const box = MeshBuilder.CreateBox(`player`, { width: 1, height: 1, depth: 1}, scene);
    box.position = new Vector3(0, 0.5, -2);
    box.material = createColorMaterial(new Color3(1,0,0));
    box.checkCollisions = true;    
    const { keyboard , player } = doPlayerController(box);
    scene.onKeyboardObservable.add(keyboard.registerInputs);
    scene.registerBeforeRender(() => player.move());

    return scene;
  }