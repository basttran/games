import {
  AbstractMesh,
  FreeCamera,
  KeyboardInfo,
  Mesh,
  Ray,
  Scene,
  Vector3,
} from '@babylonjs/core';

export const doPlayerController = (player: Mesh) => {
  const SPEED = 10;
  const state = {
    forward: false,
    backward: false,
    rotateLeft: false,
    rotateRight: false,
    strifeLeft: false,
    strifeRight: false,
    strife: false,
  };

  return {
    keyboard: {
      registerInputs: (e: KeyboardInfo) => {
        const { event, type } = e;
        if (event.key.toLowerCase() === 'z') {
          state.forward = type === 1;
        }
        if (event.key.toLowerCase() === 's') {
          state.backward = type === 1;
        }
        if (event.key.toLowerCase() === 'q') {
          state.rotateLeft = type === 1;
        }
        if (event.key.toLowerCase() === 'd') {
          state.rotateRight = type === 1;
        }
        if (event.key.toLowerCase() === 'a') {
          state.strifeLeft = type === 1;
        }
        if (event.key.toLowerCase() === 'e') {
          state.strifeRight = type === 1;
        }
        if (event.key === ' ') {
          // console.log('jump');
        }
      },
    },
    player: {
      move: () => {
        if (state.strifeLeft) {
          player.movePOV(0.1, 0, 0);
        }
        if (state.rotateLeft) {
          player.rotation.y -= 0.1;
        }
        if (state.strifeRight) {
          player.movePOV(-0.1, 0, 0);
        }
        if (state.rotateRight) {
          player.rotation.y += 0.1;
        }
        if (state.forward) {
          player.movePOV(0, 0, -0.1);
        }
        if (state.backward) {
          player.movePOV(0, 0, 0.1);
        }
      },
    },
  };
};
export const doJumpPlayerController = (player: Mesh, scene: Scene) => {
  // const SPEED = 10;
  // const GRAVITY = -9.81;
  // const JUMP_FORCE = 0.8;
  // const DELTA_TIME = scene.getEngine().getDeltaTime() / 1000.0;

  const UP = new Vector3(0, 1, 0);
  const DOWN = new Vector3(0, -1, 0);
  const RIGHT = new Vector3(1, 0, 0);
  const LEFT = new Vector3(-1, 0, 0);
  const FRONT = new Vector3(0, 0, 1);
  const BACK = new Vector3(0, 0, -1);

  const state = {
    forward: false,
    backward: false,
    up: false,
    down: false,
    rotateLeft: false,
    rotateRight: false,
    strifeLeft: false,
    strifeRight: false,
    jump: false,
    isGrounded: false,
  };

  // https://playground.babylonjs.com/#NWZLEV#1
  // const floorRaycast = (player: Mesh, scene: Scene) => {
  //   const groundRaycastPosition = new Vector3(
  //     player.position.x,
  //     player.position.y - 0.5,
  //     player.position.z
  //   );
  //   const ray = new Ray(groundRaycastPosition, Vector3.Up().scale(-1), 0.1);

  //   const predicate = (mesh: AbstractMesh) =>
  //     mesh.isPickable && mesh.isEnabled();

  //   const pick = scene.pickWithRay(ray, predicate);
  //   if (pick?.hit) {
  //     return pick.pickedPoint;
  //   } else {
  //     return Vector3.Zero();
  //   }
  // };
  return {
    keyboard: {
      registerInputs: (e: KeyboardInfo) => {
        const { event, type } = e;
        if (event.key.toLowerCase() === 'z') {
          state.forward = type === 1;
        }
        if (event.key.toLowerCase() === 's') {
          state.backward = type === 1;
        }
        if (event.key.toLowerCase() === 'q') {
          state.rotateLeft = type === 1;
        }
        if (event.key.toLowerCase() === 'd') {
          state.rotateRight = type === 1;
        }
        if (event.key.toLowerCase() === 'a') {
          state.strifeLeft = type === 1;
        }
        if (event.key.toLowerCase() === 'e') {
          state.strifeRight = type === 1;
        }
        if (event.key.toLowerCase() === 't') {
          state.up = type === 1;
        }
        if (event.key.toLowerCase() === 'g') {
          state.down = type === 1;
        }
        if (event.key === ' ') {
          state.jump = type === 1;
        }
      },
    },
    player: {
      move: () => {
        if (state.strifeLeft) {
          player.moveWithCollisions(RIGHT.scale(-0.05));
        }
        if (state.strifeRight) {
          player.moveWithCollisions(RIGHT.scale(0.05));
        }
        if (state.rotateLeft) {
          player.rotation.y -= 0.05;
        }
        if (state.rotateRight) {
          player.rotation.y += 0.05;
        }
        if (state.forward) {
          player.moveWithCollisions(FRONT.scale(0.05));
          const { x, y, z } = player.position;
          console.log('pos', { x, y, z });
        }
        if (state.backward) {
          player.moveWithCollisions(FRONT.scale(-0.05));
        }
        if (state.up) {
          // console.log(player.up.clone().y);
          // player.position.y = player.position.y + 0.05;
          // const updatedPlayer = player.moveWithCollisions(
          //   new Vector3(0, 0.1, 0)
          // );
          // const { x, y, z } = updatedPlayer.position;
          // console.log('updatedPlayer: ', { x, y, z });
          // console.log('player.position.y: ', UP.add(player.position.clone()));
        }
        if (state.down) {
          // console.log(player.up.clone().scale(-1).y);
          // player.position.y = player.position.y - 0.05;
          // const updatedPlayer = player.moveWithCollisions(
          //   new Vector3(0, -0.1, 0)
          // );
          // const { x, y, z } = updatedPlayer.position;
          // console.log('updatedPlayer: ', { x, y, z });
          // console.log('player.position.y: ', DOWN.add(player.position.clone()));
        }
      },
    },
  };
};
export const doCameraController = (player: FreeCamera) => {
  const SPEED = 10;
  const state = {
    forward: false,
    backward: false,
    rotateLeft: false,
    rotateRight: false,
    strifeLeft: false,
    strifeRight: false,
    strife: false,
  };

  return {
    keyboard: {
      registerInputs: (e: KeyboardInfo) => {
        const { event, type } = e;
        if (event.key.toLowerCase() === 'z') {
          state.forward = type === 1;
        }
        if (event.key.toLowerCase() === 's') {
          state.backward = type === 1;
        }
        if (event.key.toLowerCase() === 'q') {
          state.rotateLeft = type === 1;
        }
        if (event.key.toLowerCase() === 'd') {
          state.rotateRight = type === 1;
        }
        if (event.key.toLowerCase() === 'a') {
          state.strifeLeft = type === 1;
        }
        if (event.key.toLowerCase() === 'e') {
          state.strifeRight = type === 1;
        }
        if (event.key === ' ') {
          // console.log('jump');
        }
      },
    },
    player: {
      move: () => {
        if (state.strifeLeft) {
          // player.movePOV(0.1, 0,0)
        }
        if (state.rotateLeft) {
          player.rotation.y -= 0.1;
        }
        if (state.strifeRight) {
          // player.movePOV(-0.1, 0,0)
        }
        if (state.rotateRight) {
          player.rotation.y += 0.1;
        }
        if (state.forward) {
          // player.movePOV(0, 0, -0.1)
        }
        if (state.backward) {
          // player.movePOV(0, 0, 0.1)
        }
      },
    },
  };
};
