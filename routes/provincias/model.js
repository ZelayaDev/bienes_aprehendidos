const { database } = require("../../database/database");

const getAllProvincias = async () => {
  return database
    .select("a.*", "b.Nombre_Region")
    .from("provincias_aeronaval as a")
    .innerJoin(
      "regiones_aeronaval as b",
      "b.Id_Region_Aeronaval",
      "a.Id_Region",
    )
    .orderBy("a.Orden_Provincia")
    .then((provincias) => {
      return provincias;
    })
    .catch((error) => {
      return error;
    });
};

const getProvinciasbyIdRegion = async (id_region) => {
  return database
    .select("a.*", "b.Nombre_Region")
    .from("provincias_aeronaval as a")
    .innerJoin(
      "regiones_aeronaval as b",
      "b.Id_Region_Aeronaval",
      "a.Id_Region",
    )
    .where("b.Id_Region_Aeronaval", "=", id_region)
    .orderBy("a.Orden_Provincia")
    .then((provincias) => {
      return provincias;
    })
    .catch((error) => {
      return error;
    });
};

const insertProvincias = async (id_region, nombre_provincia) => {
  return database
    .max("Orden_Provincia as orden")
    .from("provincias_aeronaval")
    .then((response) => {
      return database("provincias_aeronaval")
        .insert({
          Id_Region: id_region,
          Nombre_Provincia: nombre_provincia,
          Orden_Provincia: response.length === 0 ? 1 : response[0].orden + 0.5,
          Provincia_Activa: 1,
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

const updateProvincias = (id_provincia, id_region, nombre_provincia, orden) => {
  return database
    .select("*")
    .from("provincias_aeronaval")
    .where("Nombre_Provincia", "=", nombre_provincia)
    .andWhere("Id_Provincia_Aeronaval", "<>", id_provincia)
    .then((respuesta) => {
      if (respuesta.length > 0) return "Provincia ya existe";
      return database
        .select("*")
        .from("provincias_aeronaval")
        .where("Orden_Provincia", "=", orden)
        .andWhere("Id_Provincia_Aeronaval", "<>", id_provincia)
        .then((response) => {
          if (response.length > 0) return "orden ya existe";
          return database("provincias_aeronaval")
            .where("Id_Provincia_Aeronaval", "=", id_provincia)
            .update({
              Nombre_Provincia: nombre_provincia,
              Orden_Provincia: orden,
              Id_Region: id_region,
              Provincia_Activa: 1,
            })
            .then((provincia) => {
              console.log("response aqui", provincia);
              return res;
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

const activaDesactivaProvincia = (id_provincia) => {
  return database
    .select("*")
    .from("provincias_aeronaval")
    .where("Id_Provincia_Aeronaval", "=", id_provincia)
    .then((provincia) => {
      if (provincia.length === 0) return "Provincia no existe";
      return database("provincias_aeronaval")
        .where("Id_Provincia_Aeronaval", "=", id_provincia)
        .update({
          Provincia_Activa: provincia[0].Provincia_Activa === 1 ? 0 : 1,
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

const validarProvincias = (texto) => {
  return database
    .select("*")
    .from("provincias_aeronaval")
    .where("Nombre_Provincia", "=", texto)
    .then((respuesta) => respuesta)
    .catch((err) => err);
};

const validarRegion = (id_region) => {
  return database
    .select("*")
    .from("regiones_aeronaval")
    .where("Id_Region_Aeronaval", "=", id_region)
    .then((respuesta) => respuesta)
    .catch((err) => err);
};

module.exports.getAllProvincias = getAllProvincias;
module.exports.getProvinciasbyIdRegion = getProvinciasbyIdRegion;
module.exports.insertProvincias = insertProvincias;
module.exports.validarProvincias = validarProvincias;
module.exports.updateProvincias = updateProvincias;
module.exports.activaDesactivaProvincia = activaDesactivaProvincia;
module.exports.validarRegion = validarRegion;
