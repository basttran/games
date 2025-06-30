import {
  Engine,
  FreeCamera,
  HemisphericLight,
  KeyboardInfo,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
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
  mesh: PhysicsAggregate,
  speed: number,
  deltaTime: number
): void => {
  const totalRotation =
    (Number(state.rotateLeft) * -1 + Number(state.rotateRight)) * speed * 10;
  mesh.body.setAngularVelocity(new Vector3(0, totalRotation, 0));

  const medialVelocity = mesh.transformNode.forward.scale(
    Number(state.backward) * -1 + Number(state.forward)
  );
  const lateralVelocity = mesh.transformNode.right.scale(
    Number(state.strifeLeft) * -1 + Number(state.strifeRight)
  );
  // const altitudinalVelocity = mesh.transformNode.up.scale(
  //   -9.81 * 0.1
  //   // Number(state.down) * -1 + Number(state.up)
  // );
  const totalVelocity = medialVelocity.add(lateralVelocity);

  mesh.body.setLinearVelocity(totalVelocity.scale(speed).scale(deltaTime));
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

  const groundAggregate = new PhysicsAggregate(
    ground,
    PhysicsShapeType.BOX,
    { mass: 0 },
    scene
  );

  const box = MeshBuilder.CreateBox('box', { size: 1 }, scene);
  box.position = new Vector3(0, 0.5, 0);

  const boxAggregate = new PhysicsAggregate(
    box,
    PhysicsShapeType.BOX,
    { mass: 1 },
    scene
  );

  const camera = new FreeCamera('camera', new Vector3(0, 1, -10), scene);
  camera.setTarget(Vector3.Zero());

  const speed = 10;

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
      console.log('deltaTime: ', deltaTime);
      updatePlayerPosition(state, boxAggregate, speed, deltaTime);
      // updateWorld()
    },
    draw: (_timestepsLeft: number) => {
      scene.render();
    },
  };
};

const runLoop = async (engine: Engine) => {
  const scene = createScene(engine);
  const { update, draw } = await composeScene(scene);
  const maxFPS = 60;
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

export const runGameLoop = async (engine: Engine) => await runLoop(engine);
