import { Engine, IPointerEvent, Scene } from "@babylonjs/core";
import { pipe } from "fp-ts/function";
import { composeScene, compositions } from "./compose";

export const runGame = (engine: Engine) => {
  const scene = pipe(
    new Scene(engine),
    composeScene(compositions.basic)
  );

  scene.onPointerDown = ({ button }: IPointerEvent) => {
    if (button === 0) { engine.enterPointerlock()}
    if (button === 1) { engine.exitPointerlock()}
  }

  engine.runRenderLoop(() => {
    scene.render();
  });
}