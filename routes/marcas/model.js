const {database} = require("../../database/database");

const getAllMarcas = async () => {
    return database
    .select("a.*","b.Nombre_Medio") 
    .from("marcas_aeronaval as a")
    .innerJoin("medios_transporte as b","b.Id_Medio_Transporte","a.Id_Medio" )
    .orderBy("a.Id_Medio","a.Orden_Marca")
    .then((marcas) =>{
        return marcas
    })
    .catch((error) => {
        return error;
    })
}

const getMarcasbyIdMedio = async (id_medio) => {
    return database
    .select("a.*","b.Nombre_Medio") 
    .from("marcas_aeronaval as a")
    .innerJoin("medios_transporte as b","b.Id_Medio_Trasnporte","a.Id_Medio" )
    .where("b.Id_Medio_Transporte","=",id_Medio)
    .orderBy("a.Id_Medio","a.Orden_Marca")
    .then((marcas) =>{
        return marcas
    })
    .catch((error) => {
        return error;
    })
}

module.exports.getAllMarcas = getAllMarcas;
module.exports.getMarcasbyIdMedio = getMarcasbyIdMedio;