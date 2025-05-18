import {
  Color4,
  IFontData,
  Mesh,
  MeshBuilder,
  Scene,
  Vector4,
} from '@babylonjs/core';

export const defaultFontData = {
  glyphs: {
    '~': {
      ha: 694,
      x_min: 0,
      x_max: 0,
      o: 'm 31 407 b 182 488 93 472 129 488 b 510 403 249 488 444 403 b 664 482 569 403 625 428 l 664 596 b 513 515 603 531 565 515 b 185 600 446 515 250 600 b 31 521 125 600 71 574 z ',
    },
  },
  familyName: 'Monofonto',
  ascender: 1333,
  descender: -333,
  underlinePosition: -185,
  underlineThickness: 28,
  boundingBox: { yMin: -333, xMin: -158, yMax: 1333, xMax: 792 },
  resolution: 1000,
  original_font_information: {
    format: 0,
    copyright:
      'Copyright (c) 1999-2022 Typodermic Fonts Inc. All rights reserved.',
    fontFamily: 'Monofonto',
    fontSubfamily: 'Regular',
    uniqueID: '5.003;TYPO;Monofonto-Regular',
    fullName: 'Monofonto-Regular',
    version: 'Version 5.003',
    postScriptName: 'Monofonto-Regular',
    trademark: 'Monofonto is a trademark of Typodermic Fonts Inc.',
    manufacturer: 'Ray Larabie',
    designer: 'Ray Larabie',
    designerURL: 'https://typodermicfonts.com',
    preferredFamily: 'Monofonto',
    preferredSubfamily: 'Regular',
  },
  cssFontWeight: 'normal',
  cssFontStyle: 'normal',
};

type ForcedCreateText = (
  name: string,
  text: string,
  fontData: IFontData,
  options?: {
    size?: number;
    resolution?: number;
    depth?: number;
    sideOrientation?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    perLetterFaceUV?: (letterIndex: number) => Vector4[];
    perLetterFaceColors?: (letterIndex: number) => Color4[];
  },
  scene?: Scene,
  earcutInjection?: any
) => Mesh;

export const ForceCreateText = (
  name: string,
  text: string,
  fontData: IFontData,
  options?: {
    size?: number;
    resolution?: number;
    depth?: number;
    sideOrientation?: number;
    faceUV?: Vector4[];
    faceColors?: Color4[];
    perLetterFaceUV?: (letterIndex: number) => Vector4[];
    perLetterFaceColors?: (letterIndex: number) => Color4[];
  },
  scene?: Scene,
  earcutInjection?: any
): Mesh => {
  return (MeshBuilder.CreateText as ForcedCreateText)(
    name,
    text || '~',
    fontData || defaultFontData,
    options,
    scene,
    earcutInjection
  );
};
