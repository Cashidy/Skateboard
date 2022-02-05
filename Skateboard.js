import * as THREE from 'three';

function main() {

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
  
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
  
    const scene = new THREE.Scene();
    
    const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    material.side = THREE.DoubleSide;

    var flatVs00 = [0.0000, 0.0000, 0.0000];
    var flatVs01 = [0.0000, 0.0100, 0.0800];
    var flatVs02 = [0.0000, 0.0159, 0.1048];
    var flatVs10 = [0.1650, 0.0000, 0.0000];
    var flatVs11 = [0.1650, 0.0100, 0.0800];
    var flatVs12 = [0.1650, 0.0159, 0.1408];
    var flatVs20 = [0.1969, 0.0127, 0.0000];
    var flatVs21 = [0.1969, 0.0127, 0.0800];
    var flatVs22 = [0.1969, 0.0159, 0.1048];

    var flatTris = [
    [flatVs00, flatVs10, flatVs01],
    [flatVs10, flatVs11, flatVs01],
    [flatVs10, flatVs20, flatVs11],
    [flatVs20, flatVs21, flatVs11],
    [flatVs01, flatVs11, flatVs02],
    [flatVs11, flatVs12, flatVs02],
    [flatVs11, flatVs21, flatVs12],
    [flatVs21, flatVs22, flatVs12]
    ]
    const positions = [];
    for (const tri of flatTris) {
        positions.push(...tri[0]);
        positions.push(...tri[1]);
        positions.push(...tri[2]);
    }

    const board = new THREE.BufferGeometry();
    board.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    board.computeVertexNormals();

    const skateBoard = new THREE.Mesh(board, material);

    scene.add(skateBoard);

    function render(time) {
        time *= 0.001;  // convert time to seconds
    
        skateBoard.rotation.x = time;
        skateBoard.rotation.y = time;
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
}

main();