"use strict";
function vanish_center(obj) {
    obj[1][1] = undefined;
}
function vanish_corners(obj) {
    obj[0][0] = undefined;
    obj[0][2] = undefined;
    obj[2][0] = undefined;
    obj[2][2] = undefined;
}
function vanish_row(obj, row) {
    for (let i = 0; i < 3; i++) {
        obj[row][i] = undefined;
    }
}
function vanish_col(obj, col) {
    for (let i = 0; i < 3; i++) {
        obj[i][col] = undefined;
    }
}
function vanish_row_0(obj) {
    return vanish_row(obj, 0);
}
function vanish_row_1(obj) {
    return vanish_row(obj, 1);
}
function vanish_row_2(obj) {
    return vanish_row(obj, 2);
}
function vanish_col_0(obj) {
    return vanish_col(obj, 0);
}
function vanish_col_1(obj) {
    return vanish_col(obj, 1);
}
function vanish_col_2(obj) {
    return vanish_col(obj, 2);
}
const rotate = (state, times) => {
    const timesNeeded = times % 4;
    for (let i = 0; i < timesNeeded; i += 1)
        rotateOnce(state);
};
const rotateOnce = (matrix) => {
    for (let i = 0; i < 2; i++) {
        const value = matrix[0][i];
        matrix[0][i] = matrix[2 - i][0];
        matrix[2 - i][0] = matrix[2][2 - i];
        matrix[2][2 - i] = matrix[i][2];
        matrix[i][2] = value;
    }
};
