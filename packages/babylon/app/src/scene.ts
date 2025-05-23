import { Engine, IPointerEvent, Scene, Vector3 } from '@babylonjs/core';



export const setupPointerLock = (scene: Scene) => {
  scene.onPointerDown = ({ button }: IPointerEvent) => {
    const engine = scene.getEngine() as Engine;
    if (button === 0) {
      engine.enterPointerlock();
    }
    if (button === 1) {
      engine.exitPointerlock();
    }
  };
  return scene;
};
