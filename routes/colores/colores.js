const router = require("express").Router();
const {getAllColores} = require('./model');

router.get("/", async (req, res)  => {
   console.log(req.query)
    const colores = await getAllColores()
    res.status(200).json(colores) 
})


module.exports = router;