const {database} = require("../../database/database");

const getAllTipologia = async () => {
    return database
    .select("*") 
    .from("tipologia_aeronaval")
    .orderBy("Orden_Tipologia")
    .then((tipologia) =>{
        return tipologia
    })
    .catch((error) => {
        return error;
    })
}

module.exports.getAllTipologia = getAllTipologia;