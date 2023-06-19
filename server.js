require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//importar rutas
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//middleware para loggear los request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/products", productsRoutes);
app.use("/api/user", usersRoutes);

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
