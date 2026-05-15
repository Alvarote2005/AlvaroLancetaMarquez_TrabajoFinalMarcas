const express = require("express");
const app = express();
const port = 2407;

app.use(express.json());

app.listen(port,() => {
    console.log("La librería esta abierta")
})

//RECURSO PRINCIPAL
const libros = [
    { id: 1, 
    nombre: "Cien años de soledad",
    identificador: "123-45-678-9001-2",
    autor: "Gabriel García Márquez",
    editorial: "Editorial Sudamericana",
    año_publicacion: 1967,
    genero: "Realismo mágico",
    num_paginas: 417,
    disponible: true
  },

  {     
    id: 2,
    nombre: "1984",
    identificador: "123-45-678-9002-3",
    autor: "George Orwell",
    editorial: "Secker & Warburg",
    año_publicacion: 1949,
    genero: "Ciencia ficción",
    num_paginas: 328,
    disponible: true
    },

    {
    id: 3,
    nombre: "Luna de pluton",
    identificador: "123-45-679-8003-5",
    autor: "Dross",
    editorial: "Ni idea",
    año_publicacion: 2017,
    genero: "Realismo",
    num_paginas: 800,
    disponible: true
    }

  ];
  
//RECURSO SECUNDARIO

const prestamos = [
{id: 101,
    libro_id: 1,
    fecha_prestamo: "2026-10-15",
    fecha_devolucion_estimada: "2026-10-29",
    fecha_devolucion_real: null,
    usuario: "Álvaro Lanceta",
    email_usuario: "alanceta@gmail.com",
    estado: "activo"
},

{ id: 102,
    libro_id: 2,
    fecha_prestamo: "2026-12-6",
    fecha_devolucion_estimada: "2027-2-12",
    fecha_devolucion_real: null,
    usuario: "Javi",
    email_usuario: "javi@gmail.com",
    estado: "inactivo"
}

];

//3er APARTADO (ENDPOINTS)

/* Funciona correctamente las operaciones básicas de los registros primarios y secundarios.
Usar el archivo "Pruebas JS" del escritorio para las pruebas */


// 3.1 OPERACIONES BÁSICAS
// 3.1.1 Todos los registros

app.get('/api/libros', (req, res) => { //Funciona bien

    res.json(libros);

})

app.get('/api/libros/filtrado', (req, res) => { //Funciona bien

//-------------------------------------------------------------------
// 3.3 FILTROS 
   let resultado = libros;

    const { nombre, genero, año_min, año_max } = req.query;

    // 3.3.1 Filtrar por nombre (texto parcial) //Funcional
    if (nombre) {
        resultado = resultado.filter(libro =>
            libro.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    }

    // 3.3.2 Filtrar por género
    if (genero) {
        resultado = resultado.filter(libro =>
            libro.genero.toLowerCase() === genero.toLowerCase()
        );
    }

    // 3.3.3 Filtrar por rango de años
    if (año_min) {
        resultado = resultado.filter(libro =>
            libro.año_publicacion >= parseInt(año_min)
        );
    }
    if (año_max) {
        resultado = resultado.filter(libro =>
            libro.año_publicacion <= parseInt(año_max)
        );
    }

    res.json (resultado);
})
//-------------------------------------------------------------------


//3.1.2 Obtener registros concretos de formas distintas vistas en clase (Query param)
/*Ahora funciona correctamente, sucedía que por alguna razón deben ir primero las
rutas específicas en vez de las rutas con parametros como es el 'api/libros/:id'
*/
app.get('/api/libros/busqueda', (req,res) => {
    const {identificador} = req.query;

    if (!identificador){
        return res.status(400).json({ error: "Se requiere el parámetro 'identificador'" });
    }

    const libro = libros.find(l => l.identificador === identificador);

    if (libro){
        res.json(libro);
    } else {
        res.status(404).json({ error: "Libro no encontrado" });
    }
})

//3.1.2 Obtener registros concretos de formas distintas vistas en clase (Route param) //Se que funciona bien, y como funciona

app.get('/api/libros/:id', (req, res) => {  //:id será sustituido por el número del libro que queremos mostrar
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (libro){
        res.json(libro);
    } else {
        res.status(404).json({ error: "Libro no encontrado" });
    }
})

//3.1.2 Crear un nuevo registro con validación de campos obligatorios

app.post('/api/libros/creacion', (req,res) => {
const {nombre, identificador, autor, editorial, año_publicacion, genero, num_paginas } = req.body;

if (!nombre || !identificador || !autor || !editorial || !año_publicacion || !genero || !num_paginas){
        return res.status(400).json({ 
            error: "Faltan campos obligatorios",
            campos_requeridos: ["nombre", "identificador", "autor", "editorial", "año_publicacion", "genero", "num_paginas"]
        });
}

if (libros.find(l => l.identificador === identificador)){
    return res.status(400).json({ error: "El identificador ya existe" });
}

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
res.status(201).json(nuevoLibro);
})

//3.1.3 Modificar un registro (completo) 
/*Entiendo como funciona el código
Y los cambios que tengo que realizar dentro de Bruno */

app.put('/api/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = libros.findIndex(l => l.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: "Libro no encontrado" });
    }

    const { nombre, identificador, autor, editorial, año_publicacion, genero, num_paginas, disponible } = req.body;

    console.log("Body recibido:", req.body);
    console.log("ID recibido:", req.params.id);
    
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

// 3.1.4 Eliminar un registro //Ya entiendo el código para eliminar registros

app.delete('/api/libros/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const indice = libros.findIndex(l => l.id === id);

    if (indice === -1) {
        return res.status(404).json({error: "Libro no encontrado"});
    }

    const prestamoActivo = prestamos.some(p => p.libro_id === id && p.estado === 'activo');

    if (prestamoActivo){
        return res.status(400).json({error: "No se pueden eliminar prestamos activos"});
    }

    libros.splice(indice,1);

    res.status(204).json("Registro eliminado correctamente");
})

// 3.2 ENDPOINTS RECURSO SECUNDARIO

// 3.2.1 Obtener todos los registros seundarios

app.get('/api/prestamos', (req, res) => {   //Funciona mostrando todos los libros que estan en prestamo
    res.json (prestamos)

//-------------------------------------------------------------------    
//3.3 Filtros 
// 3.3.3 Filtrar por multiples campos

if (año_min) {
    resultado = resultado.filter(libro => libro.año_publicacion >= parseInt(año_min));
}
if (año_max) {
    resultado = resultado.filter(libro => libro.año_publicacion <= parseInt(año_max));
}

// 3.3.6 Filtrar registros del recurso secundario en alguno de sus campos

    const {usuario, estado, texto} = req.query;

    if (usuario) {
        resultado = resultado.filter(p =>
            p.usuario.toLowerCase().includes(usuario.toLowerCase())
        );
    }

    if (estado){
        resultado = resultado.filter(p => p.estado === estado);
    }

    if (texto) {
        resultado = resultado.filter(p=>
            p.usuario.toLowerCase().includes(texto.toLowerCase()) ||
            p.email_usuario.toLowerCase().includes(texto.toLowerCase())
        );
    }

    res.json(resultado);

});
//-------------------------------------------------------------------

//3.2.2 Obtener todos los registros secundarios que pertenecen a un registro principal concreto

app.get('/api/prestamos/:id', (req,res) => {    //Funciona el get mostrando los prestamos por el id de los prestamos
    const id = parseInt(req.params.id);
    const prestamo = prestamos.find(p => p.id === id);

    if (prestamo) {
        res.json(prestamo)
    } else{
        return res.status(404).json({error: "No se encontro el libro"});
    }
});

//3.2.3 Crear nuevo registro secundario     //Funciona la creación de otro registro secundario a partir de uno primario

app.post('/api/prestamos/creacion', (req,res) => {
    const {libro_id, usuario, email_usuario, fecha_prestamo} = req.body;

    if (!libro_id ||!usuario ||!email_usuario){
        return res.status(400).json({
            error: "Faltan campos obligatorios",
            campos_requeridos: ["libro_id", "usuario", "email_usuario"]
        });
    }

const libro = libros.find(l => l.id === libro_id);
if (!libro) {
    return res.status(404).json({error: "El libro no existe"})
} 

if(!libro.disponible){
    return res.status(400).json({error: "El libro no esta disponible actualmente"})
}

const nuevoPrestamo = {
        id: prestamos.length+1,
        libro_id: parseInt(libro_id),
        fecha_prestamo: fecha_prestamo || new Date().toISOString().split('T')[0],
        fecha_devolucion_estimada: new Date(Date.now() + 14*24*60*60*1000).toISOString().split('T')[0],
        fecha_devolucion_real: null,
        usuario,
        email_usuario,
        estado: "activo"
    };

    prestamos.push(nuevoPrestamo);
    libro.disponible = false;
    
    res.status(201).json(nuevoPrestamo);
});

//3.2.4 Eliminar registro secundario //Funciona correctamente 

app.delete('/api/prestamos/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const indice = prestamos.findIndex(p => p.id === id);

    if (indice === -1){
        return res.status(400).json({error: "No se puede eliminar un prestamo activo"})
    }

    prestamos.splice(indice,1);

    res.status(204).json("Prestamo eliminado satisfactoriamente")
})