const router = require("express").Router();
const {
  getAllBases,
  getBasesbyIdRegion,
  insertBases,
  updateBases,
  validarBases,
} = require("./model");

router
  .get("/", async (req, res) => {
    console.log(req.query);
    if (req.query === "region") {
      const bases = await getBasesbyIdRegion(req.query.region);
      res.status(200).json(bases);
    } else {
      const bases = await getAllBases();
      res.status(200).json(bases);
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
        return res.status(400).json(update === 0 ? "error en update" : update);
      res.status(200).json("Registro actualizado");
    } catch (error) {
      res.status(500).json("Error");
    }
  });

module.exports = router;
