const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

//Middlewares

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(helmet());
app.use(compression());

//server escuchando

const port = process.env.PORT || 5000;
app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Servidor corriendo : localhost:${port}`);
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
