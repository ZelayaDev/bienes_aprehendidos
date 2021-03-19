const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const dotenv = require("dotenv");

//Middlewares

//dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 5000;
app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Servidor corriendo : ${port}`);
});

//Rutas

const regiones = require("./routes/regiones/regiones");
const tipologia = require("./routes/tipologia/tipologia");
const bases = require("./routes/bases/bases");
const provincias = require("./routes/provincias/provincias");
const zonas = require("./routes/zonas/zonas");
const colores = require("./routes/colores/colores");
const marcas = require("./routes/marcas/marcas");
const medios = require("./routes/medios/medios");

app.use("/api/regiones", regiones);
app.use("/api/tipologia", tipologia);
app.use("/api/bases", bases);
app.use("/api/provincias", provincias);
app.use("/api/zonas", zonas);
app.use("/api/colores", colores);
app.use("/api/marcas", marcas);
app.use("/api/medios", medios);
