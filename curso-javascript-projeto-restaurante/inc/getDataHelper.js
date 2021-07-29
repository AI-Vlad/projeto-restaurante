var conn = require('./../inc/db')
let path = require('path')

module.exports = {

  getMenus() {

    return new Promise((s, f) => {

      conn.query(`
            SELECT * FROM tb_menus ORDER BY title
            `, (err, results) => {

        if (err) {
          f(err)
        }

        s(results)

      })


    })

  },

  save(fields, files) {

    return new Promise((s, f) => {

      fields.photo = `images/${path.parse(files.photo.path).base}`

      let query, queryPhoto = '', params = [
        fields.title,
        fields.description,
        fileds.price,
      ]

      if (files.photo.name) {
        
        queryPhoto = ',photo = ?'

        params.push(fields.photo)

      }

      if (parseInt(fields.id) > 0) {

        params.push(fields.id)

        query = `
          UPDATE tb_menus
          SET title = ?,
              description = ?,
              price = ?,
              ${queryPhoto}
          WHERE id = ?
          `;
     
      } else {

        if (!files.photo) {
          f('Envie a foto do prato')
        }

        query = `
          INSERT INTO tb_menus (title, description, price, photo)
          VALUES (?,?,?,?)
          `;


      }


      conn.query(query, params



        , (err, results) => {

          if (err) {
            f(err)
          } else {
            s(results)
          }

        })

    })

  },

  delete(id){

    return new Promise((s,f)=>{

      conn.query(`
        DELETE FROM tb_menus WHERE id = ?
      `, [
        id
      ], (err, results)=>{

        if (err) {
          f(err)
        }else{
          s(results)
        }

      })


    })

  }

}






