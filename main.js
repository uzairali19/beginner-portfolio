import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Mesh } from "three";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Background Image

const backgroudTexture = new THREE.TextureLoader().load("./night.jpeg");
scene.background = backgroudTexture;

// Objects
// Torus
const geometryTorus = new THREE.TorusGeometry(10, 3, 16, 100);
const materialTorus = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

const torus = new THREE.Mesh(geometryTorus, materialTorus);

scene.add(torus);

// Image Box

const uzairTexture = new THREE.TextureLoader().load("./uzair.jpeg");

const uzairMesh = new Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: uzairTexture })
);

scene.add(uzairMesh);

// Earth Sphere

const earthTexture = new THREE.TextureLoader().load("./earth.jpeg");
const normalTexture = new THREE.TextureLoader().load("./earthnormal.png");

const earthMesh = new Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({ map: earthTexture, normalMap: normalTexture })
);

earthMesh.position.z = 30;
earthMesh.position.x = -10;

scene.add(earthMesh);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(10, 20, 10);
scene.add(pointLight, ambientLight);

// Lighting Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);

// Add stars Function
function addStar() {
  const geometryStar = new THREE.SphereGeometry(0.25, 24, 24);
  const materialStar = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometryStar, materialStar);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

// Scroll Function

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earthMesh.rotation.x += 0.05;
  earthMesh.rotation.y += 0.075;
  earthMesh.rotation.z += 0.05;

  uzairMesh.rotation.x += 0.01;
  uzairMesh.rotation.z += 0.01;

  camera.position.z += t * -0.001;
  camera.position.x += t * -0.0002;
  camera.position.y += t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();
// Animate Function

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
