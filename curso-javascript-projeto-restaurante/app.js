var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var redisConnnect = require('./middleware/redisConnect')
var formidable = require('formidable')
var path = require('path')
var http = require('http')
var socket = require('socket.io')


var app = express();

var http = http.Server(app)
var io = socket(http)

io.on('connection', function(socket){

  console.log('novo usuário conectado')

 

})

var indexRouter = require('./routes/index')(io);
var adminRouter = require('./routes/admin')(io);


app.use((req, res, next) => {

  req.body = {}
  if (req.method === "POST") {
    let form = formidable.IncomingForm({

      uploadDir: path.join(__dirname, "/public/images"),
      keepExtensions: true

    })
    form.parse(req, (err, fields, files) => {

      req.body = fields

      req.fields = fields;
      req.files = files

      next()

    })
  } else {
    next()
  }

})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// const redis = require('redis')
// const session = require('express-session')
// let RedisStore = require('connect-redis')(session)

// let redisClient = redis.createClient()

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     saveUninitialized: true,
//     secret: 'keyboard cat',
//     resave: true,
//   })
// )

redisConnnect(app).then(success => {

  console.log('conectado ao REDIS')


})

app.use(logger('dev'));

// app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(3000, ()=>{

  console.log('servidor em execução')

})


