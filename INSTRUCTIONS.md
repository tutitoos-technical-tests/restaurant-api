# Desafío Técnico

Autor: David Antón - Última modificación: 30 de mayo de 2023

## Prerrequisitos

- Node.js
- sequelize o una biblioteca ORM similar.
- nodemailer o una biblioteca de correo electrónico similar.
- Preferentemente en Typescript.
- Puedes usar cualquier biblioteca adicional que desees.

## Descripción del proyecto

Esta aplicación tiene como objetivo exponer una API REST que será consumida por un cliente (no es necesario implementar) para un restaurante. El modelo de la base de datos se encuentra al final de este documento. Tendremos pizzas, vendedores, pedidos y elementos del pedido.

Las entidades requeridas deben ser creadas de manera que sequelize o la biblioteca ORM elegida funcione correctamente con la base de datos. Hemos creado una base de datos simulada a la cual podrás conectarte y leer (pero no podrás actualizar/eliminar ningún registro). Las credenciales se proporcionarán junto con este documento.

Se requerirán los siguientes endpoints:

- GET /orders: devuelve la lista de IDs de pedidos actuales (todos los pedidos en la tabla "order").
- GET /order/:id: devuelve los detalles de un solo pedido.
- PUT /order: este endpoint recibirá un nuevo pedido con todos los elementos del pedido que el cliente desee (puedes codificar los IDs de las pizzas). Este endpoint tendrá que ejecutar un algoritmo de round robin entre todos los vendedores para determinar a qué vendedor se asignará el pedido. Hemos creado una columna llamada "round_robin_index" en la tabla "salesman" para ayudar con esta funcionalidad. Por lo tanto, la primera vez que llegue un pedido, se asignará al vendedor con el "round_robin_index" 1, el segundo pedido al que tenga el índice 2 y así sucesivamente. Una vez que todos los vendedores hayan sido asignados con un pedido, el proceso deberá reiniciarse con los vendedores que tengan el índice 1. Y así sucesivamente en un ciclo continuo. Si necesitas realizar algún cambio en la base de datos, puedes comentar en el código qué cambiarías en la base de datos y, en su lugar, usar un archivo en el proyecto como base de datos.

- (OPCIONAL) POST /thank-you: este último endpoint recibirá una dirección de correo electrónico y deberá enviar un correo electrónico a esa dirección agradeciendo al cliente por el pedido. Este endpoint no es obligatorio y se enviará a través de una cuenta de sandbox de Mailgun. Las credenciales se enviarán junto con las credenciales de la base de datos. Si deseas probar esta funcionalidad, envíanos tu dirección de correo electrónico para que puedas recibir correos electrónicos desde esta cuenta de sandbox.

## Modelo de base de datos

```sql
CREATE EXTENSION "pgcrypto";
DROP TABLE IF EXISTS pizza;
CREATE TABLE IF NOT EXISTS pizza(
    id uuid DEFAULT gen_random_uuid(),
    name varchar(255),
    price float,
    primary key (id)
);
DROP TABLE IF EXISTS salesman;
CREATE TABLE IF NOT EXISTS salesman(
    id uuid DEFAULT gen_random_uuid(),
    name varchar(255),
    round_robin_index integer,
    primary key (id)
);
DROP TABLE IF EXISTS "order";
CREATE TABLE IF NOT EXISTS "order"(
    id uuid DEFAULT gen_random_uuid(),
    salesman_id uuid,
    primary key (id),
    foreign key (salesman_id)

 references salesman (id)
);
DROP TABLE IF EXISTS order_item;
CREATE TABLE IF NOT EXISTS order_item(
    id uuid DEFAULT gen_random_uuid(),
    pizza_id uuid,
    order_id uuid,
    quantity integer,
    primary key (id),
    foreign key (pizza_id) references pizza (id),
    foreign key (order_id) references "order" (id)
);
```

Nota: La traducción y mejora de la descripción se ha realizado en markdown para mejorar la legibilidad y presentación del texto.
