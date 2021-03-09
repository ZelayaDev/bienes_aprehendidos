const router = require("express").Router();
const {getAllMedios} = require('./model');

router.get("/", async (req, res)  => {
    const medios = await getAllMedios()
    res.status(200).json(medios)
})


module.exports = router;