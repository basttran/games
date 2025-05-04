import { pipe } from "fp-ts/function";
import * as O from 'fp-ts/Option';
import { useEffect } from "react";
import { getCanvas } from "../canvas";
import { createResizableEngine } from "../engine";
import { createAndRenderScene } from "../scene";

export const GameScreen = () => {
  useEffect(() => {
    pipe(
      getCanvas(document),
      O.map(createResizableEngine(window)),
      O.map(createAndRenderScene)
    )
  });

  return (
    <main>
      <canvas id='game'></canvas>
    </main>
  );
}
