
var fs = require('fs');
var express = require('express');

const port = process.argv[2];

if (!port) {
  throw Error('Port was not provided.. Exiting.');
}

///////////////////////////////////////////////////////////////////////////////
// DATA
///////////////////////////////////////////////////////////////////////////////

var data = fs.readFileSync('/home/rtctest/rtctest/src' + '/assets/data.json', 'utf-8');
var systems = JSON.parse(data);

const CLIMATIC = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 23];
const MECHANIC = [16, 17, 18, 19, 20, 21, 22];
const VACUUM = [13, 14, 15];

var mechanicSystems =
  systems.filter((s) => MECHANIC.indexOf(parseInt(s.code)) > -1);

var vacuumSystems =
  systems.filter((s) => VACUUM.indexOf(parseInt(s.code)) > -1);

var climaticSystems =
  systems.filter((s) => CLIMATIC.indexOf(parseInt(s.code)) > -1);


///////////////////////////////////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////////////////////////////////

var app = express();

app.set('views', '/home/rtctest/rtctest/src/views');
app.set('view engine', 'pug');
app.use(express.static('/home/rtctest/rtctest/src' + '/public'));

app.get('/', function(req, res) {
  res.render('index', {
    climatic: climaticSystems,
    vacuum: vacuumSystems,
    mechanic: mechanicSystems
  });
});

app.get('/systems/:id', function(req, res) {
  let system = systems.filter((s) => s.code === req.params.id)[0];
  if (system != null) {
    res.render('system', {
      system: system
    });
  }
  else {
    res.status(404).send('Такой страницы не существует');
  }
});

app.get('/sertificate', function(req, res) {
  res.render('sertificate', {});
});

///////////////////////////////////////////////////////////////////////////////
// INIT
///////////////////////////////////////////////////////////////////////////////
app.listen(port, function() { console.log('Listening on ' + port + '..')});
