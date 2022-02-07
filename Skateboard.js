import * as THREE from 'three';

function main() {

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
  
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 1;
  
    const scene = new THREE.Scene();

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
    material.side = THREE.DoubleSide;

    const boardLength = 0.81280162560;
    const boardWidth = 0.20955041910;
    const lipLength = boardWidth/2;
    const crease = boardLength/2 - lipLength;
    const drop = crease - 0.04;
    const edgeHeight = 0.01587503175;
    const edgeDepth = (boardWidth/2) * 5/6;
    const lipRise = 0.05397510795;

    var quartVerts = [
    [[0, edgeHeight, boardWidth/2],[drop, edgeHeight, boardWidth/2],[crease, edgeHeight, boardWidth/2],
        [Math.cos(5*Math.PI/12)*lipLength + crease, Math.cos(5*Math.PI/12)*lipRise, Math.sin(5*Math.PI/12)*lipLength],
        [Math.cos(Math.PI/3)*lipLength + crease, Math.cos(Math.PI/3)*lipRise, Math.sin(Math.PI/3)*lipLength],
        [Math.cos(Math.PI/4)*lipLength + crease, Math.cos(Math.PI/4)*lipRise, Math.sin(Math.PI/4)*lipLength],
        [Math.cos(Math.PI/6)*lipLength + crease, Math.cos(Math.PI/6)*lipRise, Math.sin(Math.PI/6)*lipLength],
        [Math.cos(Math.PI/12)*lipLength + crease, Math.cos(Math.PI/12)*lipRise, Math.sin(Math.PI/12)*lipLength],
        [boardLength/2, (boardLength/2 - crease) * lipRise, 0]],
    [[0, edgeHeight * 2/3, edgeDepth],[drop, edgeHeight * 2/3, edgeDepth],[crease, edgeHeight * 5/6, edgeDepth],[(Math.cos(5*Math.PI/12)*lipLength)*3/4 + crease, (Math.cos(5*Math.PI/12)*3/4)*lipRise, (Math.sin(5*Math.PI/12)*lipLength)*3/4]],
    [[0, 0, 0],[drop, 0, 0],[crease, 0, 0]]]; 

    var tris = [
        [quartVerts[2][0], quartVerts[2][1], quartVerts[1][0]],
        [quartVerts[2][1], quartVerts[1][1], quartVerts[1][0]],
        [quartVerts[1][0], quartVerts[1][1], quartVerts[0][0]],
        [quartVerts[1][1], quartVerts[0][1], quartVerts[0][0]],
        [quartVerts[2][1], quartVerts[2][2], quartVerts[1][1]],
        [quartVerts[2][2], quartVerts[1][2], quartVerts[1][1]],
        [quartVerts[1][1], quartVerts[1][2], quartVerts[0][1]],
        [quartVerts[1][2], quartVerts[0][2], quartVerts[0][1]],
        [quartVerts[1][2], quartVerts[1][3], quartVerts[0][2]],
        [quartVerts[1][3], quartVerts[0][3], quartVerts[0][2]],
        [quartVerts[2][2], quartVerts[1][3], quartVerts[1][2]],
        [quartVerts[2][2], quartVerts[0][4], quartVerts[0][3]],
        [quartVerts[2][2], quartVerts[0][5], quartVerts[0][4]],
        [quartVerts[2][2], quartVerts[0][6], quartVerts[0][5]],
        [quartVerts[2][2], quartVerts[0][7], quartVerts[0][6]],
        [quartVerts[2][2], quartVerts[0][8], quartVerts[0][7]]
    ]


    const positions = [];
    for (const tri of tris) {
        positions.push(tri[0]);
        positions.push(tri[1]);
        positions.push(tri[2]);
    }
    for (const tri of tris) {
        positions.push(-tri[0]);
        positions.push(tri[1]);
        positions.push(tri[2]);
    }
    for (const tri of tris) {
        positions.push(-tri[0]);
        positions.push(tri[1]);
        positions.push(-tri[2]);
    }
    for (const tri of tris) {
        positions.push(tri[0]);
        positions.push(tri[1]);
        positions.push(-tri[2]);
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
