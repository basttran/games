import { Color3, MeshBuilder, Scene } from "@babylonjs/core";
import { doCreateColorMaterial } from "./material";

export const setupGround = (scene: Scene) => {
  const createColorMaterial = doCreateColorMaterial(scene);
  const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20}, scene);
  ground.material = createColorMaterial(new Color3(0,1,0));
  ground.checkCollisions = true;
  return scene;
}