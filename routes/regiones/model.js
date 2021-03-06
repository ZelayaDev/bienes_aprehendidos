const { database } = require("../../database/database");

const getAllRegion = async () => {
  return database
    .select("*")
    .from("regiones_aeronaval")
    .then((region) => {
      return region;
    })
    .catch((error) => {
      return error;
    });
};

const getAllRegionPaginado = async (limit, offset, atrib, order, texto) => {
  return database
    .select("*")
    .from("regiones_aeronaval")
    .where("Nombre_Region", "like", `%${texto}%`)
    .limit(limit)
    .offset(offset)
    .orderBy(atrib, order)
    .then((region) => {
      return region;
    })
    .catch((error) => {
      return error;
    });
};

const resultadoPaginado = async (
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

const insertRegiones = async (nombre_region) => {
  return database
    .max("Orden_Region as orden")
    .from("regiones_aeronaval")
    .then((response) => {
      return database("regiones_aeronaval")
        .insert({
          Nombre_Region: nombre_region,
          Orden_Region: response.length === 0 ? 1 : response[0].orden + 0.5,
          Estatus_Region: 1,
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

const updateRegiones = (nombre_region, orden_region, id_region) => {
  return database
    .select("*")
    .from("regiones_aeronaval")
    .where("Nombre_Region", "=", nombre_region)
    .andWhere("Id_Region_Aeronaval", "<>", id_region)
    .then((respuesta) => {
      if (respuesta.length > 0) return "Region ya existe";
      return database
        .select("*")
        .from("regiones_aeronaval")
        .where("Orden_Region", "=", orden_region)
        .andWhere("Id_Region_Aeronaval", "<>", id_region)
        .then((response) => {
          if (response.length > 0) return "orden ya existe";
          return database("regiones_aeronaval")
            .where("Id_Region_Aeronaval", "=", id_region)
            .update({
              Nombre_Region: nombre_region,
              Orden_Region: orden_region,
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

const activaDesactivaRegion = (id_region) => {
  return database
    .select("*")
    .from("regiones_aeronaval")
    .where("Id_Region_Aeronaval", "=", id_region)
    .then((region) => {
      if (region.length === 0) return "Region no existe";
      return database("regiones_aeronaval")
        .where("Id_Region_Aeronaval", "=", id_region)
        .update({
          Estatus_Region: region[0].Estatus_Region === 1 ? 0 : 1,
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

const getregionById = (id_region) => {
  return database
    .select("*")
    .from("regiones_aeronaval")
    .where("Id_Region_Aeronaval", "=", id_region)
    .then((region) => region)
    .catch((error) => error);
};

module.exports.getAllRegion = getAllRegion;
module.exports.insertRegiones = insertRegiones;
module.exports.updateRegiones = updateRegiones;
module.exports.activaDesactivaRegion = activaDesactivaRegion;
module.exports.getregionById = getregionById;
module.exports.getAllRegionPaginado = getAllRegionPaginado;
module.exports.resultadoPaginado = resultadoPaginado;
