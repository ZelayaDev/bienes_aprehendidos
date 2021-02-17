const router = require("express").Router();
const {getAllRegion} = require('./model');

router.get("/", async (req, res)  => {
    const regiones = await getAllRegion()
    res.status(200).json(regiones)
})


module.exports = router;