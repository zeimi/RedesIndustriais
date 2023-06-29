// Importação de bibliotecas Node.js
const express = require('express');
const axios = require('axios');
const chalk = require('chalk');
const app = express();

async function atuador() { // Função que simula o funcionamento do atuador
    app.use(express.json());

    app.post('/atuador', (req, res) => { // Escuta requisições REST de método POST, vindas do CLP

        let comando = req.body.comando; // Destrincha a requisição e coleta o comando enviado
        let valor = req.body.valor;     // Destrincha a requisição e coleta o quanto será aumentado/diminuido da temperatura

        if (comando === 'aumentar') {
            // Exibe na tela do atuador qual comando foi executado
            console.log(chalk.hex('#7cecf9')(`\n----- COMANDOS DO ATUADOR ----- \nExecutando comando: aumentar temperatura em ${valor} graus\n----- COMANDOS DO ATUADOR ----- \n`));
        } else if (comando === 'diminuir') {
            // Exibe na tela do atuador qual comando foi executado
            console.log(chalk.hex('#7cecf9')(`\n----- COMANDOS DO ATUADOR ----- \nExecutando comando: diminuir temperatura em ${valor} graus\n----- COMANDOS DO ATUADOR ----- \n`));
        }

        // Cria uma requisição REST do método POST que simula a execução do comando recebido do CLP.
        axios.post('http://localhost:5000/temperatura', { comando: comando, valor: valor, origem: 'Atuador' })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error); // Exibe erros na tela do atuador
            });

        res.send({ status: 'OK' }); // Informa ao CLP que o comando foi executado com êxito.
    });

    app.listen(4000, () => {
        console.log('Simulação de atuador em execução');
    });
}

atuador(); // Função que executa a simulação do atuador

module.exports = atuador; // Exporta a função "atuador" para ser utilizado pelo arquivo main.js (opcional, não recomendado)