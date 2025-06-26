import { Engine } from "@babylonjs/core";
import { pipe } from "fp-ts/function";
import * as O from 'fp-ts/Option';
import { useEffect } from "react";
import { getCanvas } from "../canvas";
import { createResizableEngine } from "../engine";
import { runLoop } from "../loop";
export const GameScreen = () => {


  useEffect(() => {
    const runGameLoop = async (engine: Engine) => await runLoop(engine);
    pipe(
      getCanvas(document),
      O.map(createResizableEngine(window)),
      O.map(runGameLoop)
    )
  });

  return (
    <main>
      <canvas id='game'></canvas>
    </main>
  );
}
