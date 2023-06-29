// Importando os arquivos para executar todos os arquivos juntos
const ambiente = require('./app/ambiente.js');
const atuador = require('./app/atuador.js');
const sensor = require('./app/sensor.js');
const controlador = require('./app/controlador.js');

// Executando cada arquivo individualmente
atuador();
ambiente();
controlador();
sensor();