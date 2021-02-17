const {database} = require("../../database/database");

const getAllBases = async () => {
    return database
    .select("a.*","b.Nombre_Region","c.nombre_zona","d.Nombre_Provincia","e.Descripcion_Tipologia","e.Abreviatura_Tipologia") 
    .from("bases_aeronaval as a")
    .innerJoin("regiones_aeronaval as b","b.Id_Region_Aeronaval","a.Id_Region" )
    .innerJoin("zonas_aeronaval as c", "a.Id_Zona","c.Id_Zona_Aeronaval")
    .innerJoin("provincias_aeronaval as d","a.Id_Provincia","d.Id_Provincia_Aeronaval")
    .innerJoin("tipologia_aeronaval as e","a.Id_Tipologia","e.Id_Tipologia_Aeronaval")
    .orderBy("a.Id_Region","a.Orden_Base")
    .then((bases) =>{
        return bases
    })
    .catch((error) => {
        return error;
    })
}

const getBasesbyIdRegion = async (id_region) => {
    return database
    .select("a.*","b.Nombre_Region","c.nombre_zona","d.Nombre_Provincia","e.Descripcion_Tipologia","e.Abreviatura_Tipologia") 
    .from("bases_aeronaval as a")
    .innerJoin("regiones_aeronaval as b","b.Id_Region_Aeronaval","a.Id_Region" )
    .innerJoin("zonas_aeronaval as c", "a.Id_Zona","c.Id_Zona_Aeronaval")
    .innerJoin("provincias_aeronaval as d","a.Id_Provincia","d.Id_Provincia_Aeronaval")
    .innerJoin("tipologia_aeronaval as e","a.Id_Tipologia","e.Id_Tipologia_Aeronaval")
    .where("b.Id_Region_Aeronaval","=",id_region)
    .orderBy("a.Id_Region","a.Orden_Base")
    .then((bases) =>{
        return bases
    })
    .catch((error) => {
        return error;
    })
}

module.exports.getAllBases = getAllBases;
module.exports.getBasesbyIdRegion = getBasesbyIdRegion;