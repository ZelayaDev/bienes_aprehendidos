const router = require("express").Router();
const {getAllZonas, getZonasbyIdRegion} = require('./model');

router.get("/", async (req, res)  => {
   console.log(req.query)
   if(req.query === "region") {
       const zonas = await getZonasbyIdRegion(req.query.region)
       res.status(200).json(zonas)
   } else {
    const zonas = await getAllZonas()
    res.status(200).json(zonas)
   }
  
})


module.exports = router;