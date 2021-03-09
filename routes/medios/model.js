const {database} = require("../../database/database");

const getAllMedios = async () => {
    return database
    .select("*") 
    .from("medios_transporte")
    .orderBy("Orden_Medio")
    .then((medios) =>{
        return medios
    })
    .catch((error) => {
        return error;
    })
}

module.exports.getAllMedios = getAllMedios;