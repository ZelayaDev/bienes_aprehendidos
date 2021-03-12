const router = require("express").Router();
const {
  getAllTipologia,
  getTipologiabyId,
  insertTipologia,
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
      res.status(200).json(query);
    } catch (error) {
      console.log(error);
      res.status(500).json("Error");
    }
  })
  .post("/", async (req, res) => {
    const { abreviatura, descripcion } = req.body;
    const status = 1;

    try {
      res.status(200).json("Registro Creado");
    } catch (error) {
      res.status(500).json("Error");
    }
  });
//   .put("/", async (req, res) => {
//     const {} = req.body;

//     try {
//       res.status(200).json("Registro actualizado");
//     } catch (error) {
//       res.status(500).json("Error");
//     }
//   })
//   .delete("/", async (req, res) => {
//     const {} = req.body;
//     try {
//       res.status(200).json("Desactivacion completa");
//     } catch (error) {
//       res.status(500).json("Error");
//     }
//   });

module.exports = router;
