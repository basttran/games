import { Engine, Scene } from "@babylonjs/core";
import { useEffect } from "react";

const getCanvas = (): HTMLCanvasElement => {
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
};

export const GameScreen = () => {
  useEffect(() => {
    const canvas = getCanvas();
    if (canvas) {

      const engine = new Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
      window.addEventListener('resize', () => {
        engine.resize();
      });
      const scene = new Scene(engine);
      // engine.stopRenderLoop();
      // scene.dispose();

      engine.runRenderLoop(() => {
        scene.render();
      });
    }
  });

  return (
    <main>
      <canvas id='game'></canvas>
    </main>
  );
}
