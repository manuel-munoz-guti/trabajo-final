# Trabajo Final de diplomado USIP
## Backend con servidor Express
** Author: Jose Manuel Munoz Gutierrez **


Crear un REST API para un carrito de compras. Este API debe tener los siguientes servicios:

Products (Productos) Todas autenticadas
GET /api/v1/products  --Listar todos los productos
GET /api/v1/products/:id  --Obtener un producto
POST /api/v1/products -- Insertar producto
PUT /api/v1/products/:id --Modificar producto
DELETE /api/v1/products/:id -- Eliminar producto
Users (Usuarios)Todas autenticadas

GET /api/v1/users  -- Listar todos los usuarios
GET /api/v1/users/:id -- Obtener un usuario
POST /api/v1/users  -- Crear usuario
PUT /api/v1/users/:id -- Modificar Usuario
DELETE /api/v1/users/:id -- Eliminar usuario
Auth (Autenticacion) Sin autenticacion

GET /api/v1/auth/login  -- Autentica usuario y devuelve JWT
Shopping Cart (Carrito de compras) Todas autenticadas

POST /api/v1/cart/product  -- Si existe un shopping cart que este en estado PENDING anadir el producto a ese carrito, si no creamos el carrito de compras y anadimos el primer producto
DELETE /api/v1/cart/product/:id -- Si existe un shopping cart que este en estado pending y que tenga ese producto removemos el producto de ese carrito, sino damos error
POST /api/v1/cart/pay -- Paga el carrito que este en estado pendiente con minimo un producto en el. Si no existe un carrito con estas caracteristicas se dispara un error



El modelo de shoping cart tendra al menos los siguientes atributos:

user: El usuario que realiza la compra
status: PENDING o PAID
products: un array o una tabla con id del producto, precio de venta  y cantidad