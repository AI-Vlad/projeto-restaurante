
var conn = require('./db')

class Pagination {

    constructor(query, params = [], itensPerPage = 10) {

        this.query = query
        this.params = params
        this.itensPerPage = itensPerPage
        this.currentpage = 1

    }

    getPage(page) {

        this.currentpage = page - 1

        this.params.push(

            this.currentpage * this.itensPerPage,

            this.itensPerPage

        )


        return new Promise((s, f) => {


            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(';'), this.params, (err, results) => {

                if (err) {
                    f(err)
                } else {

                    this.data = results[0]
                    this.total = results[1][0].FOUND_ROWS
                    this.totalPages = Math.ceil(this.total / this.itensPerPage)
                    this.currentpage++

                    s(this.data)

                }

            })

        })

    }

    getTotal() {

        return this.total

    }

    getThisCurrentPage() {

        return this.currentpage

    }

    getTotalPages() {

        return this.totalPages

    }

    getNavigation(params) {

        let limitPagesNav = 5
        let links = []
        let start = 0;
        let end = 0;

        if (this.getTotalPages() < limitPagesNav) {
            limitPagesNav = this.getTotalPages()
        }

        //se estamos nas primeiras paginas

        if ((this.getThisCurrentPage() - parseInt(limitPagesNav / 2)) < 1) {
            start = 1
            end = limitPagesNav
        } else if ((this.getThisCurrentPage() + parseInt(limitPagesNav / 1)) > this.getTotalPages) {

            start = this.getTotalPages() - limitPagesNav
            end = this.getTotalPages()

        } else {

            start = this.getThisCurrentPage() - parseInt(limitPagesNav / 2)
            end = this.getThisCurrentPage() - parseInt(limitPagesNav / 2)

        }

        if (this.getThisCurrentPage()>1) {
            links.push({

                text:'<',
                href: '?' + this.getQueryString(Object.assign({}, params, {page: this.getThisCurrentPage-1}))

            })
        }

        for (let x = start; x < end; x++) {

            links.push({

                text: x,
                href: '?' + this.getQueryString(Object.assign({}, params, { page: x })),
                active: (x === this.getThisCurrentPage())

            })

        }

        if (this.getThisCurrentPage() < this.getTotalPages()) {
            
            links.push({

                text:'>',
                href: '?' + this.getQueryString(Object.assign({}, params, {page: this.getThisCurrentPage+1}))

            })

        }

        return links


    }

    getQueryString(params) {

        let queryString = []

        for (const name in params) {
            queryString.push(`${name}= ${params[name]}`)

        }



        return queryString.join("&")

    }




}

module.exports = Pagination