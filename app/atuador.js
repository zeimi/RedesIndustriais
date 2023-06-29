const express = require('express');
const axios = require('axios');
const chalk = require('chalk');
const app = express();

async function atuador() {
    app.use(express.json());

    app.post('/atuador', (req, res) => {
        let comando = req.body.comando;
        let valor = req.body.valor;

        if (comando === 'aumentar') {
            console.log(chalk.hex('#7cecf9')(`\n----- COMANDOS DO ATUADOR ----- \nExecutando comando: aumentar temperatura em ${valor} graus\n----- COMANDOS DO ATUADOR ----- \n`));
        } else if (comando === 'diminuir') {
            console.log(chalk.hex('#7cecf9')(`\n----- COMANDOS DO ATUADOR ----- \nExecutando comando: diminuir temperatura em ${valor} graus\n----- COMANDOS DO ATUADOR ----- \n`));
        }

        axios.post('http://localhost:5000/temperatura', { comando: comando, valor: valor, origem: 'Atuador' })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        res.send({ status: 'OK' });
    });

    app.listen(4000, () => {
        console.log('Atuador ouvindo na porta 4000');
    });
}

atuador();
module.exports = atuador;