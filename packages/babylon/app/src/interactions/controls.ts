import * as O from 'fp-ts/Option';
import {
  AbstractMesh,
  FreeCamera,
  KeyboardInfo,
  Mesh,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { pipe } from 'fp-ts/lib/function';

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
          console.log('jump');
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

export const doPlayerWithVelocityController = (player: Mesh) => {
  const ROTATION_SPEED = 1.5;
  const TRANSLATION_SPEED = 3;
  const state = {
    forward: false,
    backward: false,
    rotateLeft: false,
    rotateRight: false,
    strifeLeft: false,
    strifeRight: false,
    strife: false,
    jump: false,
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
          state.jump = type === 1;
        }
      },
    },
    player: {
      move: () => {
        if (!player.physicsImpostor) {
          return;
        }
        const velocity = state.jump
          ? 5
          : pipe(
              player.physicsImpostor.getLinearVelocity(),
              O.fromNullable,
              O.map((vector) => vector.y),
              O.getOrElse(() => 0)
            );

        const forwardComponent = state.forward
          ? player.forward.scale(1)
          : Vector3.Zero();
        const backwardComponent = state.backward
          ? player.forward.scale(-1)
          : Vector3.Zero();
        const strifeLeftComponent = state.strifeLeft
          ? player.right.scale(-1)
          : Vector3.Zero();
        const strifeRightComponent = state.strifeRight
          ? player.right.scale(1)
          : Vector3.Zero();

        const translation = forwardComponent.add(
          backwardComponent.add(strifeLeftComponent.add(strifeRightComponent))
        );
        player.physicsImpostor.setLinearVelocity(
          translation.scale(TRANSLATION_SPEED).add(player.up.scale(velocity))
        );

        const rotateLeftCompenent = state.rotateLeft
          ? new Vector3(0, -1, 0)
          : Vector3.Zero();
        const rotateRightCompenent = state.rotateRight
          ? new Vector3(0, 1, 0)
          : Vector3.Zero();
        const rotation = rotateLeftCompenent.add(rotateRightCompenent);
        player.physicsImpostor.setAngularVelocity(
          rotation.scale(ROTATION_SPEED)
        );

        state.jump = false;
      },
    },
  };
};
export const doStablePlayerWithVelocityController = (
  player: Mesh,
  scene: Scene
) => {
  const ROTATION_SPEED = 0.05;
  const TRANSLATION_SPEED = 3;
  const state = {
    forward: false,
    backward: false,
    rotateLeft: false,
    rotateRight: false,
    strifeLeft: false,
    strifeRight: false,
    strife: false,
    jump: false,
    canJump: false,
    inAir: false,
    direction: Vector3.Zero(),
  };

  const groundDetector = MeshBuilder.CreateBox('groundDetector', {
    width: 1,
    depth: 1,
    height: 0.1,
  });
  groundDetector.parent = player;
  groundDetector.position.y = player.getBoundingInfo().boundingBox.minimum._y;

  const possibleGrounds = scene.meshes.filter(
    (mesh) => mesh.name.startsWith('box') || mesh.name === 'ground'
  );

  scene.registerBeforeRender(() => {
    state.canJump = possibleGrounds.some((possibleGround) =>
      groundDetector.intersectsMesh(possibleGround)
    );
    state.inAir = !state.canJump;
  });

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
        if (event.key === ' ' && state.canJump) {
          state.jump = type === 1;
        }
      },
    },
    player: {
      move: () => {
        if (!player.physicsImpostor) {
          return;
        }
        const velocity = state.jump
          ? 5
          : pipe(
              player.physicsImpostor.getLinearVelocity(),
              O.fromNullable,
              O.map((vector) => vector.y),
              O.getOrElse(() => 0)
            );

        const forwardComponent = state.forward
          ? player.forward.scale(1)
          : Vector3.Zero();
        const backwardComponent = state.backward
          ? player.forward.scale(-1)
          : Vector3.Zero();
        const strifeLeftComponent = state.strifeLeft
          ? player.right.scale(-1)
          : Vector3.Zero();
        const strifeRightComponent = state.strifeRight
          ? player.right.scale(1)
          : Vector3.Zero();

        if (!state.inAir) {
          state.direction = forwardComponent.add(
            backwardComponent.add(strifeLeftComponent.add(strifeRightComponent))
          );
        }

        player.physicsImpostor.setLinearVelocity(
          state.direction
            .scale(TRANSLATION_SPEED)
            .add(player.up.scale(velocity))
        );

        const rotateLeftCompenent = state.rotateLeft
          ? new Vector3(0, -1, 0)
          : Vector3.Zero();
        const rotateRightCompenent = state.rotateRight
          ? new Vector3(0, 1, 0)
          : Vector3.Zero();
        const rotation = rotateLeftCompenent.add(rotateRightCompenent);

        // TODO should rotate inAir but keep same trajectory
        player.rotation = player.rotation.add(rotation.scale(ROTATION_SPEED));

        state.jump = false;
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
          console.log('jump');
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
