var conn = require('./db')

module.exports = {

    render(req, res, error, success) {

        

        res.render('emails', {
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

           
        

            conn.query('INSERT INTO tb_emails (email) VALUES (?)',
                [fields.email],
                (err, results) => {

                    if (err) {
                        f(err)
                    }

                    s(results)


                }
            )


        })


    },

    getEmails() {

        return new Promise((s, f) => {

            conn.query(`
                SELECT * FROM tb_emails ORDER BY email
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
            DELETE FROM tb_emails WHERE id = ?
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