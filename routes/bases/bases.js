const router = require("express").Router();
const {
  getAllBases,
  getBasesbyIdRegion,
  insertBases,
  updateBases,
  validarBases,
  activaDesactivaBase,
  getbaseById,
} = require("./model");

router
  .get("/", async (req, res) => {
    const { id_base } = req.query;

    try {
      const query = id_base ? await getbaseById(id_base) : await getAllBases();
      res.status(200).json(query);
    } catch (error) {
      res.status(500).json("Error");
    }
  })
  .post("/", async (req, res) => {
    console.log(req.body);

    const {
      id_region,
      id_provincia,
      id_tipologia,
      id_zona,
      nombre_Base,
    } = req.body;
    const status = 1;

    try {
      const busquedaBase = await validarBases(nombre_Base);
      if (busquedaBase.length) return res.status(406).json("Base existe");

      await insertBases(
        id_region,
        id_provincia,
        id_tipologia,
        id_zona,
        nombre_Base,
        status
      );
      res.status(200).json("Registro Creado");
    } catch (error) {
      res.status(500).json("Error");
    }
  })
  .put("/", async (req, res) => {
    console.log("body: ", req.body);
    const {
      id_region,
      id_provincia,
      id_tipologia,
      id_zona,
      nombre_Base,
      orden_base,
      id_base,
    } = req.body;

    try {
      const update = await updateBases(
        id_region,
        id_provincia,
        id_tipologia,
        id_zona,
        nombre_Base,
        orden_base,
        id_base
      );
      if (
        update === "base ya existe" ||
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
    const { id_base } = req.body;
    try {
      const desactivacion = await activaDesactivaBase(id_base);
      if (!desactivacion) return res.status(400).json("Error en desactivacion");
      res.status(200).json("Desactivacion completa");
    } catch (error) {
      res.status(500).json("Error");
    }
  });

module.exports = router;
