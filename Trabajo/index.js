const express = require("express");
const app = express();
const port = 2407;

app.use(express.json());

app.listen(port,() => {
    console.log("Servidor en uso")
})