// Any global variables can be defined up here
let CircleTurn = true;

const VALUEOPEN = 0;
const VALUEO = 1;
const VALUEX = 2;
let row1 = [0, 0, 0]
let row2 = [0, 0, 0]
let row3 = [0, 0, 0]


/*
    Code in the setup function will only be run once at the start of the animation
*/
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    // check for a winner
    let result = checkWin();
    if (result == VALUEO) {
        // O has won
    } else if (result == VALUEX) {
        // X has won
    } else {
        // on going game... do nothing
    }
    // Render
    drawBoard();
}


function mouseClicked() {
    // figure out which coordinate row the place the entity
    var row = 0;
    var column = 0;

    // figure out row
    if (mouseY <= height / 3) {
        row = 0;
    } else if (mouseY <= 2* height / 3) {
        row = 1;
    } else {
        row = 2;
    }

    // figure out column
    if (mouseX <= width / 3) {
        column = 0;
    } else if (mouseX <= 2 * width / 3) {
        column = 1;
    } else {
        column = 2;
    }

    // check if position is free
    if (!isPositionFree(column, row)) {
        // can't place a symbol here, exit
        return;
    }

    // draw Circle or X on position
    if (CircleTurn) {
        drawCircle(column * width / 3 + width / 6, row * height / 3 + height / 6);
        placeSymbolPosition(column, row, VALUEO);
    } else {
        drawX(column * width / 3, row * height / 3);
        placeSymbolPosition(column, row, VALUEX);
    }
    CircleTurn = !CircleTurn;
}


/* Functions responsible for drawing board and elements */

function drawCircle(x, y) {
    noFill();
    strokeWeight(8);
    if (width > height) {
        ellipse(x, y, height / 3 - 16, height / 3 - 16);
    } else {
        ellipse(x, y, width / 3 - 16, width / 3 - 16);
    }
}

function drawX(x, y) {
    strokeWeight(8);
    line(x, y, x + width / 3, y + height / 3);
    line(x, y + height / 3, x + width / 3, y);
}

function drawBoard() {
    strokeWeight(5);
    line(width / 3, 0, width / 3, height);
    line(2 * width / 3, 0, 2 * width / 3, height);
    line(0, height / 3, width, height / 3);
    line(0, 2 * height / 3, width, 2 * height / 3);
}

/* Functions responsible for checking board state */

function isPositionFree(column, row) {
    if (row == 0) {
        // check row1 array
        return row1[column] == VALUEOPEN;
    } else if (row == 1) {
        // check row2 array
        return row2[column] == VALUEOPEN;
    } else {
        // check row3 array
        return row3[column] == VALUEOPEN;
    }
}


function placeSymbolPosition(column, row, symbol) {
    if (row == 0) {
        row1[column] = symbol;
    } else if (row == 1) {
        row2[column] = symbol;
    } else {
        row3[column] = symbol;
    }
}


function checkWin() {
    // check horizontal
    if (row1[0] == row1[1] && row1[0] == row1[2] && row1[0] != VALUEOPEN) {
        return row1[0];
    }
    if (row2[0] == row2[1] && row2[0] == row2[2] && row2[0] != VALUEOPEN) {
        return row2[0];
    }
    if (row3[0] == row3[1] && row3[0] == row3[2] && row3[0] != VALUEOPEN) {
        return row3[0];
    }
    // check verticle
    if (row1[0] == row2[0] && row1[0] == row3[0] && row1[0] != VALUEOPEN) {
        return row1[0];
    }
    if (row1[1] == row2[1] && row1[1] == row3[1] && row1[1] != VALUEOPEN) {
        return row1[1];
    }
    if (row1[2] == row2[2] && row1[2] == row3[2] && row1[2] != VALUEOPEN) {
        return row1[2];
    }
    // check diagonals
    if (row1[0] == row2[1] && row1[0] == row3[2] && row1[0] != VALUEOPEN) {
        return row1[0];
    }
    if (row1[2] == row2[1] && row1[2] == row3[0] && row1[2] != VALUEOPEN) {
        return row1[2];
    }
    // no winner
    return false;
}
