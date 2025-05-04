import { Engine } from "@babylonjs/core";

export const createResizableEngine = (window: Window) => (canvas: HTMLCanvasElement): Engine => {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
  window.addEventListener('resize', () => {
    engine.resize();
  });
  return engine;
}