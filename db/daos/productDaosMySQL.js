import MySql from "./../connections/MySQL.js";

export default class ProductDaosMySQL extends MySql {
  constructor() {
    super()
    this.table = "productos"
  }

  async getAllProducts() {
    const query = 
      `SELECT
        p_referencia as Referencia,
        p_descripcion as Descripción,
        (select uc_nombre
        from uso_cat
        where uc_id = cat_uso)  as Aplicación,
        (select gc_nombre
        from gen_cat
        where gc_id = cat_genero) as Para,
        (select mc_nombre
        from mat_cat
        where mc_id = cat_material) as Material,
        (select mo_nombre
        from mon_cat
        where mo_id = cat_montura) as Montura,
        (select tl_nombre
        from tle_cat
        where tl_id = cat_tipo_lente) as Tipo,
        (select tr_nombre
        from tra_cat
        where tr_id = cat_tratamiento) as Tratamiento,
        (select ma_nombre
        from mar_cat
        where ma_id = cat_marca) as Marca,
        p_precio as Oferta,
        p_stock_act as Quedan
      FROM 	${this.table}, categorias
      WHERE 	p_categoria = cat_id
      ORDER BY Marca`
    const [result] = await this.connection.promise().query(query)
    return result
  }

  async getProductByID(referencia) {
    const query = `select * from ${this.table} where p_referencia = "${referencia}"`
    const [result] = await this.connection.promise().query(query)
    console.log(result)
    return result

  }

  async getProductByName(descripcion) {
    const query = `select * from ${this.table} where p_descripcion like "\%${descripcion}\%"`
    console.log(query)
    const [result] = await this.connection.promise().query(query)
    console.log(result)
    return result

  }

  async createProduct(product) {
    const query = `insert into ${this.table} (p_referencia, p_descripcion, p_categoria, p_imagen, p_stock_act, p_stock_min, p_costo, p_precio, p_estado) 
    values
    ("${product.referencia}", "${product.descripcion}", ${product.categoria}, "${product.imagen}", ${product.stock}, ${product.smin}, ${product.costo}, ${product.precio}, ${product.estado})`
    const [result] = await this.connection.promise().
    query(query)
    if (result.affectedRows = 1)
      return "Ok"
    else
      return "Error insertando"
  }

  async updateProduct(data) {
    const query = `UPDATE ${this.table} SET
      p_descripcion = "${data.descripcion}", 
      p_categoria = "${data.categoria}", 
      p_imagen = "${data.imagen}", 
      p_stock_min = ${data.smin}, 
      p_precio = ${data.precio}, 
      p_estado = ${data.estado}
      WHERE p_referencia = "${data.referencia}"`
    const [result] = await this.connection.promise().query(query)
    if (result.affectedRows = 1)
      return "Ok"
    else
      return "Error actualizando"

  }
  async deleteProduct(referencia) {
    const query = `DELETE FROM ${this.table} WHERE p_referencia = "${referencia}"`
    const [result] = await this.connection.promise().query(query)
    console.log(query)
    console.log(result)
    if (result.affectedRows = 1)
      return "Ok"
    else
      return "Error eliminando"
  }
}