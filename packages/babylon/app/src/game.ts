import { Engine, Scene } from '@babylonjs/core';
import { pipe } from 'fp-ts/function';
import { composeScene, compositions } from './compose';

export const runGame = (engine: Engine) => {
  const scene = pipe(new Scene(engine), composeScene(compositions.basicJump));

  engine.runRenderLoop(() => {
    scene.render();
  });
};
