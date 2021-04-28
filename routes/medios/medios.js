const router = require("express").Router();
const {
  getAllMedios,
  resultadoMedioPaginado,
  getAllMedioPaginado,
} = require("./model");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const atrib = req.query.atrib;
  const order = req.query.order;
  const texto = req.query.text;
  try {
    const query = await resultadoMedioPaginado(
      page,
      limit,
      getAllMedios,
      getAllMedioPaginado,
      atrib,
      order,
      texto
    );
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json("Error");
  }
});

module.exports = router;
