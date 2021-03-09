const {database} = require("../../database/database");

const getAllProvincias = async () => {
    return database
    .select("a.*","b.Nombre_Region") 
    .from("provincias_aeronaval as a")
    .innerJoin("regiones_aeronaval as b","b.Id_Region_Aeronaval","a.Id_Region" )
    .orderBy("a.Orden_Provincia")
    .then((provincias) =>{
        return provincias
    })
    .catch((error) => {
        return error;
    })
}

const getProvinciasbyIdRegion = async (id_region) => {
    return database
    .select("a.*","b.Nombre_Region") 
    .from("provincias_aeronaval as a")
    .innerJoin("regiones_aeronaval as b","b.Id_Region_Aeronaval","a.Id_Region" )
    .where("b.Id_Region_Aeronaval","=",id_region)
    .orderBy("a.Orden_Provincia")
    .then((provincias) =>{
        return provincias
    })
    .catch((error) => {
        return error;
    })
}

module.exports.getAllProvincias = getAllProvincias;
module.exports.getProvinciasbyIdRegion = getProvinciasbyIdRegion;