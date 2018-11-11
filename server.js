var express         = require('express');
var bodyParser      = require('body-parser');
var mysql           = require('mysql');
var send           = require('./sendFcm')

const app       = express();
config          = require('config');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const port = process.env.PORT || config.get('PORT')

app.get('/bulk_send_notification', send.sendPush);

connection = mysql.createConnection(config.get('database_settings'));
    
    connection.connect(function(err) {             
        if(err) {                                     
            console.log('error when connecting to db:', err);
        }else{
            console.log('database connected at...', config.get('database_settings.mysqlPORT'));
        }                                    
    });                                    

const server = app.listen(port, function () {
    console.log(`Server running at ${port} `);
});