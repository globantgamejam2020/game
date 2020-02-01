import { ObjectState } from "./transformations";

function vanish_center(obj: ObjectState): void {
    obj[1][1] = undefined;
}

function vanish_corners(obj: ObjectState): void {
    obj[0][0] = undefined;
    obj[0][2] = undefined;
    obj[2][0] = undefined;
    obj[2][2] = undefined;
}

function vanish_row(obj: ObjectState, row: number): void {
    for (let i = 0; i < 3; i++) {
        obj[row][i] = undefined;
    }
}

function vanish_col(obj: ObjectState, col: number): void {
    for (let i = 0; i < 3; i++) {
        obj[i][col] = undefined;
    }
}

function vanish_row_0(obj: ObjectState): void {
    return vanish_row(obj, 0);
}

function vanish_row_1(obj: ObjectState): void {
    return vanish_row(obj, 1);
}

function vanish_row_2(obj: ObjectState): void {
    return vanish_row(obj, 2);
}

function vanish_col_0(obj: ObjectState): void {
    return vanish_col(obj, 0);
}

function vanish_col_1(obj: ObjectState): void {
    return vanish_col(obj, 1);
}

function vanish_col_2(obj: ObjectState): void {
    return vanish_col(obj, 2);
}

const rotate = (state: ObjectState, times: number) => {
    const timesNeeded = times % 4;
    for (let i = 0; i < timesNeeded; i += 1) rotateOnce(state)
}

const rotateOnce = (matrix: ObjectState) => {
    for (let i = 0; i < 2; i++) {
        const value = matrix[0][i];
        matrix[0][i] = matrix[2 - i][0];
        matrix[2 - i][0] = matrix[2][2 - i];
        matrix[2][2 - i] = matrix[i][2]
        matrix[i][2] = value
    }
}