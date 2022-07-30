var express = require('express');  
var app = express(); 
const { render } = require('express/lib/response');
const path = require('path'); 
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":

// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false });  

const mongoose = require('mongoose');
const students = require('./models/user.js');

mongoose.connect('mongodb://localhost:27017/iiitn_hostel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(express.static('public')); 
 
app.get('/warden_register.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "warden_register.html" );  
})  
app.get('/warden_unregister.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "warden_unregister.html" );  
}) 
app.post('/process_post', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format  
   
   console.log(req.body); 
   var url = "mongodb://localhost:27017/";

   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("Students");
   dbo.collection("Details").insertOne(req.body, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
  });
});
   res.end("Details saved successfully in database.");  
})
app.post('/delpro_post', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format  
   
   console.log(req.body); 
   var url = "mongodb://localhost:27017/";

   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("Students");
   var myq = { _id : req.body._id }
   dbo.collection("Details").deleteOne(myq, function(err, res) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
  });
});
   res.end("Details deleted successfully from database.");  
})
app.use(express.json());
app.post('/sending', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format  
   
   console.log(req.body.code); 
   var myqr = req.body.code;
   var url = "mongodb://localhost:27017/";

   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("Students");
   var myq = { _id : myqr }
   dbo.collection("Details").findOne(myq, function(err, res) {
      if (err) throw err;
      var data = res;
      app.get("/", function (request, response){
         response.sendFile(__dirname+"/stuData.html");
      });
      app.post('/xender',urlencodedParser, function(req,res)
      {
         res.end(JSON.stringify(data));
      });
      db.close();
  });
});
   res.end("Kaam hogya");  
});   

app.use(bodyParser.json());

app.post('/login', (req, res) => {

   var student_id = req.body.studentID;
   var password = req.body.password;
   
   console.log(student_id);
   console.log(password);
   students.find({ _id: student_id }, (err, result) => {
               if (err) {
                   throw err;
               }
               else {
                   console.log(result);
                   res.json({ status: 'ok' });
               }
           });
});

var server = app.listen(8000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Listening at http://%s:%s", host, port)  
})