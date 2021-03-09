const router = require("express").Router();
const {getAllMarcas, getMarcasbyIdMedio} = require('./model');

router.get("/", async (req, res)  => {
   console.log(req.query)
   if(req.query === "medio") {
       const marcas = await getMarcasbyIdMedio(req.query.medio)
       res.status(200).json(marcas)
   } else {
    const marcas = await getAllMarcas()
    res.status(200).json(marcas)
   }
  
})


module.exports = router;