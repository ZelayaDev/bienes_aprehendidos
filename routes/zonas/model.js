const { database } = require("../../database/database");

const getAllZonas = async () => {
  return database
    .select("a.*", "b.Nombre_Region")
    .from("zonas_aeronaval as a")
    .innerJoin(
      "regiones_aeronaval as b",
      "b.Id_Region_Aeronaval",
      "a.Id_Region",
    )
    .orderBy("a.Id_Region", "a.Orden_Zona")
    .then((zonas) => {
      return zonas;
    })
    .catch((error) => {
      return error;
    });
};

const getZonasbyIdRegion = async (id_region) => {
  return database
    .select("a.*", "b.Nombre_Region")
    .from("zonas_aeronaval as a")
    .innerJoin(
      "regiones_aeronaval as b",
      "b.Id_Region_Aeronaval",
      "a.Id_Region",
    )
    .where("a.Id_Region", "=", id_region)
    .orderBy("a.Id_Region", "a.Orden_Zona")
    .then((zonas) => {
      return zonas;
    })
    .catch((error) => {
      return error;
    });
};

const insertZonas = async (id_region, nombre_zona) => {
  return database
    .max("Orden_Zona as orden")
    .from("zonas_aeronaval")
    .then((response) => {
      return database("zonas_aeronaval")
        .insert({
          Id_Region: id_region,
          Nombre_Zona: nombre_zona,
          Orden_Zona: response.length === 0 ? 1 : response[0].orden + 0.5,
          Estatus_Zona: 1,
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    })
    .catch((err) => err);
};

const updateZonas = (nombre_zona, orden_zona, id_zona) => {
  return database
    .select("*")
    .from("zonas_aeronaval")
    .where("Nombre_Zona", "=", nombre_zona)
    .andWhere("Id_Zona_Aeronaval", "<>", id_zona)
    .then((respuesta) => {
      if (respuesta.length > 0) return "zona ya existe";
      return database
        .select("*")
        .from("zonas_aeronaval")
        .where("Orden_Zona", "=", orden_zona)
        .andWhere("Id_Zona_Aeronaval", "<>", id_zona)
        .then((response) => {
          if (response.length > 0) return "orden ya existe";
          return database("zonas_aeronaval")
            .where("Id_Zona_Aeronaval", "=", id_zona)
            .update({
              Nombre_Zona: nombre_zona,
              Orden_Zona: orden_zona,
            })
            .then((response) => {
              console.log("response", response);
              return response;
            })
            .catch((error) => {
              console.log(error);
              return error;
            });
        })
        .catch((error) => error);
    })
    .catch((error) => error);
};

const validarZona = (texto) => {
  // console.log(texto);
  return database
    .select("*")
    .from("zonas_aeronaval")
    .where("Nombre_Zona", "=", texto)
    .then((respuesta) => respuesta)
    .catch((err) => err);
};

const activaDesactivaZonas = (id_zona) => {
  return database
    .select("*")
    .from("zonas_aeronaval")
    .where("Id_Zona_Aeronaval", "=", id_zona)
    .then((zona) => {
      if (zona.length === 0) return "Zona no existe";
      return database("zonas_aeronaval")
        .where("Id_Zona_Aeronaval", "=", id_zona)
        .update({
          Estatus_Zona: zona[0].Estatus_Zona === 1 ? 0 : 1,
        })
        .then((response) => {
          console.log("response", response);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    });
};

module.exports.getAllZonas = getAllZonas;
module.exports.getZonasbyIdRegion = getZonasbyIdRegion;
module.exports.updateZonas = updateZonas;
module.exports.insertZonas = insertZonas;
module.exports.activaDesactivaZonas = activaDesactivaZonas;
module.exports.validarZona = validarZona;
