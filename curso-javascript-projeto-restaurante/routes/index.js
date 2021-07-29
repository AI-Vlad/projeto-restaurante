
var conn = require('./../inc/db')
var express = require('express');
var router = express.Router();
var getDataHelper = require('./../inc/getDataHelper')
var reservations = require('./../inc/reservations')
var contact = require('./../inc/contact')




module.exports = (io) => {

  /* GET home page. */
  router.get('/', function (req, res, next) {

    getDataHelper.getMenus().then(result => {

      res.render('index', {

        title: 'Restaurante Saboroso',
        menus: result,
        isHome: true



      })

    })


  });

  router.get('/contacts', function (req, res, next) {

    contact.render(req, res)

  })

  router.post('/contacts', function (req, res, next) {



    for (let key in req.body) {
      if (!req.body[key]) {
        contact.render(req, res, "O campo " + key + " está vazio, favor preenche-lo!")

      }


    }


    contact.save(req.body).then(() => {

      io.emit('dashboard update')

      contact.render(req, res, "Obrigado " + req.body.name + " Sua mensagem foi enviada, te daremos um feedback em breve!")



    }).catch(err => {

      contact.render(req, res, err.message)

    })



  })

  router.get('/menus', function (req, res, next) {



    getDataHelper.getMenus().then(results => {

      res.render('menu', {

        title: 'Restaurante Saboroso',
        background: 'images/img_bg_1.jpg',
        h1: 'Saboreie nosso menu',
        menus: results


      })

    })


  })

  router.get('/reservations', function (req, res, next) {

    reservations.render(req, res)

  })


  router.post('/reservations', function (req, res, next) {

    for (let key in req.body) {
      if (!req.body[key]) {
        reservations.render(req, res, "O campo " + key + " está vazio, favor preenche-lo!")

      }


    }

    reservations.save(req.body).then(() => {

      io.emit('dashboard update')

      reservations.render(req, res, "Obrigado " + req.body.name + " Sua reserva foi feita!")



    }).catch(err => {

      reservations.render(req, res, err.message)

    })

  })

  router.get('/services', function (req, res, next) {

    res.render('services', {
      title: 'Restaurante Saboroso',
      background: 'images/img_bg_1.jpg',
      h1: 'É um prazer poder servir!'
    })

  })


  return router

};
