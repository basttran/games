import {
  Engine,
  FreeCamera,
  HemisphericLight,
  KeyboardInfo,
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { setupHavokPhysics } from './physics';

const createScene = (engine: Engine): Scene => {
  const scene = new Scene(engine); //,
  return scene;
};

type State = {
  forward: boolean;
  backward: boolean;
  up: boolean;
  down: boolean;
  rotateLeft: boolean;
  rotateRight: boolean;
  strifeLeft: boolean;
  strifeRight: boolean;
  jump: boolean;
  isGrounded: boolean;
};

const updatePlayerPosition = (
  state: State,
  mesh: Mesh,
  speed: number,
  deltaTime: number
): void => {
  const totalRotation =
    (Number(state.rotateLeft) * -1 + Number(state.rotateRight)) * speed * 10;
  mesh.rotation.y += totalRotation;

  const medialVelocity = mesh.forward.scale(
    Number(state.backward) * -1 + Number(state.forward)
  );
  const lateralVelocity = mesh.right.scale(
    Number(state.strifeLeft) * -1 + Number(state.strifeRight)
  );
  const altitudinalVelocity = mesh.up.scale(
    -9.81 * 0.1
    // Number(state.down) * -1 + Number(state.up)
  );
  const totalVelocity = medialVelocity.add(
    lateralVelocity.add(altitudinalVelocity)
  );

  mesh.moveWithCollisions(totalVelocity.scale(speed).scale(deltaTime));
};

const updateControllerStateFromInputState = (scene: Scene, state: State) => {
  scene.onKeyboardObservable.add((e: KeyboardInfo) => {
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
    if (event.key.toLowerCase() === 'r') {
      state.up = type === 1;
    }
    if (event.key.toLowerCase() === 'f') {
      state.down = type === 1;
    }
  });
};

const panic = (delta: number) => {
  console.log('coucou PANIC');
  delta = 0;
  console.log('snap/smooth to authoritative state');
};

const composeScene = async (scene: Scene) => {
  // await setupAmmoPhysics(scene);
  await setupHavokPhysics(scene);

  const hemiLight = new HemisphericLight(
    'hemilight',
    new Vector3(0, 3, 0),
    scene
  );
  hemiLight.intensity = 0.8;
  const ground = MeshBuilder.CreateGround(
    'ground',
    { width: 3, height: 3 },
    scene
  );
  // ground.checkCollisions = true;

  const box = MeshBuilder.CreateBox('box', { size: 1 }, scene);
  box.position = new Vector3(0, 0.5, 0);
  // box.checkCollisions = true;
  box.ellipsoid.x = 0.5;
  box.ellipsoid.y = 0.5;
  box.ellipsoid.z = 0.5;
  const camera = new FreeCamera('camera', new Vector3(0, 1, -10), scene);
  camera.setTarget(Vector3.Zero());

  const speed = 0.001;

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

  updateControllerStateFromInputState(scene, state);

  return {
    update: (deltaTime: number) => {
      updatePlayerPosition(state, box, speed, deltaTime);
      // updateWorld()
    },
    draw: (timestepsLeft: number) => {
      console.log({ timestepsLeft });
      scene.render();
    },
  };
};

export const runLoop = async (engine: Engine) => {
  const scene = createScene(engine);
  const { update, draw } = await composeScene(scene);
  const maxFPS = 30;
  const timestep = 1000 / 60;

  let delta = 0;
  let lastFrameTimeMs = 0;
  let fps = 60;
  let framesThisSecond = 0;
  let lastFpsUpdate = 0;

  const mainLoop = (timestamp: number) => {
    if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
      requestAnimationFrame(mainLoop);
      return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    if (timestamp > lastFpsUpdate + 1000) {
      fps = 0.25 * framesThisSecond + 0.75 * fps;

      lastFpsUpdate = timestamp;
      framesThisSecond = 0;
    }
    framesThisSecond++;

    let updatesCounter = 0;
    while (delta >= timestep) {
      update(timestep);
      delta = delta - timestep;

      if (++updatesCounter >= 90) {
        panic(delta);
        break;
      }
    }
    draw(delta / timestamp);
    requestAnimationFrame(mainLoop);
  };

  requestAnimationFrame(mainLoop);
};
