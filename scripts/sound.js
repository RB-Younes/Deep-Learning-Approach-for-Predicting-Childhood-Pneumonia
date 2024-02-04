//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


let width = 860;
let height = 800;
console.log(width/height)
//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//Keep track of the mouse position, so we can make the eye move
let mouseX = width/ 2;
let mouseY = height/ 2;


//Keep the 3D object on a global variable so we can access it later
let object;
let object1;
let object2;
//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'lungs';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `3D models/Audio/spectogram.glb`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.scale.set(0.85,0.85,0.85);
    object.position.set(0.14, -0.6, 0);
  
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

loader.load(
  `3D models/Audio/stetoscope ori.glb`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object1 = gltf.scene;
    object1.scale.set(0.5,0.5,0.5);
    object1.position.set(0.8, 0.9, -0.1);
    var axis = new THREE.Vector3(1,0,0)
    object1.rotateOnAxis(axis,1.75)
    scene.add(object1);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

loader.load(
  `3D models/Audio/h4n_pro_audio_recorder.glb`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object2 = gltf.scene;
    object2.scale.set(0.0027,0.0027,0.0027);
    object2.position.set(-0.9, 0.7, -0.1);
    scene.add(object2);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(width, height);

//Add the renderer to the DOM
document.getElementById("container3D-3").appendChild(renderer.domElement);


//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "lungs" ?  2 : 500;

//Add lights to the scene, so we can actually see the 3D model
const faceLight = new THREE.DirectionalLight(0xffffff, 0.5); // (color, intensity)
faceLight.position.set(0, 0, 5) //top-left-ish
faceLight.castShadow = false;
scene.add(faceLight);

const leftLight = new THREE.DirectionalLight(0xffffff, 0.5); // (color, intensity)
leftLight.position.set(-5, 0, 0) //top-left-ish
leftLight.castShadow = false;
scene.add(leftLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.5); // (color, intensity)
backLight.position.set(0, 0, -5) //top-left-ish
backLight.castShadow = false;
scene.add(backLight);

const rightLight = new THREE.DirectionalLight(0xffffff, 0.5); // (color, intensity)
rightLight.position.set(5, 0, 0) //top-left-ish
rightLight.castShadow = false;
scene.add(rightLight);

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5);
scene.add( ambientLight );

scene.background = new THREE.Color( 0xf6dbff );

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "lungs") {
  controls = new OrbitControls(camera, renderer.domElement);
  // to disable zoom
  controls.enabled = false;
}

const Btn1 = document.querySelector("#BTNMIC");
const Btn2 = document.querySelector("#BTNSTET");
const Btn3 = document.querySelector("#BTNRSPEC");

let rad = 0;
let rad1 = 0;
let rad2 = 0;
let radIncrement = 0.01;
var axis = new THREE.Vector3(0,1,0);
let rotate = false;
let rotate1 = false;
let rotate2 = false;
Btn1.addEventListener("click", () => {
  if (!rotate) {
    rotate = true;
  }
  else{
    rotate = false;
  }
});
var axiss = new THREE.Vector3(0,0,1);
Btn2.addEventListener("click", () => {
  if (!rotate1) {
    rotate1 = true;
  }
  else{
    rotate1 = false;
  }
});

Btn3.addEventListener("click", () => {
  if (!rotate2) {
    rotate2 = true;
  }
  else{
    rotate2 = false;
  }
});
//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  //Make the eye move
  if (rotate && object2) {
      rad += radIncrement;
    object2.rotateOnAxis(axis,radIncrement);

    renderer.render(scene, camera);
  }
  if (rotate1 && object1) {
    rad1 += radIncrement;
  object1.rotateOnAxis(axiss,radIncrement);

  renderer.render(scene, camera);
}
if (rotate2 && object) {
  rad2 += radIncrement;
object.rotateOnAxis(axis,radIncrement);

renderer.render(scene, camera);
}
renderer.render(scene, camera);
}


//Start the 3D rendering
requestAnimationFrame(animate);


