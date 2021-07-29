var conn = require('./db')

module.exports = {

    render(req, res, error, success) {

        

        res.render('contact', {
            title: 'Restaurante Saboroso',
            background: 'images/img_bg_3.jpg',
            h1: 'Diga Olá',
            body: req.body,
            error,
            success
          })

        console.log(error)


    },

    save(fields) {

        return new Promise((s, f) => {

           
        

            conn.query('INSERT INTO tb_contacts (name, email, message) VALUES (?, ?, ?)',
                [fields.name, fields.email, fields.message],
                (err, results) => {

                    if (err) {
                        f(err)
                    }

                    s(results)


                }
            )


        })


    },

    getContacts() {

        return new Promise((s, f) => {

            conn.query(`
                SELECT * FROM tb_contacts ORDER BY name
                `, (err, results) => {

                if (err) {
                    f(err)
                }

                s(results)

            })


        })

    },

    delete(id) {

        return new Promise((s, f) => {

            conn.query(`
            DELETE FROM tb_contacts WHERE id = ?
          `, [
                id
            ], (err, results) => {

                if (err) {
                    f(err)
                } else {
                    s(results)
                }

            })


        })

    },


}