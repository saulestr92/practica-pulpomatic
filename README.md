# Práctica-pulpomatic
Practica evaluación de conocimientos

## Estructura
* project: carpeta del proyecto
* libs: helpers o funciones que se utilizan más de una vez
* middlewares: condiciones aplicadas a distintas rutas 
* modelos: modelos de los documentos o registros de la base de datos
* public: archivos públicos como librerías js hojas de estilo o imágenes
* rutas: rutas definidas del proyecto
* vistas: hojas en extensión jade(motor de plantillas utilizado)

## Dependencias 
Tener instalado node.js, el paquete npm y mongoDB 

## Instalación 
Ejecutar el comando npm install

## Configuración 
En la carpeta project el archivo configdb se debe cambiar en la variable config la url por la de su base de datos 

## Ejecución 
Para ejecutar la aplicación en la terminal de node ejecutar npm start

Aparecerá el puerto por el cual se debe ingresar en el explorador web, la primer pantalla es la de login si no hay ningún registro se debe registrar en el link que dice registrar,una vez registrado se puede acceder a la pantalla que contiene un mapa del lado izquierdo y unos controles del lado derecho
