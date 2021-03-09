const {database} = require("../../database/database");

const getAllColores = async () => {
    return database
    .select("a.*") 
    .from("colores_aeronaval as a")
    .orderBy("a.Orden_Color")
    .then((colores) =>{
        return colores
    })
    .catch((error) => {
        return error;
    })
}



module.exports.getAllColores = getAllColores;