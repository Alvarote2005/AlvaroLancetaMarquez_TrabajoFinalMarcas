const express = require("express");
const app = express();
const port = 2407;

app.use(express.json());

app.listen(port,() => {
    console.log("La librería esta abierta")
})

//RECURSO PRINCIPAL
const libros = 
    [{ id: 1, 
    nombre: "Cien años de soledad",
    identificador: "123-45-678-9001-2",
    autor: "Gabriel García Márquez",
    editorial: "Editorial Sudamericana",
    año_publicacion: 1967,
    genero: "Realismo mágico",
    num_paginas: 417,
    disponible: true
  }]


//RECURSO SECUNDARIO

const prestamos = 
[{id: 101,
    libro_id: 1,
    fecha_prestamo: "2026-10-15",
    fecha_devolucion_estimada: "2026-10-29",
    fecha_devolucion_real: null,
    usuario: "Álvaro Lanceta",
    email_usuario: "alanceta@gmail.com",
    estado: "activo"
}]

function obtenerDatosPrestamo(libro_id){
    return prestamos.filter(prestamos => prestamos.libro_id === libro_id);
}

if (typeof module !== 'undefined' && module.exports){
    module.exports = {libros, prestamos, obtenerDatosPrestamo}
}


//3er APARTADO (ENDPOINTS)

//3.1 OPERACIONES BÁSICAS
// 3.1.1 Todos los registros

app.get('/api/libros', (req, res) => {
    res.json (libros);
})

//3.1.2 Obtener registros concretos de formas distintas vistas en clase (Route param)

app.get('/api/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l = l.id === id);

    if (libro){
        res.json(libro);
    } else {
        res.status(404).json({ error: "Libro no encontrado" });
    }
})

//3.1.2 Obtener registros concretos de formas distintas vistas en clase (Query param)

app.get('/api/libros/busqueda', (req,res) => {
    const {identificador} = req.query;

    if (!identificador){
        return res.status(400).json({ error: "Se requiere el parámetro 'identificador'" });
    }

    const libro = libros.find(l => l.id === id);

    if (libro){
        res.json(libro);
    } else {
        res.status(404).json({ error: "Libro no encontrado" });
    }
})

//3.1.2 Crear un nuevo registro con validación de campos obligatorios

app.post('/api/libros', (req,res) => {
const {nombre, identificador, autor, editorial, año_publicacion, genero, num_paginas } = req.body;


if (!nombre || !identificador || !autor || !editorial || !año_publicacion || !genero || !num_paginas){
        return res.status(400).json({ 
            error: "Faltan campos obligatorios",
            campos_requeridos: ["nombre", "identificador", "autor", "editorial", "año_publicacion", "genero", "num_paginas"]
        });
}

if (libros.find(l => l.identificador === identificador)){
    return res.status(400).json({ error: "El identificador ya existe" });}

const nuevoLibro = {
    id: libros.length+1,
    nombre,
    identificador,
    autor,
    editorial,
    año_publicacion: parseInt(año_publicacion),
    genero,
    num_paginas: parseInt(num_paginas),
    disponible: true
};

libros.push(nuevoLibro);
})
//3.1.3 Modificar un registro (completo)

app.put('/api/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = libros.findIndex(l => l.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: "Libro no encontrado" });
    }
    
    const { nombre, identificador, autor, editorial, año_publicacion, genero, num_paginas, disponible } = req.body;
    
    if (!nombre || !identificador || !autor || !editorial || !año_publicacion || !genero || !num_paginas) {
        return res.status(400).json({ 
            error: "Faltan campos obligatorios para la actualización completa"
        });
    }

    const otroLibro = libros.find(l => l.identificador === identificador && l.id !== id);
    
    if (otroLibro) {
        return res.status(400).json({ error: "El identificador ya está en uso por otro libro" });
    }
    
    libros[index] = {
        id,
        nombre,
        identificador,
        autor,
        editorial,
        año_publicacion: parseInt(año_publicacion),
        genero,
        num_paginas: parseInt(num_paginas),
        disponible: disponible !== undefined ? disponible : true
    };
    
    res.json(libros[index]);
});

// 3.1.4 Eliminar un registro

app.delete('/api/libros/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const indice = libros.findIndex(l => l.id === id);

    if (indice === -1) {
        return res.status(404).json({error: "Libro no encontrado"});
    }

    const prestamoActivo = prestamos.some(p => p.libro_id === id && p.estado === 'activo');

    if (prestamoActivo){
        return res.status(400).json({error: "No se pueden eliminar prstamos activos"});
    }
})

//3.2 ENDPOINTS RECURSO SECUNDARIO