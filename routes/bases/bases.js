const router = require("express").Router();
const {getAllBases, getBasesbyIdRegion,  insertBases, updateBases, validarRegion} = require('./model');

router.get("/", async (req, res)  => {
   console.log(req.query)
   if(req.query === "region") {
       const bases = await getBasesbyIdRegion(req.query.region)
       res.status(200).json(bases)
   } else {
    const bases = await getAllBases()
    res.status(200).json(bases)
   }
  
}).post("/", async (req, res) => {
    console.log(req.body)

    const {id_region, id_provincia, id_tipologia, id_zona, nombre_Base, orden_base} = req.body; 
    const status = 1;
    const verificaRegion = await validarRegion(id_region);
    if (verificaRegion) return res.status(400).json("Verifique Region")

    try {
        await insertBases(id_region, id_provincia, id_tipologia, id_zona, nombre_Base, orden_base, status)
        res.status(200).json("Registro Creado")
    } catch (error) {
        res.status(500).json("Error")
    }
}).put("/", async (req, res) => {
    console.log(req.body)
    const {id_region, id_provincia, id_tipologia, id_zona, nombre_Base, orden_base, id_base} = req.body; 

    try {
        await updateBases(id_region, id_provincia, id_tipologia, id_zona, nombre_Base, orden_base, id_base)
        res.status(200).json("Registro actualizado")
    } catch (error) {
        res.status(500).json("Error")
    }
})


module.exports = router;