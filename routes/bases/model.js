const { database } = require("../../database/database");

const getAllBases = async () => {
  return database
    .select(
      "a.*",
      "b.Nombre_Region",
      "c.nombre_zona",
      "d.Nombre_Provincia",
      "e.Descripcion_Tipologia",
      "e.Abreviatura_Tipologia"
    )
    .from("bases_aeronaval as a")
    .innerJoin(
      "regiones_aeronaval as b",
      "b.Id_Region_Aeronaval",
      "a.Id_Region"
    )
    .innerJoin("zonas_aeronaval as c", "a.Id_Zona", "c.Id_Zona_Aeronaval")
    .innerJoin(
      "provincias_aeronaval as d",
      "a.Id_Provincia",
      "d.Id_Provincia_Aeronaval"
    )
    .innerJoin(
      "tipologia_aeronaval as e",
      "a.Id_Tipologia",
      "e.Id_Tipologia_Aeronaval"
    )
    .orderBy("a.Id_Region", "a.Orden_Base")
    .then((bases) => {
      return bases;
    })
    .catch((error) => {
      return error;
    });
};

const getBasesbyIdRegion = async (id_region) => {
  return database
    .select(
      "a.*",
      "b.Nombre_Region",
      "c.nombre_zona",
      "d.Nombre_Provincia",
      "e.Descripcion_Tipologia",
      "e.Abreviatura_Tipologia"
    )
    .from("bases_aeronaval as a")
    .innerJoin(
      "regiones_aeronaval as b",
      "b.Id_Region_Aeronaval",
      "a.Id_Region"
    )
    .innerJoin("zonas_aeronaval as c", "a.Id_Zona", "c.Id_Zona_Aeronaval")
    .innerJoin(
      "provincias_aeronaval as d",
      "a.Id_Provincia",
      "d.Id_Provincia_Aeronaval"
    )
    .innerJoin(
      "tipologia_aeronaval as e",
      "a.Id_Tipologia",
      "e.Id_Tipologia_Aeronaval"
    )
    .where("b.Id_Region_Aeronaval", "=", id_region)
    .orderBy("a.Id_Region", "a.Orden_Base")
    .then((bases) => {
      return bases;
    })
    .catch((error) => {
      return error;
    });
};

const insertBases = async (
  id_region,
  id_provincia,
  id_tipologia,
  id_zona,
  nombre_Base,
  status
) => {
  return database
    .max("Orden_Base as orden")
    .from("bases_aeronaval")
    .then((response) => {
      return database("bases_aeronaval")
        .insert({
          Id_Region: id_region,
          Id_Provincia: id_provincia,
          Id_Tipologia: id_tipologia,
          Id_Zona: id_zona,
          Nombre_Base: nombre_Base,
          Orden_Base: response.length === 0 ? 1 : response[0].orden + 0.5,
          Estatus_Base: status,
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

const updateBases = (
  id_region,
  id_provincia,
  id_tipologia,
  id_zona,
  nombre_Base,
  orden_base,
  id_base
) => {
  return database
    .select("*")
    .from("bases_aeronaval")
    .where("Nombre_Base", "=", nombre_Base)
    .then((respuesta) => {
      if (respuesta.length > 0) return "base ya existe";
      return database
        .select("*")
        .from("bases_aeronaval")
        .where("Orden_Base", "=", orden_base)
        .then((response) => {
          if (response.length > 0) return "orden ya existe";
          return database("bases_aeronaval")
            .where("Id_Bases_Aeronaval", "=", id_base)
            .update({
              Id_Region: id_region,
              Id_Provincia: id_provincia,
              Id_Tipologia: id_tipologia,
              Id_Zona: id_zona,
              Nombre_Base: nombre_Base,
              Orden_Base: orden_base,
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

const validarBases = (texto) => {
  return database
    .select("*")
    .from("bases_aeronaval")
    .where("Nombre_Base", "=", texto)
    .then((respuesta) => respuesta)
    .catch((err) => err);
};

module.exports.getAllBases = getAllBases;
module.exports.getBasesbyIdRegion = getBasesbyIdRegion;
module.exports.insertBases = insertBases;
module.exports.updateBases = updateBases;
module.exports.validarBases = validarBases;
