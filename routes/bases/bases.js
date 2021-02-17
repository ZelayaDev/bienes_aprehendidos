const router = require("express").Router();
const {getAllBases, getBasesbyIdRegion} = require('./model');

router.get("/", async (req, res)  => {
   console.log(req.query)
   if(req.query === "region") {
       const bases = await getBasesbyIdRegion(req.query.region)
       res.status(200).json(bases)
   } else {
    const bases = await getAllBases()
    res.status(200).json(bases)
   }
  
})


module.exports = router;