require("dotenv").config();

const express = require("express");

//importar rutas de productos
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

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto:", process.env.PORT);
});
