import { pipe } from "fp-ts/function";
import * as O from 'fp-ts/Option';

export const getCanvas = (document: Document): O.Option<HTMLCanvasElement>  => {
  const canvas = O.fromNullable(document.getElementById('game') as HTMLCanvasElement);
  return pipe(
    canvas,
    O.map(setSizeFrom(window))
  )
};

export const setSizeFrom = (window: Window) => (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas
}