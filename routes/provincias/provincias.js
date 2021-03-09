const router = require("express").Router();
const {getAllProvincias, getProvinciasbyIdRegion} = require('./model');

router.get("/", async (req, res)  => {
   console.log(req.query)
   if(req.query === "region") {
       const provincias = await getProvinciasbyIdRegion(req.query.region)
       res.status(200).json(provincias)
   } else {
    const provincias = await getAllProvincias()
    res.status(200).json(provincias)
   }
  
})


module.exports = router;