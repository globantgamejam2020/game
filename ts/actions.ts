enum Actions {
    // Desvanecer partes de la matriz.
    vanish_center,
    vanish_corners,
    vanish_row_0,
    vanish_row_1,
    vanish_row_2,
    vanish_col_0,
    vanish_col_1,
    vanish_col_2,

    // Rotar partes de la matriz
    rotate_90,
    rotate_180,
    rotate_270,

    // Cambiar la distribucion de los switches.
    change_switches_distribution
}

function vanish_center(obj: ObjectState): void {
    obj[1][1] = false;
}

function vanish_corners(obj: ObjectState): void {
    obj[0][0] = false;
    obj[0][2] = false;
    obj[2][0] = false;
    obj[2][2] = false;
}

function vanish_row(obj: ObjectState, row: number): void {
    for(let i = 0; i < 3; i++) {
        obj[row][i] = false;
    }
}

function vanish_col(obj: ObjectState, col: number): void {
    for(let i = 0; i < 3; i++) {
        obj[i][col] = false;
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
