const { database } = require("../../database/database");

const getAllMedios = async () => {
  return database
    .select("*")
    .from("medios_transporte")
    .orderBy("Orden_Medio")
    .then((medios) => {
      return medios;
    })
    .catch((error) => {
      return error;
    });
};

const getAllMedioPaginado = async (limit, offset, atrib, order, texto) => {
  return database
    .select("*")
    .from("medios_transporte")
    .where("Nombre_Medio", "like", `%${texto}%`)
    .limit(limit)
    .offset(offset)
    .orderBy(atrib, order)
    .then((medio) => {
      return medio;
    })
    .catch((error) => {
      return error;
    });
};

const resultadoMedioPaginado = async (
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

module.exports.getAllMedios = getAllMedios;
module.exports.getAllMedioPaginado = getAllMedioPaginado;
module.exports.resultadoMedioPaginado = resultadoMedioPaginado;
