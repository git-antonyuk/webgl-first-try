import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('https://i.imgur.com/tympSEc.jpeg');

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereGeometry(1, 80, 80);

// Materials
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.5;
material.roughness = 0.8;
material.normalMap = normalTexture;
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lightsr
const pointLight = new THREE.PointLight(0x0066ff, 0.1)
pointLight.position.x = -1
pointLight.position.y = -2
pointLight.position.z = 1
pointLight.intensity = 1;
scene.add(pointLight)


const pointLight2 = new THREE.PointLight(0xF78606, 0.2)
pointLight2.position.set(1,1,1);
pointLight2.position.x = 2
pointLight2.position.y = 3
pointLight2.position.z = 2
pointLight2.intensity = 1;
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xF70606, 0.2)
pointLight3.position.set(1,1,1);
pointLight3.position.x = -1
pointLight3.position.y = -1
pointLight3.position.z = 3
pointLight3.intensity = 1;
scene.add(pointLight3)

// gui.add(pointLight2.position, 'x').min(-3).max(3).step(0.01);
// gui.add(pointLight2.position, 'y').min(-6).max(6).step(0.01);
// gui.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
// gui.add(pointLight2, 'intensity').min(0).max(10).step(0.01);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth  / 2;
const windowHalfY = window.innerHeight  / 2;
const onMouseMove = () => {
    mouseX = event.clientX  - windowHalfX
    mouseY = event.clientY -  windowHalfY
}

document.addEventListener('mousemove', onMouseMove)
const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .8 * elapsedTime;
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
    // sphere.rotation.x += .05 * (targetY - sphere.rotation.x);
    // sphere.rotation.z += -.05 * (targetY - sphere.rotation.x);
    // sphere.rotation.z = .7 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()