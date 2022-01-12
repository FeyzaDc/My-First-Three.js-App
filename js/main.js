// Scene - Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Control
const controls = new THREE.OrbitControls( camera, renderer.domElement ); 

// 3D model
const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );
const loader = new THREE.GLTFLoader();
loader.load('model/scene.gltf', function ( gltf ) {
    var model = gltf.scene;
	scene.add(model);
    model.scale.set(.3, .3, .3);
});

// Texture on cube
const loader2 = new THREE.TextureLoader(); 
const materials = new THREE.MeshBasicMaterial({
  map: loader2.load('img/logo.jfif'),
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial(materials);

const cube1 = new THREE.Mesh( geometry, material );
cube1.position.x = 3;
scene.add( cube1 );

const cube2 = new THREE.Mesh( geometry, material );
cube2.position.x = -3;
scene.add( cube2 );

const geometry2 = new THREE.SphereGeometry( 50, 50, 50 );
const material2 = new THREE.MeshNormalMaterial({wireframe: true});
const sphere = new THREE.Mesh( geometry2, material2 );
//sphere.position.z = -50;
scene.add( sphere )

const geometry3 = new THREE.PlaneGeometry( 1, 1 );
const material3 = new THREE.MeshBasicMaterial( {color: 0x64ff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry3, material3 );
plane.position.y = -1.5;
plane.rotation.x = 4.71;
plane.scale.set(8,4,4);
scene.add( plane );

camera.position.z = 5.5;

var dxPerFrame = 0.03;
var dyPerFrame = 0.07;
var dyPerFrame2 = 0.07;
function animate() {
    renderer.render(scene, camera);

    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;

    cube1.position.y += dyPerFrame;
    if(cube1.position.y >  2) dyPerFrame = -0.07;
    if(cube1.position.y < -0.9) dyPerFrame =  0.07;

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;
    cube2.position.y += dyPerFrame;
    if(cube2.position.y >  2) dyPerFrame2 = -0.07;
    if(cube2.position.y < -0.9) dyPerFrame2 =  0.07;
    

    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;
    sphere.rotation.z += 0.001;

    plane.position.x += dxPerFrame;
    if(plane.position.x >  1) dxPerFrame = -0.03;
    if(plane.position.x < -1) dxPerFrame =  0.03;
    
    requestAnimationFrame(animate);    
};

animate();