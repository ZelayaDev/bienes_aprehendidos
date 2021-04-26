const router = require("express").Router();
const {
  getAllSeries,
  getSeriesbyIdEquipo,
  insertseries,
  validarSeries,
  updateSeries,
  activaDesactivaSeries,
} = require("./model");

router
  .get("/", async (req, res) => {
    console.log(req.query);
    if (req.query === "medio") {
      const marcas = await getMarcasbyIdMedio(req.query.medio);
      res.status(200).json(marcas);
    } else {
      const marcas = await getAllMarcas();
      res.status(200).json(marcas);
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
