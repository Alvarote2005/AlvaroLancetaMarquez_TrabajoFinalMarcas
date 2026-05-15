# TRABAJO FINAL ACERCA DEL PROYECTO DE LENGUAJE DE MARCAS A TOMAR COMO EXAMEN

Este trabajo estará realizado sobre una librería ficticia con libros aleatorios para probar
diferentes endpoints que se planteen en el enunciado general de la actividad, además de
control de errores acerca de estos mismos endpoints

## Empezando con este trabajo

~~1º Elegir un tema sobre el que hacer mi API (a elegir todavía)~~

~~2º Reutilizar el código sobre el que hice las pruebas de nodeJS~~

~~3º Esquematizar el trabajo punto por punto en función del PDF~~

~~4º Realización de los endpoints acerca de los recursos primarios (libros)~~

~~5º Realización de los endpoints acerca de los recursos secundarios (prestamos)~~

~~6º Realización de los filtros en vista de los dos recursos previamente mencionados~~

~~7º Realización de los endpoints de utilidades que engloban a los dos recursos mencionados~~

8º Control de errores aplicado correctamente en cada endpoint

## Pre-requisitos
Software necesario para poder poner a prueba esta API 

IDE: Visual Studio Code

```
Nodemon
Express
```

## Endpoints Registros Primarios a usar con sus URL y metodos correspondientes

```
GET http://localhost:2407/api/libros (MUESTRA TODOS LOS REGISTROS)
GET http://localhost:2407/api/libros/id: (MUESTRA REGISTROS POR SU ID)
GET http://localhost:2407/api/libros/busqueda (MUESTRA REGISTROS POR EL PARAMETRO IDENTIFICADOR)
POST http://localhost:2407/api/libros/creacion (CREACIÓN NUEVO PARAMETRO PRINCIPAL LIBRO)
PUT http://localhost:2407/api/libros/id: (MODIFICACIÓN DE UN REGISTRO LIBRO YA EXISTENTE)
DELETE http://localhost:2407/api/libros/id: (ELIMINA EL REGISTRO BASANDOSE EN LA ID PROPORCIONADA)
```

## Endpoints Registros Secundarios a usar con sus URL y metodos correspondientes

```
GET http://localhost:2407/api/prestamos (MUESTRA TODOS LOS REGISTROS SECUNDARIOS)
GET http://localhost:2407/api/prestamos/id: (MUESTRA EL REGISTRO POR SU ID)
POST http://localhost:2407/api/prestamos/creacion (CREA UN REGISTRO SECUNDARIO NUEVO)
DELETE  http://localhost:2407/api/prestamos/creacion (ELIMINA UN REGISTRO SECUNDARIO A ELEGIR POR ID)
```
