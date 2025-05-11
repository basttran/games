import { CannonJSPlugin, Scene, Vector3 } from "@babylonjs/core";
import * as CANNON from 'cannon';
import { MeshWithPhysicsBuilder } from "./meshes/builders";

export const setupPhysics = (scene: Scene) => {
  scene.enablePhysics(
    new Vector3(0, -9.81, 0),
    new CannonJSPlugin(true, 10, CANNON)
  );
  return scene;
}

export const setupImpostors = (scene: Scene) => {
  const ground = MeshWithPhysicsBuilder.CreateGround("ground", { width: 20, height: 20}, { mass: 0, friction: 0, restitution: 0.5}, scene);
  const sphere = MeshWithPhysicsBuilder.CreateSphere('sphere', { diameter: 4}, { mass: 1, friction: 0, restitution: 0.8}, scene );
  sphere.position = new Vector3(0,15,1)
  const box = MeshWithPhysicsBuilder.CreateBox('box', { size: 2}, { mass: 1, friction: 0, restitution: 0.6}, scene);
  box.position = new Vector3(0,10,0);
  
  return scene;
}
 



