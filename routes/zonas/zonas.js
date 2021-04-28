const router = require("express").Router();
const {
  getAllZonas,
  getZonasbyIdRegion,
  getAllZonasPaginado,
  resultadoPaginadoZonas,
  insertZonas,
  validarZona,
  updateZonas,
  activaDesactivaZonas,
} = require("./model");

router
  .get("/", async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const atrib = req.query.atrib;
    const order = req.query.order;
    const texto = req.query.text;
    try {
      const query = await resultadoPaginadoZonas(
        page,
        limit,
        getAllZonas,
        getAllZonasPaginado,
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

    const { id_region, nombre_zona } = req.body;
    const status = 1;

    try {
      const busquedaZona = await validarZona(nombre_zona);
      if (busquedaZona.length) return res.status(406).json("Zona existe");

      await insertZonas(id_region, nombre_zona);
      res.status(200).json("Registro Creado");
    } catch (error) {
      res.status(500).json("Error");
    }
  })
  .put("/", async (req, res) => {
    console.log("body: ", req.body);
    const { nombre_zona, orden_zona, id_zona } = req.body;

    try {
      const update = await updateZonas(nombre_zona, orden_zona, id_zona);
      if (
        update === "zona ya existe" ||
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
    const { id_zona } = req.body;
    console.log(req.body);
    try {
      const desactivacion = await activaDesactivaZonas(id_zona);
      if (!desactivacion) return res.status(400).json("Error en desactivacion");
      res.status(200).json("Desactivacion completa");
    } catch (error) {
      res.status(500).json("Error");
    }
  });

module.exports = router;
