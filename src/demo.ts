import {
  Engine3D,
  Scene3D,
  Object3D,
  Camera3D,
  View3D,
  LitMaterial,
  BoxGeometry,
  MeshRenderer,
  DirectLight,
  HoverCameraController,
  AtmosphericComponent,
  Vector3
} from '@orillusion/core';

export default async function demo(){
  await Engine3D.init();
  // for following operations

  let scene3D = new Scene3D();

  // Add atmospheric scattering skybox component
  scene3D.addComponent(AtmosphericComponent);

  // Create a camera object
  let cameraObj = new Object3D();
  let camera = cameraObj.addComponent(Camera3D);
  // Set the camera perspective according to the window size
  camera.perspective(80, window.innerWidth / window.innerHeight, 1, 5000.0);
  // Set camera controller
  let controller = camera.object3D.addComponent(HoverCameraController);
  controller.setCamera(-40, 0, 10);
  // Add camera node to sence
  scene3D.addChild(cameraObj);

  // Create a light object
  let light = new Object3D();
  // Add direct light component
  let component = light.addComponent(DirectLight);
  // Adjust light parameters
  light.rotationX = 60;
  light.rotationY = 180;
  component.intensity = 2;
  // Add light node to sence
  scene3D.addChild(light);

  // Create a new object
  const cube = new Object3D();
  // Add MeshRenderer to object(obj)
  let cubeMr = cube.addComponent(MeshRenderer);
  // Set geometry
  cubeMr.geometry = new BoxGeometry(4, 9, 1);
  // Set material
  cubeMr.material = new LitMaterial();

  cubeMr.material.baseColor.r = 0;
  cubeMr.material.baseColor.g = 1;
  cubeMr.material.baseColor.b = 0;

  scene3D.addChild(cube);

  // Create a new object
  const floor = new Object3D();
  // Add MeshRenderer to object(obj)
  let floorMesh = floor.addComponent(MeshRenderer);
  // Set geometry
  floorMesh.geometry = new BoxGeometry(10000, 0, 10000);

  // Set material
  floorMesh.material = new LitMaterial();

  floor.transform.y = -4.5; 

  scene3D.addChild(floor);

  // Create View3D object
  let view = new View3D();
  // Specify the scene to render
  view.scene = scene3D;
  // Specify the camera to use
  view.camera = camera;
  // Start rendering
  Engine3D.startRenderView(view);

}
