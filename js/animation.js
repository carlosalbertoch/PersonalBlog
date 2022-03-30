console.clear();
console.log('hello')
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
//import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
console.log('inicializacion')
let canvas = document.getElementById('canvas');
let w=canvas.offsetWidth;
let h=canvas.offsetHeight;
console.log(w)
//canvas.offsetTop=300;
const scene = new THREE.Scene();
//scene.background=new THREE.Color('#000000')//#c2d1f0
const camera = new THREE.PerspectiveCamera( 70, w / h, 0.1, 1000 );
camera.position.z=5;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(new THREE.Color('#21282a'),1)
let left,bottom;
left = 0; bottom = 30; 
renderer.setSize( w, h);
renderer.setViewport (left,bottom,w,h);
canvas.appendChild( renderer.domElement );

//window.addEventListener('resize',() =>{
   // renderer.setSize(window.innerWidth, window.innerHeight);
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
//})

//aqui las luces
const light= new THREE.PointLight(0xFFFFFF,1,500);
light.position.set(10,0,25);
scene.add(light);


//aqui controles de mouse
document.addEventListener('mousemove',animateParticles)
let mouseX=0;
let mouseY=0;
function animateParticles(event){
    mouseX=event.clientX
    mouseY=event.clientY
}

//coordenadas
//const axesHelper = new THREE.AxesHelper( 2 );
//scene.add( axesHelper );

//aqui el objeto
const geometry = new THREE.TorusGeometry( 1.5,2.5,20,150);
const material= new THREE.PointsMaterial({
    size:0.015
});
const mesh = new THREE.Points(geometry,material);
scene.add(mesh);

//otra geometria
const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt=1000;
const posArray =new Float32Array(particlesCnt*3);
for (let i=0;i<particlesCnt*3; i++){
    posArray[i]=(Math.random()-0.5)*(Math.random()*5);
}
const material2= new THREE.PointsMaterial({
    size:0.018,
    color:"white"
});
const sphere=new THREE.Points(particlesGeometry,material2);
particlesGeometry.setAttribute('position',new THREE.BufferAttribute(posArray,3));
const particlesMesh=new THREE.Points(particlesGeometry,material2);
scene.add(sphere,particlesMesh);

//animacion del objeto1
const render=function(){
    requestAnimationFrame(render);

    particlesMesh.rotation.y-=0.01;
    mesh.rotation.x +=0.01;
    mesh.rotation.y = -mouseY*0.01;
    

    renderer.render(scene,camera);
}



//aqui el render
render();

