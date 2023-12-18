
# Prueba tecnica Gerundio Backend

Un pequeño desarrollo de CRUD de usuarios utilizando NodeJs, Express, MongoDB , Jest

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

![Static Badge](https://img.shields.io/badge/backend%2F-gerundio-blue)

![Static Badge](https://img.shields.io/badge/build-NodeJS-green)


## Instalacion

Instalación del proyecto

```bash
  npm install
```

## Encender el servidor

Correr el proyecto

```bash
  npm run dev
```

## Pruebas o testing con Jest

Correr el testing

```bash
  npm test
```
    
    
## API Reference

#### Obtener todo los usuarios

```http
  GET /users
```

#### Registrar usuario

```http
  POST /auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email requerido |
| `password`   | `string` | **Required**. password requerido |

*Obtienes un accestoken que va en los headers que jsonwebtoken genera.


#### Borrar usuario

```http
  DELETE /users/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ID`      | `string` | **Required**. Parametro requerido |


#### Obtener usuario por id

```http
  GET /users/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ID`      | `string` | **Required**. Parametro requerido |


#### Actualizar usuario

```http
  PATCH /users/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` |  Se puede actualizar el email |
| `password`      | `string` |  Se puede actualizar el password|


## Authors

- [@AxelTinoco](https://www.github.com/AxelTinoco)


## Documentation

[Documentation](https://linktodocumentation)

