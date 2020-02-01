"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Locations;
(function (Locations) {
    Locations[Locations["CENTER"] = 0] = "CENTER";
    Locations[Locations["CORNERS"] = 1] = "CORNERS";
    Locations[Locations["ROW_0"] = 2] = "ROW_0";
    Locations[Locations["ROW_1"] = 3] = "ROW_1";
    Locations[Locations["ROW_2"] = 4] = "ROW_2";
    Locations[Locations["COL_0"] = 5] = "COL_0";
    Locations[Locations["COL_1"] = 6] = "COL_1";
    Locations[Locations["COL_2"] = 7] = "COL_2";
})(Locations || (Locations = {}));
var Rotations;
(function (Rotations) {
    Rotations[Rotations["ROTATE_90"] = 1] = "ROTATE_90";
    Rotations[Rotations["ROTATE_180"] = 2] = "ROTATE_180";
    Rotations[Rotations["ROTATE_270"] = 3] = "ROTATE_270";
})(Rotations || (Rotations = {}));
var Colors;
(function (Colors) {
    Colors["red"] = "#ff0000";
})(Colors || (Colors = {}));
exports.applyTransformations = (switchesState, configuration, object) => {
    const [transformationCoordinates, variantsCoordinates] = switchesState;
    const [transformation, variantsConfiguration] = configuration.get(transformationCoordinates);
    const variants = variantsCoordinates.map(v => variantsConfiguration.get(v));
    transformation(object, variants);
};
