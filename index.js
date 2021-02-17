const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


//Middlewares

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
const port = process.env.PORT || 5000;
app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Servidor corriendo : ${port}`);
})

//Rutas

const regiones = require("./routes/regiones/regiones");
const tipologia = require("./routes/tipologia/tipologia");
const bases = require("./routes/bases/bases");

app.use("/api/regiones", regiones);
app.use("/api/tipologia", tipologia);
app.use("/api/bases", bases);