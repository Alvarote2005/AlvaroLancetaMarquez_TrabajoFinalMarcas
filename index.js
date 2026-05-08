const express = require("express");
const app = express();
const port = 2407;

app.use(express.json());

app.listen(port,() => {
    console.log("Servidor en uso")
})

//RECURSO PRINCIPAL
const libros = 
  { id: 1, 
    nombre: "Cien años de soledad",
    identificador: "123-45-678-9001-2",
    autor: "Gabriel García Márquez",
    editorial: "Editorial Sudamericana",
    año_publicacion: 1967,
    genero: "Realismo mágico",
    num_paginas: 417,
    disponible: true
  }


//RECURSO SECUNDARIO

const prestamos = {
    id: 101,
    libro_id: 1,
    fecha_prestamo: "2026-10-15",
    fecha_devolucion_estimada: "2026-10-29",
    fecha_devolucion_real: null,
    usuario: "Álvaro Lanceta",
    email_usuario: "alanceta@gmail.com",
    estado: "activo"

}

function obtenerDatosPrestamo(libro_id){
    return prestamos.filter(prestamos => prestamos.libro_id === libro_id);
}

if (typeof module !== 'undefined' && module.exports){
    module.exports = {libros, prestamos, obtenerDatosPrestamo}
}