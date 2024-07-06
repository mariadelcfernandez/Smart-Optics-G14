import MySql from "./../connections/MySQL.js";

export default class CategDaosMySQL extends MySql {
  constructor() {
    super()
    this.table = "categorias"
  }

  async getAllCategs() {
    const query = `SELECT
        cat_id as ID,
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
        where ma_id = cat_marca) as Marca
      FROM ${this.table}
      ORDER BY ID`
    const [result] = await this.connection.promise().query(query)
    return result
  }

  async getCategByID(id) {
    const query = 
      `SELECT
        cat_id as ID,
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
        where ma_id = cat_marca) as Marca
      FROM 	${this.table}
      WHERE	cat_id = ${id}`
    const [result] = await this.connection.promise().query(query)
    return result

  }

  async getCategByName(marca) {
    const query = 
    `SELECT
        cat_id as ID,
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
        where ma_id = cat_marca) as Marca
      FROM 	${this.table}
      WHERE	cat_marca = 
          (SELECT ma_id
              FROM mar_cat
              WHERE ma_nombre like "%${marca}%")`
    const [result] = await this.connection.promise().query(query)
    return result

  }

  async createCateg(categ) {
    const query = `
    INSERT INTO ${this.table}(
      cat_uso,
      cat_genero,
      cat_material,
      cat_montura,
      cat_tipo_lente,
      cat_tratamiento,
      cat_marca
      )
    SELECT
      (select uc_id
      from uso_cat
      where uc_nombre = "${categ.uso}"),
      (select gc_id
      from gen_cat
      where gc_nombre = "${categ.genero}"),
      (select mc_id
      from mat_cat
      where mc_nombre = "${categ.material}"),
      (select mo_id
      from mon_cat
      where mo_nombre = "${categ.montura}"),
      (select tl_id
      from tle_cat
      where tl_nombre = "${categ.tipo}"),
      (select tr_id
      from tra_cat
      where tr_nombre = "${categ.tratam}"),
      (select ma_id
      from mar_cat
      where ma_nombre = "${categ.marca}");`
    const [result] = await this.connection.promise().query(query)
    if (result.affectedRows = 1)
      return "Ok"
    else
      return "Error insertando"
  }
  async updateCateg(data) {
    const query = `UPDATE ${this.table}
      SET
        cat_uso = (
          select uc_id
          from uso_cat
          where uc_nombre = "${data.uso}"
              ),
        cat_genero = (
          select gc_id
          from gen_cat
          where gc_nombre = "${data.genero}"
              ),
        cat_material = (
          select mc_id
          from mat_cat
          where mc_nombre = "${data.material}"
              ),
        cat_montura = (
          select mo_id
          from mon_cat
          where mo_nombre = "${data.montura}"
              ),
        cat_tipo_lente = (
          select tl_id
          from tle_cat
          where tl_nombre = "${data.tipo}"
              ),
        cat_tratamiento = (
          select tr_id
          from tra_cat
          where tr_nombre = "${data.tratam}"
              ),
        cat_marca = (
          select ma_id
          from mar_cat
          where ma_nombre = "${data.marca}")
      WHERE cat_id = ${data.id}`
    const [result] = await this.connection.promise().query(query)
    if (result.affectedRows = 1)
      return "Ok"
    else
      return "Error actualizando"

  }
  async deleteCateg(id) {
    const query = `DELETE FROM ${this.table} WHERE cat_id = ${id}`
    const [result] = await this.connection.promise().query(query)
    if (result.affectedRows = 1)
      return "Ok"
    else
      return "Error eliminando"
  }
}