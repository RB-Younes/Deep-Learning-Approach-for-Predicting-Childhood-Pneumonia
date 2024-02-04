//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


let width = 760;
let height = 800;
console.log(width/height)
//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//Keep track of the mouse position, so we can make the eye move
let mouseX = width/ 2;
let mouseY = height/ 2;


const Btn1 = document.querySelector("#BTN1");
const Btn2 = document.querySelector("#BTN2");
const Btn3 = document.querySelector("#BTN3");
const Btn4 = document.querySelector("#BTN4");
const BtnReset = document.querySelector("#BTNRESET");

//Keep the 3D object on a global variable so we can access it later
let object;


//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'lungs';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `3D models/lungs/all lungs.glb`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.scale.set(0.7,0.7,0.7);
    object.position.set(0, -0.15, 0)
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

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(width, height);

//Add the renderer to the DOM
document.getElementById("container3D-1").appendChild(renderer.domElement);


//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "lungs" ?  2 : 500;

//Add lights to the scene, so we can actually see the 3D model
const faceLight = new THREE.DirectionalLight(0xffffff, 2.5); // (color, intensity)
faceLight.position.set(0, 0, 5) //top-left-ish
faceLight.castShadow = false;
scene.add(faceLight);

const leftLight = new THREE.DirectionalLight(0xffffff, 2.5); // (color, intensity)
leftLight.position.set(-5, 0, 0) //top-left-ish
leftLight.castShadow = false;
scene.add(leftLight);

const backLight = new THREE.DirectionalLight(0xffffff, 2.5); // (color, intensity)
backLight.position.set(0, 0, -5) //top-left-ish
backLight.castShadow = false;
scene.add(backLight);

const rightLight = new THREE.DirectionalLight(0xffffff, 2.5); // (color, intensity)
rightLight.position.set(5, 0, 0) //top-left-ish
rightLight.castShadow = false;
scene.add(rightLight);

const ambientLight = new THREE.AmbientLight( 0xfbefff, 2.5);
scene.add( ambientLight );

scene.background = new THREE.Color( 0xf6dbff );

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "lungs") {
  controls = new OrbitControls(camera, renderer.domElement);
  // to disable zoom
  controls.enableRotate = false;
}


const group = new THREE.Group();

const zoomInTimeline = (x, y, z, zoomOutFactor = 0) => {
	let tl = gsap
		.timeline({ defaults: { duration: 2, ease: "expo.out" } })
		.to(controls.target, { x, y, z })
		.to(camera.position, { x, y, z: z + zoomOutFactor }, 0)
		.to(group.rotation, { x: 0, y: 0 }, 0);
};

Btn1.addEventListener("click", () => {
  zoomInTimeline(0.5, 0.3, 0, 0.5);
});
Btn2.addEventListener("click", () => {
  zoomInTimeline(0.3, 0.4, 0, 0.4);
});
Btn3.addEventListener("click", () => {
  zoomInTimeline(-0.2, -0.28, 0, 1.5);
});
Btn4.addEventListener("click", () => {
  zoomInTimeline(0.0, 0.5, 0, 0.6);
});
BtnReset.addEventListener("click", () => {
  zoomInTimeline(0.0, 0.0, 0.0, 2);
});

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  //Make the eye move
  if (object && objToRender === "lungs" ) {

  }

  renderer.render(scene, camera);
}


//Start the 3D rendering
requestAnimationFrame(animate);


