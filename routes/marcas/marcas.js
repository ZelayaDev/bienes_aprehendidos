const router = require("express").Router();
const {
  getAllMarcas,
  getMarcasbyIdMedio,
  getAllMarcasPaginado,
  resultadoPaginadoMarcas,
  insertMarcas,
  validarMarca,
  updateMarcas,
  activaDesactivaMarcas,
  validarMedio,
} = require("./model");

router
  .get("/", async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const atrib = req.query.atrib;
    const order = req.query.order;
    const texto = req.query.text;
    try {
      const query = await resultadoPaginadoMarcas(
        page,
        limit,
        getAllMarcas,
        getAllMarcasPaginado,
        atrib,
        order,
        texto
      );
      res.status(200).json(query);
    } catch (error) {
      res.status(500).json("Error");
    }
  })
  .post("/", async (req, res) => {
    console.log(req.body);

    const { id_medio, nombre_marca } = req.body;
    const status = 1;

    try {
      const busquedaMarca = await validarMarca(nombre_marca);
      if (busquedaMarca.length) return res.status(406).json("Marca existe");

      const busquedaMedio = await validarMedio(id_medio);
      if (busquedaMedio.length === 0)
        return res.status(406).json("Medio no esta matriculado");

      await insertMarcas(id_medio, nombre_marca);
      res.status(200).json("Registro Creado");
    } catch (error) {
      res.status(500).json("Error");
    }
  })
  .put("/", async (req, res) => {
    console.log("body: ", req.body);
    const { id_marca, id_medio, nombre_marca, orden_marca } = req.body;

    try {
      const busquedaMedio = await validarMedio(id_medio);
      if (busquedaMedio.length === 0)
        return res.status(406).json("Medio no esta matriculado");

      const update = await updateMarcas(
        id_marca,
        id_medio,
        nombre_marca,
        orden_marca
      );

      if (
        update === "marca ya existe" ||
        update === "orden ya existe" ||
        update === 0
      )
        return res
          .status(400)
          .json(update === 0 ? "Error en la Actualizacion" : update);
      res.status(200).json("Registro actualizado");
    } catch (error) {
      res.status(500).json("Error");
    }
  })
  .delete("/", async (req, res) => {
    const { id_marca } = req.body;
    console.log(req.body);
    try {
      const desactivacion = await activaDesactivaMarcas(id_marca);
      if (!desactivacion) return res.status(400).json("Error en desactivacion");
      res.status(200).json("Desactivacion completa");
    } catch (error) {
      res.status(500).json("Error");
    }
  });

module.exports = router;
