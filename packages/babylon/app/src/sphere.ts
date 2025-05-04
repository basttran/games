import { Color3, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { doCreateColorMaterial } from "./material";

export const setupSphere = (scene: Scene) => {
  const createColorMaterial = doCreateColorMaterial(scene);
  const ball = MeshBuilder.CreateSphere("ball", { diameter: 1}, scene);
  ball.position = new Vector3(0,5,0);
  ball.material = createColorMaterial(new Color3(1,0,0,))
  return scene;
}