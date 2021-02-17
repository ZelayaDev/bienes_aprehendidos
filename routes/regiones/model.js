const {database} = require("../../database/database");

const getAllRegion = async () => {
    return database
    .select("*") 
    .from("regiones_aeronaval")
    .orderBy("Orden_Region")
    .then((region) =>{
        return region
    })
    .catch((error) => {
        return error;
    })
}

module.exports.getAllRegion = getAllRegion;
