const router = require("express").Router();
const {
  getAllRegion,
  insertRegiones,
  updateRegiones,
  activaDesactivaRegion,
} = require("./model");

router
  .get("/", async (req, res) => {
    const regiones = await getAllRegion();
    res.status(200).json(regiones);
  })
  .post("/", async (req, res) => {
    const { nombre_region } = req.body;
    if (!nombre_region && nombre_region.trim().length === 0)
      return res.status(400).json("Nombre de Region no debe estar en blanco");
    try {
      await insertRegiones(nombre_region);
      res.status(200).json("Nueva Region creada");
    } catch (error) {
      res.status(500).json("Error en la creacion de la Region");
    }
  })
  .put("/", async (req, res) => {
    const { nombre_region, orden_region, id_region } = req.body;

    try {
      const update = await updateRegiones(
        nombre_region,
        orden_region,
        id_region
      );
      if (
        update === "Region ya existe" ||
        update === "orden ya existe" ||
        update === 0
      )
        return res
          .status(400)
          .json(update === 0 ? "Error en la Actualizacion" : update);
      res.status(200).json("Registro actualizado");
    } catch (error) {
      console.log("error: ", error);
      res.status(500).json("Error");
    }
  })
  .delete("/", async (req, res) => {
    const { id_region } = req.body;
    try {
      const desactivacion = await activaDesactivaRegion(id_region);
      if (!desactivacion) return res.status(400).json("Error en desactivacion");
      res.status(200).json("Desactivacion completa");
    } catch (error) {
      res.status(500).json("Error");
    }
  });

module.exports = router;
