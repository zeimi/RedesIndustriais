// Importando os módulos
const ambiente = require('./app/ambiente.js');
const atuador = require('./app/atuador.js');
const sensor = require('./app/sensor.js');
const controlador = require('./app/controlador.js');

// Executando cada arquivo individualmente
atuador();
ambiente();
controlador();
sensor();