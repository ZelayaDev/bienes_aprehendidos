const router = require("express").Router();
const {
  getAllTipologia,
  getTipologiabyId,
  insertTipologia,
  validarTipologia,
  updateTipologia,
  activaDesactivaTipologia,
} = require("./model");

router
  .get("/", async (req, res) => {
    const { id_tipologia } = req.query;
    try {
      const query = id_tipologia
        ? await getTipologiabyId(id_tipologia)
        : await getAllTipologia();
        console.log(query);
      res.status(200).json(query);
    } catch (error) {
      console.log(error);
      res.status(500).json("Error");
    }
  })
  .post("/", async (req, res) => {
    const { abreviatura, descripcion } = req.body;
   // const status = 1;

    try {
      const busquedaTipologia = await validarTipologia(descripcion)
      if (busquedaTipologia.length) return res.status(406).json("Tipologia existe");
      await insertTipologia(
        abreviatura,
        descripcion
    //    status
      );

 //console.log(req.body);
      res.status(200).json("Registro Creado");
    } catch (error) {
      res.status(500).json("Error");
    }
  })
   .put("/", async (req, res) => {
     const {id_tipologia, orden, abreviatura, descripcion} = req.body;
      console.log(req);
     try {
       const update = await updateTipologia(
         id_tipologia,
         orden,
         abreviatura,
         descripcion
       );

       if (
         update === "Descripcion ya existe" ||
         update === "orden ya existe" ||
         update === "Abreviatura ya existe" ||
         update === 0
       )
        res.status(400).json(update === 0 ? "Error en la Actualizacion" : update);
        res.status(200).json("Registro actualizado");
       } catch (error) {
         res.status(500).json("Error");
       }
     })
   .delete("/", async (req, res) => {
     const { id_tipologia } = req.body;
     console.log(req.body);
     try {
        const desactivacion = await activaDesactivaTipologia(id_tipologia);
        if (!desactivacion) return res.status(400).json("Error en desactivacion");
       res.status(200).json("Desactivacion completa");
     } catch (error) {
       res.status(500).json("Error");
     }
   });

module.exports = router;
