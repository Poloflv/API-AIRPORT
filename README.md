

# AIRPORT DB - Pasos para ejecutar este backend 

1. clonar el siguiente repositorio: (https...)

2. ejecutar el comando: 
```
npm install
```
3. clonar el archivo `.env.template` y renombrarlo a `.env` y agregar las variables de entorno 

4.  ejecutar el siguiente comando para levantar la base de datos:
```
docker-compose up -d
```

5. (opcional) si no tienes docker, deberas crearte la base de datos de tu computadora 
desbes tener instalado postgres

6. ejecutar el comando:
```
npm run start:dev
```