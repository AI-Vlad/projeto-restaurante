var conn = require('./db')

module.exports = {

    render(req, res, error) {

        res.render("admin/login", {
            body: req.body,
            error

        })


    },


    login(email, password) {

        return new Promise((s, f) => {


            conn.query(`
            SELECT * FROM tb_users WHERE email = ?
            `, [
                email
            ], (err, results) => {

                if (err) {
                    f(err)
                } else {

                    if (!results.length > 0) {
                        f('usuário ou senha incorretos')
                    } else {
                        let row = results[0]

                        if (row.password !== password) {
                            f('usuário ou senha incorretos')
                        } else {

                            s(row)

                        }

                    }



                }

            })

        })


    },

    getUsers() {

        return new Promise((s, f) => {

            conn.query(`
                SELECT * FROM tb_users ORDER BY name
                `, (err, results) => {

                if (err) {
                    f(err)
                }

                s(results)

            })


        })

    },

    save(fields) {

        return new Promise((s, f) => {




            let query, params = [fields.name, fields.email]

            if (parseInt(fields.id) > 0) {
                query = `
                UPDATE tb_users
                SET
                name =?,
                email =?,
                WHERE id = ?
                
                `;

                params.push(fileds.id)

            } else {

                query = `
                INSERT INTO tb_users (name, email, password) VALUES (?, ?, ?)
                `;

                params.push(fileds.password)
            }

            conn.query(query, params,

                (err, results) => {

                    if (err) {
                        f(err)
                    }

                    s(results)


                }
            )


        })


    },

    delete(id) {

        return new Promise((s, f) => {

            conn.query(`
            DELETE FROM tb_users WHERE id = ?
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

    changePassword(req) {

        return new Promise((s, f) => {

            if (!req.fields.password) {
                f("Preencha à senha!")
            } else if (req.fileds.password !== req.fields.passwordConfirm) {

                f('Às senhas digitadas não condizem!')
            } else {

                conn.query = `
                UPDATE tb_users
                SET password
                WHERE id = ?
                
                `, [

                    req.fields.password,
                    req.fields.id

                ], (err, results)=>{

                    if (err) {
                        f(err)
                    }else{

                        s(results)

                    }

                }

            }


        })

    }



}