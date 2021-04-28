const router = require("express").Router();
const {
  getAllProvincias,
  getAllProvinciaPaginado,
  resultadoProvinciaPaginado,
  getProvinciasbyIdRegion,
  insertProvincias,
  validarProvincias,
  validarRegion,
  activaDesactivaProvincia,
} = require("./model");

router
  .get("/", async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const atrib = req.query.atrib;
    const order = req.query.order;
    const texto = req.query.text;
    try {
      const query = await resultadoProvinciaPaginado(
        page,
        limit,
        getAllProvincias,
        getAllProvinciaPaginado,
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

    const { id_region, nombre_provincia } = req.body;
    const status = 1;

    try {
      const busquedaProvincia = await validarProvincias(nombre_provincia);
      if (busquedaProvincia.length)
        return res.status(406).json("Provincia existe");

      await insertProvincias(id_region, nombre_provincia);
      res.status(200).json("Registro Creado");
    } catch (error) {
      res.status(500).json("Error");
    }
  })
  .put("/", async (req, res) => {
    console.log("body: ", req.body);
    const { id_provincia, id_region, nombre_provincia, orden } = req.body;

    try {
      const busquedaRegion = await validarRegion(id_region);
      if (busquedaRegion.length === 0)
        return res.status(406).json("Region no esta matriculada");

      const update = await updateProvincias(
        id_provincia,
        id_region,
        nombre_provincia,
        orden
      );

      if (
        update === "Provincia ya existe" ||
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
    const { id_provincia } = req.body;
    console.log(req.body);
    try {
      const desactivacion = await activaDesactivaProvincia(id_provincia);
      if (!desactivacion) return res.status(400).json("Error en desactivacion");
      res.status(200).json("Desactivacion completa");
    } catch (error) {
      res.status(500).json("Error");
    }
  });

module.exports = router;
