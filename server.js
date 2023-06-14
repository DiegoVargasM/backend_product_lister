require("dotenv").config();

const express = require("express");

const app = express();

//test route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la app" });
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto:", process.env.PORT);
});
