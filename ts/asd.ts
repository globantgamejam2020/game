import {vanish_corners} from './actions';

const objetos = [
    {
        entrada: [
            [{color: 'black', active: true}, {color: 'black', active: true}, {color: 'black', active: true}],
            [{color: 'black', active: true}, {color: 'black', active: true}, {color: 'black', active: true}],
            [{color: 'black', active: true}, {color: 'black', active: true}, {color: 'black', active: true}]
        ],
        salida: [
            [{color: 'black', active: false}, {color: 'black', active: true}, {color: 'black', active: false}],
            [{color: 'black', active: false}, {color: 'black', active: true}, {color: 'black', active: false}],
            [{color: 'black', active: true}, {color: 'black', active: true}, {color: 'black', active: true}]
        ]
    },
    {
        entrada: [
            [{color: 'black', active: true}, {color: 'black', active: false}, {color: 'black', active: false}],
            [{color: 'black', active: true}, {color: 'black', active: false}, {color: 'black', active: false}],
            [{color: 'black', active: false}, {color: 'black', active: true}, {color: 'black', active: true}]
        ],
        salida: [
            [{color: 'black', active: true}, {color: 'black', active: true}, {color: 'black', active: false}],
            [{color: 'black', active: true}, {color: 'black', active: false}, {color: 'black', active: true}],
            [{color: 'black', active: false}, {color: 'black', active: true}, {color: 'black', active: true}]
        ]
    },
    {
        entrada: [
            [{color: 'black', active: false}, {color: 'black', active: false}, {color: 'black', active: true}],
            [{color: 'black', active: false}, {color: 'black', active: false}, {color: 'black', active: true}],
            [{color: 'black', active: true}, {color: 'black', active: true}, {color: 'black', active: true}]
        ],
        salida: [
            [{color: 'black', active: true}, {color: 'black', active: false}, {color: 'black', active: true}],
            [{color: 'black', active: true}, {color: 'black', active: false}, {color: 'black', active: true}],
            [{color: 'black', active: true}, {color: 'black', active: true}, {color: 'black', active: true}]
        ]
    }
];

//
let mapeoIdsCorte = [4, 5, 6, 7, 8, 9, 10, 11, 12].sort(() => Math.random() - 0.5);

function sumar(ids: number[]) {
    for (let id of ids) {
    }
}

function restar() {
}

type MaquinaRestaSuma = {
    opciones: [{ activo: boolean, accion: any, excluyente: any }]

    // Resto de los switches.
    variantes: [
        /*

        fila_0, fila_1, fila_2,
        col_0, col_1, col_2,


         */
        [{ activo: boolean, accion: any }, { activo: boolean, accion: any }, { activo: boolean, accion: any }],
        [{ activo: boolean, accion: any }, { activo: boolean, accion: any }, { activo: boolean, accion: any }],
        [{ activo: boolean, accion: any }, { activo: boolean, accion: any }, { activo: boolean, accion: any }]
    ]
}


let variantesRestaSuma = new Map([
    [[0, 0], vanish_corners]
]);
