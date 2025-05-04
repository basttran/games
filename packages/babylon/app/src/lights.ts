import { HemisphericLight, Scene, Vector3 } from "@babylonjs/core";

export const setupLights = (scene: Scene) => {
  const hemiLight = new HemisphericLight("hemilight", new Vector3(0,3,0), scene);
  hemiLight.intensity = 0.8;
  return scene;
}



