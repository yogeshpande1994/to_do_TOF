var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// MongoDB connectivity
var MongoClient = require('mongodb').MongoClient;
var mongo=require('mongojs');
var ObjectID=mongo.ObjectID;
const{ request} = require ("http");
var db=mongo('localhost:27017/todolist',['list']);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use(cors())

// ****************Banked ERROR---------------------

app.post("/add_todolist",function(req,res,next){
	console.log("--------------addd--------",req.body)
	var new_task = req.body.new_task
  console.log("new_task=new_task",new_task)
	db.list.insert({new_task:new_task},function(err,results){

		res.send({status:true,message:"Insert To-do-List Successfully"})
    console.log("results",results);
    if (err) {
      res.status(true).send({message:"Add Succesfully Data"})
  }else{
      res.send({message:"Add Succesfully Data"})
  }
	})
});

//  *********************** fetch user ***********************************
app.post("/fetch_todolist",function(req,res,next){
	console.log("++ **************** fetch_todolist****************** ++",req.body);
	db.list.find({}).toArray(function(erro,results){
			res.send({status:true,message:"Data Found",data:results})
	})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(1111,function(){
  console.log("Server Start At Post No 1111");
  console.log("welcome to TOF Project TO-DO_LIST");
})