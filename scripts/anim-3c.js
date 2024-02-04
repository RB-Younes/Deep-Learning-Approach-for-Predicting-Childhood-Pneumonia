//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


let width = 400;
let hight = 360;
console.log(width/hight)
//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, width / hight, 0.1, 1000);
//Keep track of the mouse position, so we can make the eye move
let mouseX = width/ 2;
let mouseY = hight/ 2;

//Keep the 3D object on a global variable so we can access it later
let object;
let object1;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'lungs';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `3D models/lungs/FabConvert.com_longen ondoorzichtig.glb`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.scale.set(0.5,0.5,0.5);
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
renderer.setSize(width, hight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "lungs" ?  2 : 500;

//Add lights to the scene, so we can actually see the 3D model
const faceLight = new THREE.DirectionalLight(0xb49aca, 1.2); // (color, intensity)
faceLight.position.set(0, 0, 5) //top-left-ish
faceLight.castShadow = false;
scene.add(faceLight);

const leftLight = new THREE.DirectionalLight(0xb49aca, 1.2); // (color, intensity)
leftLight.position.set(-5, 0, 0) //top-left-ish
leftLight.castShadow = false;
scene.add(leftLight);

const backLight = new THREE.DirectionalLight(0xb49aca, 1.2); // (color, intensity)
backLight.position.set(0, 0, -5) //top-left-ish
backLight.castShadow = false;
scene.add(backLight);

const rightLight = new THREE.DirectionalLight(0xb49aca, 1.2); // (color, intensity)
rightLight.position.set(5, 0, 0) //top-left-ish
rightLight.castShadow = false;
scene.add(rightLight);

const ambientLight = new THREE.AmbientLight( 0xb49aca, 0.8 );
scene.add( ambientLight );



//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "lungs") {
  controls = new OrbitControls(camera, renderer.domElement);
  // to disable zoom
  controls.enabled = false;
}

let translatespeed =0.005;
let rad = 0;
let radIncrement = 0.05;
var axis = new THREE.Vector3(0,1,0);
//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  //Make the eye move
  if (object && objToRender === "lungs" ) {
    rad += radIncrement;
   
    object.rotateOnAxis(axis,radIncrement);
    
    if (radIncrement <= 0.05) {
      radIncrement = 0.05
    }
    else{
      radIncrement = radIncrement /1.005;
    }

  }

  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = width / hight;
  camera.updateProjectionMatrix();
  renderer.setSize(width, hight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D rendering
requestAnimationFrame(animate);

