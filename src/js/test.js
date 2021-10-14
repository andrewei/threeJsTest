const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const loader = new THREE.TextureLoader();

const material = new THREE.MeshPhongMaterial( { map: loader.load("../../../resources/textures/wall.jpg") } );
const objects = [[]];


const gridSize = 5;
for (let i = -gridSize; i <= gridSize; i++) {
    const objectLine = [];
    for (let j = -gridSize; j <= gridSize; j++) {
        let object;
        if(i%2 === 0 && j%2 === 0) {
            object = new THREE.PointLight( 0x0505AA, 2.2, 10, 0.3 );
        }
        else {
            object = new THREE.Mesh(geometry, material);
        }
        object.position.x = i * 5;
        object.position.y = j * 5;
        object.position.z = Math.sin(j * i) * 10;
        scene.add(object);
        objectLine.push(object);
    }
    objects.push(objectLine);
}

const spotLight = new THREE.AmbientLight(0x404040, 0.6 ); // soft white light
scene.add( spotLight );

camera.position.z = 25;
let zoomOut = true;

const animate = function () {

    requestAnimationFrame( animate );


    let speedX = Math.sin(camera.position.z -17.5);
    let speedY = Math.cos(camera.position.z -17.5);

    if(zoomOut) {
        objects.forEach((cubeLine, i) => {
            cubeLine.forEach((cube, j) => {
                cube.rotation.x += speedX/20;
                cube.rotation.y += speedY/10;
                //cube.position.z += Math.sin(i*j) *0.05;
            })
        })


        camera.position.z += 0.01;
        camera.position.x += speedX/20 ;
        camera.position.y += speedY/10;

        if(camera.position.z > 20) {
            zoomOut = false;
        }
    }
    else {
        objects.forEach((cubeLine, i) => {
            cubeLine.forEach((cube, j) => {
                cube.rotation.x += speedX/20;
                cube.rotation.y += speedY/10;
                //cube.position.z -= Math.sin(i*j) * 0.05;
            })
        })
        camera.position.z -= 0.01;
        camera.position.x += speedX/20;
        camera.position.y -= speedY/10;
        if(camera.position.z < 10) {
            zoomOut = true;
        }
    }

    renderer.render( scene, camera );
};

animate();