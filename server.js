console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
var nodemailer = require('nodemailer');

// serve files from the public directory
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url = 'mongodb://ThaparUser:Pass#123@ds227865.mlab.com:27865/makerspace';

MongoClient.connect(url, (err, database) => {
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(8080, () => {
        console.log('listening to 8080');
    })
});

// serve the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  app.get('/video', (req, res) => {
    res.sendFile(__dirname + '/public/videos/makerspacetiet.mp4');
  });


app.get('/team',(req,res) => {
    res.sendFile(__dirname + '/gallery.html');
});
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'manmeetkaur18102000@gmail.com',
        pass: 'Gigobibo1#1'
    },
    tls: {
        rejectUnauthorized: true
    }
});

app.post('/query', (req, res) => {
    console.log(req.body);
    var eventquery = req.body;
  
    db.collection('eventquery').save(eventquery, (err, result) => {
      console.log(err);
      console.log(result)
      if (err) {
        res.send([{
          message: 'Some error occurred',
          status: false
        }]);
      }
      else {
        let HelperOptions = {
          from: 'GBM918211@gmail.com',
          to: eventquery.email,
          subject: "hello!",
          text: 'Your query will be resolved soon',
  
        };
        transporter.sendMail(HelperOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log("message sent");
          }
        });
  
        res.send([{
          message: 'Request successfully logged',
          status: true
        }]);
      }
    });
  });