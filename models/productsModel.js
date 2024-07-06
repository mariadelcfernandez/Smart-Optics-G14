export default class Producto{
  constructor(referencia, descripcion, categoria, imagen, stock, smin, costo, precio, estado){
    this.referencia = referencia
    this.descripcion = descripcion
    this.categoria = categoria
    this.imagen = imagen
    this.stock = stock
    this.smin = smin
    this.costo = costo
    this.precio = precio
    this.estado = estado
  }
}