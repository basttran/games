import { Engine, Scene } from '@babylonjs/core';
import { pipe } from 'fp-ts/function';
import { composeScene, compositions } from './compose';

export const runGame = (engine: Engine) => {
  const scene = pipe(
    new Scene(engine),
    composeScene(compositions.stableVelocityPlayer)
  );

  // scene.onPointerDown = ({ button }: IPointerEvent) => {
  //   const engine = scene.getEngine() as Engine;
  //   if (button === 0) {
  //     engine.enterPointerlock();
  //   }
  //   if (button === 1) {
  //     engine.exitPointerlock();
  //   }
  // };

  engine.runRenderLoop(() => {
    scene.render();
  });
};
