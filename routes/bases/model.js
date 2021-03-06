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

const getAllBasesPaginado = async (limit, offset, atrib, order, texto) => {
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
    .limit(limit)
    .offset(offset)
    .orderBy(atrib, order)
    .then((bases) => {
      return bases;
    })
    .catch((error) => {
      return error;
    });
};

const resultadoPaginadoBases = async (
  page,
  limit,
  getAll,
  getWithPages,
  atrib,
  order,
  texto
) => {
  const offset = limit * page - limit;

  const endIndex = page * limit;

  const results = {};

  const total = await getAll();

  results.total = total.length;

  if (endIndex < total.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (page > 1) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.results = await getWithPages(limit, offset, atrib, order, texto);
  return results;
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
    .andWhere("Id_Bases_Aeronaval", "<>", id_base)
    .then((respuesta) => {
      if (respuesta.length > 0) return "base ya existe";
      return database
        .select("*")
        .from("bases_aeronaval")
        .where("Orden_Base", "=", orden_base)
        .andWhere("Id_Bases_Aeronaval", "<>", id_base)
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

const activaDesactivaBase = (id_base) => {
  return database
    .select("*")
    .from("bases_aeronaval")
    .where("Id_Base", "=", id_base)
    .then((base) => {
      if (base.length === 0) return "Base no existe";
      return database("bases_aeronaval")
        .where("Id_Bases_Aeronaval", "=", id_base)
        .update({
          Estatus_Base: base[0].Estatus_Base === 1 ? 0 : 1,
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

const getbaseById = (id_base) => {
  return database
    .select("*")
    .from("bases_aeronaval")
    .where("Id_Bases_Aeronaval", "=", id_base)
    .then((base) => base)
    .catch((error) => error);
};

module.exports.getAllBases = getAllBases;
module.exports.getBasesbyIdRegion = getBasesbyIdRegion;
module.exports.insertBases = insertBases;
module.exports.updateBases = updateBases;
module.exports.validarBases = validarBases;
module.exports.activaDesactivaBase = activaDesactivaBase;
module.exports.getbaseById = getbaseById;
module.exports.getAllBasesPaginado = getAllBasesPaginado;
module.exports.resultadoPaginadoBases = resultadoPaginadoBases;
