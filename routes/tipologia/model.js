const { database } = require("../../database/database");

const getAllTipologia = async () => {
  return database
    .select("*")
    .from("tipologia_aeronaval")
    .orderBy("Orden_Tipologia")
    .then((tipologia) => {
      return tipologia;
    })
    .catch((error) => {
      return error;
    });
};

const getAllTipologiaPaginado = async (limit, offset, atrib, order, texto) => {
  return database
    .select("*")
    .from("tipologia_aeronaval")
    .where("Descripcion_Tipologia", "like", `%${texto}%`)
    .limit(limit)
    .offset(offset)
    .orderBy(atrib, order)
    .then((tipologia) => {
      return tipologia;
    })
    .catch((error) => {
      return error;
    });
};

const resultadoTipologiaPaginado = async (
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

const getTipologiabyId = async (id_tipologia) => {
  return database
    .select("*")
    .from("tipologia_aeronaval")
    .where("Id_Tipologia_Aeronaval", "=", id_tipologia)
    .orderBy("Orden_Tipologia")
    .then((tipologia) => tipologia)
    .catch((error) => error);
};

const insertTipologia = async (abreviatura, descripcion) => {
  return database
    .max("Orden_Tipologia as orden")
    .from("tipologia_aeronaval")
    .then((response) => {
      return database("tipologia_aeronaval")
        .insert({
          Orden_Tipologia: response.length === 0 ? 1 : response[0].orden + 0.5,
          Estatus_Tipologia: 1,
          Abreviatura_Tipologia: abreviatura,
          Descripcion_Tipologia: descripcion,
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

const updateTipologia = (id_tipologia, orden, abreviatura, descripcion) => {
  return database
    .select("*")
    .from("tipologia_aeronaval")
    .where("Descripcion_Tipologia", "=", descripcion)
    .andWhere("Id_Tipologia_Aeronaval", "<>", id_tipologia)
    .then((respuesta) => {
      if (respuesta.length > 0) return "Descripcion ya existe";
      return database
        .select("*")
        .from("tipologia_aeronaval")
        .where("Orden_Tipologia", "=", orden)
        .andWhere("Id_Tipologia_Aeronaval", "<>", id_tipologia)
        .then((response) => {
          if (response.length > 0) return "orden ya existe";
          return database
            .select("*")
            .from("tipologia_aeronaval")
            .where("Abreviatura_Tipologia", "=", abreviatura)
            .andWhere("Id_Tipologia_Aeronaval", "<>", id_tipologia)
            .then((res) => {
              if (res.length > 0) return "Abreviatura ya existe";
              return database("tipologia_aeronaval")
                .where("Id_Tipologia_Aeronaval", "=", id_tipologia)
                .update({
                  Orden_Tipologia: orden,
                  Abreviatura_Tipologia: abreviatura,
                  Descripcion_Tipologia: descripcion,
                })
                .then((tipologia) => {
                  console.log("response", tipologia);
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
    })
    .catch((error) => error);
};

const activaDesactivaTipologia = (id_tipologia) => {
  return database
    .select("*")
    .from("tipologia_aeronaval")
    .where("Id_Tipologia_Aeronaval", "=", id_tipologia)
    .then((tipologia) => {
      if (tipologia.length === 0) return "Tipologia no existe";
      return database("tipologia_aeronaval")
        .where("Id_Tipologia_Aeronaval", "=", id_tipologia)
        .update({
          Estatus_Tipologia: tipologia[0].Estatus_Tipologia === 1 ? 0 : 1,
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

const validarTipologia = (texto) => {
  return database
    .select("*")
    .from("tipologia_aeronaval")
    .where("Descripcion_Tipologia", "=", texto)
    .then((respuesta) => respuesta)
    .catch((err) => err);
};

module.exports.getAllTipologia = getAllTipologia;
module.exports.getTipologiabyId = getTipologiabyId;
module.exports.insertTipologia = insertTipologia;
module.exports.updateTipologia = updateTipologia;
module.exports.validarTipologia = validarTipologia;
module.exports.activaDesactivaTipologia = activaDesactivaTipologia;
module.exports.getAllTipologiaPaginado = getAllTipologiaPaginado;
module.exports.resultadoTipologiaPaginado = resultadoTipologiaPaginado;
