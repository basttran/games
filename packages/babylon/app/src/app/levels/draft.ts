import { CannonJSPlugin, Color3, CubeTexture, Engine, FreeCamera, HemisphericLight, IPointerEvent, MeshBuilder, PBRMaterial, PhysicsImpostorParameters, Scene, UniversalCamera, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Image } from "@babylonjs/gui";
import * as CANNON from 'cannon';
import { crosshairImage } from "../../assets/crosshair";

const GRAVITY = -9.81;
const FRAMES_PER_SECOND = 60;
const GRAVITY_VECTOR = new Vector3(0, -9.81, 0);
const ENVIRONMENT_TEXTURE_PATH: string = `${process.env.PUBLIC_URL}/textures/environment/street.env`;
const GROUND_DIMENSIONS = new Vector3(50, 1, 50);
const GROUND_TEXTURE = { name: 'stone', uvScale: 4 };
const GROUND_PHYSICS: PhysicsImpostorParameters = {
  mass: 0,
  restitution: 0,
};
export const loadLevel = async (scene: Scene, engine: Engine) => {

  scene.gravity = new Vector3(0, GRAVITY / FRAMES_PER_SECOND, 0);
  scene.collisionsEnabled = true;
  scene.enablePhysics(GRAVITY_VECTOR, new CannonJSPlugin(true, 10, CANNON));
  const envTex = CubeTexture.CreateFromPrefilteredData(ENVIRONMENT_TEXTURE_PATH, scene);
  scene.environmentTexture = envTex;
  scene.createDefaultSkybox(envTex, true);
  const hemisphericLightPosition = new Vector3(0,10,0);
  const light = new HemisphericLight('hemi1', hemisphericLightPosition, scene);
  light.intensity = 10
  const hemisphericLightColor = new Color3(.8,.3,.3)
  light.diffuse = hemisphericLightColor;
  light.specular = hemisphericLightColor;
  const groundMaterialColor = new Color3(.8, .2,.2)
  const groundMaterial = new PBRMaterial(groundMaterialColor.toHexString(), scene)
  groundMaterial.albedoColor = groundMaterialColor;
  const ground = MeshBuilder.CreateGround('ground', { width:50, height: 50}, scene);
  ground.material = groundMaterial;
  const cameraPosition = new Vector3(0,1,0);
  const cameraTarget = new Vector3(0,1,0);
  const cameraMinZ = 0.01;
  const camera = new FreeCamera('camera', cameraPosition, scene)
  camera.setTarget(cameraTarget);
  camera.minZ = cameraMinZ
    // const { mouse, keyboard, player } = doPlayerController(body, head);
    // scene.onPointerMove = mouse.handleMove;
    // scene.onKeyboardObservable.add(keyboard.registerInputs);
    // scene.registerBeforeRender(() => player.move());
    enablePointerLock(scene, engine, () => {});
  };

  const enablePointerLock = (
    scene: Scene,
    engine: Engine,
    handleLockedPointerDown: (pointerDownEvent: IPointerEvent) => void
  ) => {
    scene.onPointerDown = (event) => {
      if (!engine.isPointerLock && event.button === 0) {
        engine.enterPointerlock();
        showUI(event); // makes skybox disappear ??!
        return;
      }
      handleLockedPointerDown(event);
    };
  };

  const showCrossHair = (event: IPointerEvent) => {
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    const crosshair = new Image('crosshair', crosshairImage);
    crosshair.width = event.target.width / 1000;
    crosshair.height = event.target.height / 1000;
    crosshair.alpha = 0.5;
    advancedTexture.addControl(crosshair);
  };
  
  const showUI = (event: IPointerEvent) => {
    showCrossHair(event);
  };


