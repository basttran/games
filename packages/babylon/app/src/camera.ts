import { FreeCamera, Scene, Vector3 } from "@babylonjs/core";
import { FreeCameraCustomMouseInput } from "./FreeCameraCustomMouseInput";

export const setupCamera = (scene: Scene) => {
    const camera = new FreeCamera("camera", new Vector3(0,0.5, -2), scene);
    camera.inputs.removeMouse();
    camera.inputs.add(new FreeCameraCustomMouseInput(false))
    camera.attachControl();
    camera.minZ = 0.45;
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.ellipsoid = new Vector3(1, 0.5, 1);
    camera.speed = 0.75;
    camera.angularSensibility = 4000;
    return scene;
}
