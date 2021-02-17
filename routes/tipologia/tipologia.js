const router = require("express").Router();
const {getAllTipologia} = require('./model');

router.get("/", async (req, res)  => {
    const tipologia = await getAllTipologia()
    res.status(200).json(tipologia)
})


module.exports = router;