const {database} = require("../../database/database");

const getAllZonas = async () => {
    return database
    .select("a.*","b.Nombre_Region") 
    .from("zonas_aeronaval as a")
    .innerJoin("regiones_aeronaval as b","b.Id_Region_Aeronaval","a.Id_Region" )
    .orderBy("a.Id_Region","a.Orden_Zona")
    .then((zonas) =>{
        return zonas
    })
    .catch((error) => {
        return error;
    })
}

const getZonasbyIdRegion = async (id_region) => {
    return database
    .select("a.*","b.Nombre_Region") 
    .from("zonas_aeronaval as a")
    .innerJoin("regiones_aeronaval as b","b.Id_Region_Aeronaval","a.Id_Region" )
    .where("a.Id_Region","=",id_region)
    .orderBy("a.Id_Region","a.Orden_Zona")
    .then((zonas) =>{
        return zonas
    })
    .catch((error) => {
        return error;
    })
}

module.exports.getAllZonas = getAllZonas;
module.exports.getZonasbyIdRegion = getZonasbyIdRegion;