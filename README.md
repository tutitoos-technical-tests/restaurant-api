[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Tutitoos_restaurant-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Tutitoos_restaurant-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Tutitoos_restaurant-api&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Tutitoos_restaurant-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Tutitoos_restaurant-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Tutitoos_restaurant-api)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Tutitoos_restaurant-api&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Tutitoos_restaurant-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Tutitoos_restaurant-api&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Tutitoos_restaurant-api)

# API para Restaurante

Este proyecto consiste en desarrollar una API REST para un restaurante. La API será consumida por un cliente y permitirá gestionar pedidos de pizzas. Se utilizará una base de datos simulada con las entidades de pizzas, vendedores, pedidos y elementos del pedido.

## Modelo de base de datos

```sql
CREATE EXTENSION "pgcrypto";

DROP TABLE IF EXISTS order_item;
CREATE TABLE IF NOT EXISTS order_item(
    id UUID DEFAULT gen_random_uuid(),
    pizza_id UUID,
    order_id UUID,
    quantity INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (pizza_id) REFERENCES pizza(id),
    FOREIGN KEY (order_id) REFERENCES "order"(id)
);

DROP TABLE IF EXISTS pizza;
CREATE TABLE IF NOT EXISTS pizza(
    id UUID DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    price FLOAT,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS salesman;
CREATE TABLE IF NOT EXISTS salesman(
    id UUID DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    round_robin_index INTEGER,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS "order";
CREATE TABLE IF NOT EXISTS "order"(
    id UUID DEFAULT gen_random_uuid(),
    salesman_id UUID,
    PRIMARY KEY (id),
    FOREIGN KEY (salesman_id) REFERENCES salesman(id)
);
```

## Endpoints

La API requerirá los siguientes endpoints:

### GET /orders

Devuelve la lista de IDs de los pedidos actuales. Esta consulta obtiene todos los pedidos almacenados en la tabla "order".

### GET /order/:id

Devuelve los detalles de un solo pedido identificado por su ID. Proporciona información detallada sobre el pedido, incluyendo los elementos del pedido y los datos del cliente.

### PUT /order

Permite crear un nuevo pedido con todos los elementos necesarios. Este endpoint recibe el pedido junto con los elementos del mismo que el cliente desea. La lógica del endpoint utiliza un algoritmo de round robin para asignar el pedido a un vendedor. El algoritmo utiliza la columna "round_robin_index" de la tabla "salesman" para determinar a qué vendedor se asignará el pedido. Los pedidos se asignan secuencialmente a los vendedores en función del índice, reiniciándose el proceso cuando todos los vendedores han sido asignados.

### POST /thank-you

Este endpoint opcional recibe una dirección de correo electrónico y envía un correo electrónico de agradecimiento al cliente por su pedido. Utiliza una cuenta de sandbox de Mailgun para enviar los correos electrónicos. Las credenciales para la cuenta de sandbox se proporcionarán junto con las credenciales de la base de datos. Este endpoint no es obligatorio, pero puede implementarse para mejorar la interacción con el cliente.

## Tecnologías utilizadas

-   Node.js (17)
-   Express (4.18.2)
-   Sequelize (6.32.0)
-   Nodemailer (6.9.3)
-   TypeScript (5.1.3)

## Instrucciones de instalación y uso

Sigue los pasos a continuación para instalar y ejecutar la aplicación:

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Clona el repositorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

    ```
    npm install
    ```

4. Crea un archivo `.env` en la

raíz del proyecto y proporciona las siguientes variables de entorno:

```
PORT=4000
DEBUG=system:*
PG_DATABASE=<Nombre de la base de datos>
PG_USER=<Usuario de la base de datos>
PG_PASSWORD=<Contraseña de la base de datos>
PG_HOST=<Dirección de host de la base de datos>
PG_PORT=<Puerto de la base de datos>
EMAIL_SMTP_HOST=<Host del servidor SMTP>
EMAIL_SMTP_PORT=<Puerto del servidor SMTP>
EMAIL_SMTP_USERNAME=<Nombre de usuario del servidor SMTP>
EMAIL_SMTP_PASSWORD=<Contraseña del servidor SMTP>
```

5. Ejecuta el siguiente comando para compilar el proyecto:

    ```
    npm run build
    ```

    Este comando compilará el código TypeScript y generará el código JavaScript listo para ser ejecutado.

6. Ejecuta el siguiente comando para iniciar la aplicación:

    ```
    npm run start
    ```

    Esto iniciará el servidor y la API estará disponible en `http://localhost:<puerto>`, donde `<puerto>` es el puerto configurado en las variables de entorno.

## Pruebas

El proyecto incluye pruebas automatizadas para garantizar la calidad del código y el correcto funcionamiento de la API. Para ejecutar las pruebas, sigue estos pasos:

1. Asegúrate de haber completado los pasos de instalación y tener todas las dependencias instaladas.
2. Ejecuta el siguiente comando para ejecutar las pruebas:

    ```
    npm test
    ```

    Esto ejecutará los casos de prueba utilizando el framework Jest.

3. Para obtener información sobre la cobertura de las pruebas, ejecuta el siguiente comando:

    ```
    npm run coverage
    ```

    Esto generará un informe de cobertura que puedes consultar para evaluar la calidad de las pruebas realizadas.

Se recomienda escribir pruebas para cada uno de los endpoints y las funcionalidades clave de la API.

## Autor

Este proyecto fue desarrollado por Guillem Travé Font.
