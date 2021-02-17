# AZinStock
AZinStock es un simulador de un sistema de venta y control de inventarios.
•	Para fines prácticos, se ha precargado una base de datos simulada, con 50 ítems, la cual va desde el Id: 1000 hasta el Id: 1049.
•	La base de datos será cargada al localStorage, por una única vez, permitiendo preservar todos los cambios que el usuario realice, aunque se reinicie el navegador.

## Ventas
•	Facturación: Se debe ingresar los datos del cliente, posteriormente se ingresan los Items/productos comprados por el cliente.
La búsqueda se realiza por Id, por ejemplo, si se escribe 1001 en el campo Id, automáticamente se mostrará el nombre del Item/producto, producto: Impresora, precio: $2.060.000.

•	Factura: Al lado derecho de Facturación, se mostrará, la respectiva factura se la venta realizada. Allí podrá Imprimirla, además de consultar el valor estimado de la mensualidad del Crédito del total a pagar, calculado con interés compuesto.

## Compras
•	De la misma manera que en facturación, aquí se utiliza el Id del producto para buscar los productos y así poder añadir stock a unidades existentes.

## Inventario
•	Allí se podrá consultar la totalidad del inventario de productos, verificar Ids existentes, realizar búsquedas y verificar los cambios hechos en otras secciones.
## Nuevo Producto
•	En esta sección, se podrá añadir un nuevo producto a la base de datos.
•	El Id debe ser nuevo, de lo contrario el sistema no permitirá crear productos con Id ya existentes en la base de datos.
## Eliminar Producto
•	Elimina Item/producto según Id.
## Soporte
•	¡Estoy Atento! XD
