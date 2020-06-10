function createMatrix(width, height, init = 0) {
    var matrix = new Array(height);
    for (let i = 0; i < height; i++) {
        matrix[i] = new Array(width);
        for (let j = 0; j < width; j++) {
            matrix[i][j] = init;
        }
    }
    return matrix;
}
function matrixInit(matrix, value = 0) {
    for (let i = 0; i < spaceH + 2; i++) {
        for (let j = 0; j < spaceW + 2; j++) {
            matrix[i][j] = value;
        }
    }
}
function matrixToMatrix(matrix, toMatrix) {
    // if (matrix.length != toMatrix.length || matrix[0].length != toMatrix[0].length) throw '兩矩陣不同大小';
    for (let i = 0; i < spaceH + 2; i++) {
        for (let j = 0; j < spaceW + 2; j++) {
            toMatrix[i][j] = matrix[i][j];
        }
    }
}

var space;
var newSpace;
var spaceW = 0;
var spaceH = 0;
function bigBang(w, h) {
    var boundary = 1;
    spaceW = w;
    spaceH = h;
    space = createMatrix(w + boundary * 2, h + boundary * 2);
    newSpace = createMatrix(w + boundary * 2, h + boundary * 2);
}

function createLife(x, y) {
    if (x == 0 || y == 0 || x == spaceW || y == spaceH) {
        console.log('邊界不能存活生命');
        return;
    }
    if (x > spaceW || y > spaceH) {
        console.log('創造生命超出空間');
        return;
    }
    x++, y++;
    space[y][x] = 1;
}
function randomCreateLife(density, isClear = true) {
    if (isClear) matrixInit(space);
    for (let i = density; i > 0; i--) {
        var x = Math.floor(Math.random() * spaceW) + 1;
        var y = Math.floor(Math.random() * spaceH) + 1;
        space[y][x] = 1;
    }
}

function killLife(x, y) {
    x++, y++;
    space[y][x] = 0;
}

function timeForward() {
    var sum = 0;
    for (let i = 1; i < space.length - 1; i++) {
        for (let j = 1; j < space[0].length - 1; j++) {
            for (let k = -1; k < 2; k++) {
                for (let l = -1; l < 2; l++) {
                    sum += space[i + k][j + l];
                }
            }
            newSpace[i][j] = space[i][j] ? sum < 3 ? 0 : sum > 4 ? 0 : space[i][j] : sum == 3 ? 1 : 0; // rule
            sum = 0;
        }
    }
    matrixToMatrix(newSpace, space);
}

var timer;
var isRun;
var delay;
var times;
var remainingTimes;
var progress = "▷ ●────────────────────";
function run(delay, times, isDisplay = false) {
    isRun = true;
    remainingTimes = times;
    timer = setInterval(() => {
        clearColoringMark();
        timeForward();
        baseColoringMark();
        if (isDisplay) {
            display();
        }
        console.log(`${progress} %c%s s`, 'color: #50DEBB',remainingTimes != undefined ? remainingTimes * delay / 1000 : '∞');
        if (remainingTimes % (times / 20) == 0) {
            progress = progress.replace('─', '━');
        }
        if (remainingTimes != undefined && --remainingTimes == 0) {
            clearInterval(timer);
        }
        
    }, delay);
}
function stop() {
    isRun = false;
    clearInterval(timer);
}

function display() {
    for (let row = 1; row < spaceH + 1; row++) {
        var str = ''
        for (let column = 1; column < spaceW + 1; column++) {
            str += space[row][column] + ' ';
        }
        console.log(str);
    }
    console.log();
}

/** 著色標記 */
const stableState = [
    [
        [0,0,0,0,-1],
        [0,1,1,0,0,],
        [0,1,0,1,0,],
        [0,0,1,0,0,],
        [-1,0,0,0,-1]
    ],
    [
        [-1,-1,0,0,0,-1],
        [-1,0,0,1,0,0],
        [0,0,1,0,1,0],
        [0,1,0,0,1,0],
        [0,0,1,1,0,0,],
        [-1,0,0,0,0,-1]
    ]
];
const stableState_symmetry = [
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [-1,0,0,0,-1],
        [0,0,1,0,0],
        [0,1,0,1,0],
        [0,0,1,0,0],
        [-1,0,0,0,-1]
    ],
    [
        [-1,0,0,0,0,-1],
        [0,0,1,1,0,0],
        [0,1,0,0,1,0],
        [0,0,1,1,0,0],
        [-1,0,0,0,0,-1]
    ],
    [
        [-1,0,0,0,-1],
        [0,0,1,0,0],
        [0,1,0,1,0],
        [0,1,0,1,0],
        [0,0,1,0,0],
        [-1,0,0,0,-1]
    ],
    [
        [-1,0,0,0,0,-1],
        [0,0,1,1,0,0],
        [0,1,0,0,1,0],
        [0,1,0,0,1,0],
        [0,0,1,1,0,0],
        [-1,0,0,0,0,-1]
    ],
    [
        [-1,0,0,0,0],
        [0,0,1,1,0],
        [0,1,0,1,0],
        [0,1,1,0,0],
        [0,0,0,0,-1]
    ],
    [
        [0,0,0,0,-1],
        [0,1,1,0,0],
        [0,1,0,1,0],
        [0,0,1,1,0],
        [-1,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0],
        [0,1,1,0,1,0],
        [0,1,0,1,1,0],
        [0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0],
        [0,1,0,1,1,0],
        [0,1,1,0,1,0],
        [0,0,0,0,0,0]
    ]
];

const cycleState = [
    [
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
    ],
    [
        [0,0,0],
        [0,1,0],
        [0,1,0],
        [0,1,0],
        [0,0,0]
    ]
];
const movingState = [
    [
        [0,0,0,-1,-1],
        [0,1,0,0,0],
        [0,0,1,1,0],
        [0,1,1,0,0],
        [0,0,0,0,-1]
    ],
    [
        [-1,0,0,0,0],
        [-1,0,1,0,0],
        [0,0,0,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,1,0,1,0],
        [0,0,1,1,0],
        [-1,0,1,0,0],
        [-1,0,0,0,-1]
    ],
    [
        [-1,-1,0,0,0],
        [0,0,0,1,0],
        [0,1,0,1,0],
        [0,0,1,1,0],
        [-1,0,0,0,0]
    ]
];

// a3d is array of 3d.
function coloringMark(a3d, mark, isRotate = false) {
    function findSameAsStateMap(stateMap, mark) {
        stateMap.forEach(state => {
            for (let i = 0; i < space.length - state.length; i++) {
                for (let j = 0; j < space[0].length - state[0].length; j++) {
                    var sample = getPartOfMatrix(space, j, i, state[0].length, state.length);
                    if(isSame(state, sample)) {
                        matrixAddMatrix(space, state, mark, j, i, true);
                    }
                }
            }
        });
    }
    function fourDirections(stateMap, mark) {
        findSameAsStateMap(stateMap, mark);
        findSameAsStateMap(reverseAlongXAxis(stateMap), mark);
        findSameAsStateMap(reverseAlongYAxis(stateMap), mark);
        findSameAsStateMap(reverseAlongXAxis(stateMap), mark);
    }
    if (isRotate == true) {
        fourDirections(a3d, mark);
    } else {
        findSameAsStateMap(a3d, mark);
    }
}

function baseColoringMark() {
    coloringMark(stableState_symmetry, 1);
    coloringMark(stableState, 1, true);
    coloringMark(cycleState, 2);
    coloringMark(movingState, true, 3);
}

function clearColoringMark() {
    space.forEach((row, i)=> {
        row.forEach((column, j) => {
            if (column > 1) space[i][j] = 1;
        });
    });
}

function getPartOfMatrix(matrix, x, y, w, h) {
    var part = [];
    for (let row = 0; row < h; row++) {
        part.push(matrix[y + row].slice(x , x + w));
    }
    return part;
}

// [-1]為忽略
function isSame(matrix1 , matrix2) {
    if (matrix1.length == matrix2.length && matrix1[0].length != matrix2[0].length) return false;
    for (let k = 0; k < matrix1.length; k++) {
        for (let l = 0; l < matrix1[0].length; l++) {
            if (matrix1[k][l] != -1 && matrix2[k][l] != matrix1[k][l]) return false;
        }
    }
    return true;
}

// matrix1[any] = -1 不做計算(忽略)
function matrixAddMatrix(matrix1, matrix2, timesConstant, x = 0, y = 0, overwrite = false) {
    var result = overwrite ? matrix1 : matrix1.concat();
    var row = [];
    // if (x + y == 0 && matrix1.length == matrix2.length && matrix1[0].length != matrix2[0].length) throw '矩陣大小不一無法相加';
    for (let k = 0; k < matrix2.length; k++) {
        for (let l = 0; l < matrix2[0].length; l++) {
            row.push(matrix2[k][l] == -1 ? matrix1[k + y][l + x] : (matrix1[k + y][l + x] + matrix2[k][l] ) * timesConstant);
        }
        result[k + y].splice(x, row.length, ...row.splice(0, row.length));
    }
    if (!overwrite) return result;
}

function reverseAlongYAxis(matrix) {
    matrix.forEach((state, i) => {
        state.forEach((row, j) => {
            matrix[i][j] = row.reverse();
        });
    });
    return matrix;
}
function reverseAlongXAxis(matrix) {
    matrix.forEach((state, i) => {
        matrix[i] = state.reverse();
    });
    return matrix;
}


/** p5 */

var cols;
var rows;
var resolution;

function setup() {
    createCanvas(700, 700);
    cols = width / resolution;
    rows = height / resolution;
    bigBang(cols, rows);
    randomCreateLife(2000);
    run(delay);
}

function keyPressed() {
    if (keyCode === 32 && isRun == false) {
        run(delay, remainingTimes);
        progress = progress.replace('❚❚', '▷');
        console.log(progress);
    } else if (keyCode === 32) {
        stop();
        progress = progress.replace('▷', '❚❚');
        console.log(progress);
    }
    if (keyCode === 39) {
        delay += 100;
        stop();
        run(delay, remainingTimes);
        console.log(`>> %c${delay / 1000}s`, 'color: #50DEBB');
    }
    if (keyCode === 37) {
        delay -= 100;
        if (delay < 0) {
            delay = 0;
        }
        stop();
        run(delay, remainingTimes);
        console.log(`<< %c${delay / 1000}s`, 'color: #50DEBB');
    }
}

function draw() {
    background(0);
    for (let i = 1; i < rows - 1; i++) {
        for (let j = 1; j < cols - 1; j++) {
            let x = j * resolution;
            let y = i * resolution;
            var v = space[i][j];
            if (v == 0) {
                fill(255);
                stroke(255);
                rect(x, y, resolution, resolution);
            }
            if (v == 2) {
                fill('#5536A3');
                rect(x, y, resolution, resolution);
            }
            if (v == 4) {
                fill('#BA3734');
                rect(x, y, resolution, resolution);
            }
            if (v == 6) {
                fill('#60B324');
                rect(x, y, resolution, resolution);
            }
        }
    }
}


var setting = (() => {
    delay = 200;
    resolution = 7;
})();
