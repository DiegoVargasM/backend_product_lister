require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

//importar rutas
const productsRoutes = require("./routes/products.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware para loggear los request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/productos", productsRoutes);

//conectar a la base de datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Escuchando en puerto:", process.env.PORT);
    });
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log(err);
  });
