const { response } = require("express");
const { database } = require("../../database/database");

const getAllMarcas = async () => {
  return database
    .select("a.*", "b.Nombre_Medio")
    .from("marcas_aeronaval as a")
    .innerJoin("medios_transporte as b", "b.Id_Medio_Transporte", "a.Id_Medio")
    .orderBy("a.Id_Medio", "a.Orden_Marca")
    .then((marcas) => {
      return marcas;
    })
    .catch((error) => {
      return error;
    });
};

const getMarcasbyIdMedio = async (id_medio) => {
  return database
    .select("a.*", "b.Nombre_Medio")
    .from("marcas_aeronaval as a")
    .innerJoin("medios_transporte as b", "b.Id_Medio_Trasnporte", "a.Id_Medio")
    .where("b.Id_Medio_Transporte", "=", id_Medio)
    .orderBy("a.Id_Medio", "a.Orden_Marca")
    .then((marcas) => {
      return marcas;
    })
    .catch((error) => {
      return error;
    });
};

const insertMarcas = async (id_medio, nombre_marca) => {
  return database
    .max("Orden_Marca as orden")
    .from("marcas_aeronaval")
    .then((response) => {
      return database("marcas_aeronaval")
        .insert({
          Id_Medio: id_medio,
          Nombre_Marca: nombre_marca,
          Orden_Marca: response.length === 0 ? 1 : response[0].orden + 0.5,
          Estatus_Marca: 1,
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

const validarMarca = (texto) => {
  return database
    .select("*")
    .from("marcas_aeronaval")
    .where("Nombre_Marca", "=", texto)
    .then((respuesta) => respuesta)
    .catch((err) => err);
};

const validarMedio = (id_medio) => {
  return database
    .select("*")
    .from("medios_transporte")
    .where("Id_Medio_Transporte", "=", id_medio)
    .then((respuesta) => respuesta)
    .catch((err) => err);
};

const updateMarcas = (id_marca, id_medio, nombre_marca, orden) => {
  return database
    .select("*")
    .from("marcas_aeronaval")
    .where("Nombre_Marca", "=", nombre_marca)
    .andWhere("Id_Marcas_Aeronaval", "<>", id_marca)
    .then((respuesta) => {
      if (respuesta.length > 0) return "Marca ya existe";
      return database
        .select("*")
        .from("marcas_aeronaval")
        .where("Orden_Marca", "=", orden)
        .andWhere("Id_Marcas_Aeronaval", "<>", id_marca)
        .then((response) => {
          if (response.length > 0) return "orden ya existe";
          return database("marcas_aeronaval")
            .where("Id_Marcas_Aeronaval", "=", id_marca)
            .update({
              Id_Medio: id_medio,
              Nombre_Marca: nombre_marca,
              Orden_Marca: orden,
            })
            .then((marca) => {
              console.log("response", marca);
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

const activaDesactivaMarcas = (id_marca) => {
  return database
    .select("*")
    .from("marcas_aeronaval")
    .where("Id_Marcas_Aeronaval", "=", id_marca)
    .then((marca) => {
      if (marca.length === 0) return "Marca no existe";
      return database("marcas_aeronaval")
        .where("Id_Marcas_Aeronaval", "=", id_marca)
        .update({
          Estatus_Marca: marca[0].Estatus_Marca === 1 ? 0 : 1,
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

module.exports.getAllMarcas = getAllMarcas;
module.exports.getMarcasbyIdMedio = getMarcasbyIdMedio;
module.exports.insertMarcas = insertMarcas;
module.exports.validarMarca = validarMarca;
module.exports.updateMarcas = updateMarcas;
module.exports.activaDesactivaMarcas = activaDesactivaMarcas;
module.exports.validarMedio = validarMedio;
