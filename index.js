const admin = require('firebase-admin');
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require ('mongoose');
var schedule = require('node-schedule');
var fs = require('fs');
var restify = require("restify");
var server = restify.createServer();

admin.initializeApp({
  credential: admin.credential.cert('./TRMAPI-70c9ddc816d9.json'),
  databaseURL: 'https://trmapi-f8089.firebaseio.com/',
});

const db = admin.database();


const ref = db.ref('indicadores');
var j = schedule.scheduleJob('10 * * * * *',  function(){


req = request.defaults({
	jar: true,
	rejectUnauthorized: false,
	followAllRedirects: true
});
    req.get({
    url: "https://www.superfinanciera.gov.co",
    headers: {
        'User-Agent': 'Super Cool Browser'
     }
        },function(err, resp, body) {
            var $ = cheerio.load(body);
            var TRM = $('.cont_Indicador table tbody tr:nth-child(2) td:nth-child(2)').first().text();

    req.get({
        url: "https://weather.com/es-ES/tiempo/hoy/l/COXX0004:1:CO",
        headers: {'User-Agent': 'Avtuali'}
        },function(err, resp, body) {
                   var $ = cheerio.load(body);
                   var TEMP = $('.today_nowcard-temp span').first().text();

    req.get({
            url: "https://weather.com/es-ES/tiempo/hoy/l/COXX0004:1:CO",
            headers: {'User-Agent': 'minui'}
            },function(err, resp, body) {
                    var $ = cheerio.load(body);
                    var HUM = $('.today_nowcard-sidecar table tbody tr:nth-child(2) td span span').first().text();

    req.get({
            url: "https://weather.com/es-ES/tiempo/hoy/l/COXX0004:1:CO",
            headers: {'User-Agent': 'lesraer'}
            },function(err, resp, body) {
                    var $ = cheerio.load(body);
                    var TXT = $('.today_nowcard-phrase').first().text();

    req.get({
            url: "http://www.worldometers.info/es/",
            headers: {'User-Agent': 'Avtuali'}
            },function(err, resp, body) {
                    var $ = cheerio.load(body);
                    var finance = $('#tablemore  tbody  tr:nth-child(22)  td:nth-child(1) div  span .rts-nr-10e0').first().text();

    req.get({
            url: "http://www.calendariodecolombia.com/pico-y-placa/bogota",
            headers:{'User-Agent':'cOOL'}
            },function(err, resp, body) {
                    var $ = cheerio.load(body);
                    var PPC = $('.revolution-ch2 span').text();

      const usersRef = ref.child('Indexers');
      usersRef.set({
                TasaRM:  TRM,
                Picoyplaca:  PPC,
                Fecha_Actualizacion: Date(),
                Temperatura: TEMP,
                Descripcion: TXT,
                Humedad: HUM,
    });
    var starCountRef = firebase.database().ref('Indexers');
    starCountRef.on('value', function(snapshot) {
      updateStarCount(postElement, snapshot.val());
    });

    function respond(req, res, next) {
        res.send(starCountRef);
    }
    
    server.get('/', respond);
    

    var port = process.env.PORT || 5000;
    server.listen(port, function() {
        console.log("Listening on " + port);
    });
            });
          });
       });
      });
     });
    });
   });
//Sergio Esteban Junco Castro --- chechomindtricks@gmail.com
