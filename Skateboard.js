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
    //material.side = THREE.DoubleSide;

    var halfBoardLength = 0.4064;
    var halfBoardWidth = 0.1048;
    var boardRise = .0540;
    var boardThickness = .0095;

    var boardHeight = boardRise + boardThickness;
    var crease = halfBoardLength - halfBoardWidth;
    var midRiseX = (halfBoardLength + crease) / 2;
    var midRiseY = (boardHeight + boardThickness) / 2;

    var verts = [
        [[-halfBoardLength, boardHeight, halfBoardWidth/3],[-midRiseX, midRiseY, halfBoardWidth],[-crease, boardThickness, halfBoardWidth],[crease, boardThickness, halfBoardWidth],[midRiseX, midRiseY, halfBoardWidth],[halfBoardLength, boardHeight, halfBoardWidth/3]],
        [[-halfBoardLength, boardHeight, -halfBoardWidth/3],[-midRiseX, midRiseY, -halfBoardWidth],[-crease, boardThickness, -halfBoardWidth],[crease, boardThickness, -halfBoardWidth],[midRiseX, midRiseY, -halfBoardWidth],[halfBoardLength, boardHeight, -halfBoardWidth/3]],
        [[-halfBoardLength, boardRise, halfBoardWidth/3],[-midRiseX, boardRise/2, halfBoardWidth],[-crease, 0, halfBoardWidth],[crease, 0, halfBoardWidth],[midRiseX, boardRise/2, halfBoardWidth],[halfBoardLength, boardRise, halfBoardWidth/3]],
        [[-halfBoardLength, boardRise, -halfBoardWidth/3],[-midRiseX, boardRise/2, -halfBoardWidth],[-crease, 0, -halfBoardWidth],[crease, 0, -halfBoardWidth],[midRiseX, boardRise/2, -halfBoardWidth],[halfBoardLength, boardRise, -halfBoardWidth/3]]
    ]

    var tris = [
        //bottom
        [verts[3][0], verts[2][1], verts[3][1]],
        [verts[2][0], verts[2][1], verts[3][0]],
        [verts[3][1], verts[2][2], verts[3][2]],
        [verts[2][1], verts[2][2], verts[3][1]],
        [verts[3][2], verts[2][3], verts[3][3]],
        [verts[2][2], verts[2][3], verts[3][2]],
        [verts[3][3], verts[2][4], verts[3][4]],
        [verts[2][3], verts[2][4], verts[3][3]],
        [verts[3][4], verts[2][5], verts[3][5]],
        [verts[2][4], verts[2][5], verts[3][4]],
        //top
        [verts[1][0], verts[1][1], verts[0][1]],
        [verts[0][0], verts[1][0], verts[0][1]],
        [verts[1][1], verts[1][2], verts[0][2]],
        [verts[0][1], verts[1][1], verts[0][2]],
        [verts[1][2], verts[1][3], verts[0][3]],
        [verts[0][2], verts[1][2], verts[0][3]],
        [verts[1][3], verts[1][4], verts[0][4]],
        [verts[0][3], verts[1][3], verts[0][4]],
        [verts[1][4], verts[1][5], verts[0][5]],
        [verts[0][4], verts[1][4], verts[0][5]],
        //edge
        [verts[3][0], verts[1][1], verts[1][0]],
        [verts[3][0], verts[3][1], verts[1][1]],
        [verts[3][1], verts[1][2], verts[1][1]],
        [verts[3][1], verts[3][2], verts[1][2]],
        [verts[3][2], verts[1][3], verts[1][2]],
        [verts[3][2], verts[3][3], verts[1][3]],
        [verts[3][3], verts[1][4], verts[1][3]],
        [verts[3][3], verts[3][4], verts[1][4]],
        [verts[3][4], verts[1][5], verts[1][4]],
        [verts[3][4], verts[3][5], verts[1][5]],

        [verts[3][5], verts[0][5], verts[1][5]],
        [verts[3][5], verts[2][5], verts[0][5]],

        [verts[2][5], verts[0][4], verts[0][5]],
        [verts[2][5], verts[2][4], verts[0][4]],
        [verts[2][4], verts[0][3], verts[0][4]],
        [verts[2][4], verts[2][3], verts[0][3]],
        [verts[2][3], verts[0][2], verts[0][3]],
        [verts[2][3], verts[2][2], verts[0][2]],
        [verts[2][2], verts[0][1], verts[0][2]],
        [verts[2][2], verts[2][1], verts[0][1]],
        [verts[2][1], verts[0][0], verts[0][1]],
        [verts[2][1], verts[2][0], verts[0][0]],

        [verts[2][0], verts[1][0], verts[0][0]],
        [verts[2][0], verts[3][0], verts[1][0]]
    ]
    const positions = [];

    for (const tri of tris) {
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
