// Importação de bibliotecas do Node.js
const chalk = require('chalk'); // Biblioteca que colore os console.log no terminal
const express = require('express'); // Biblioteca que lida com servidores REST
const app = express(); // Constante app que se torna o servidor

class Caldeira { // Classe da caldeira
    constructor() {
        this.temperatura = 20; // temperatura inicial
    }

    aumentarTemperatura(valor, origem) { // Método da caldeira que aumenta a temperatura da variável

        this.temperatura += valor; // Soma a temperatura atual com a temperatura que foi aumentada

        if (origem === 'Atuador') { // Verifica a origem do comando para a análise do ambiente

            console.log(chalk.hex('#F7e500')(`----- ANÁLISE DO AMBIENTE ----- \nComando executado: aumentar. Origem: ${origem}\nTemperatura resultante: ${this.temperatura}\n----- ANÁLISE DO AMBIENTE -----\n`));

        } else { // Caso o aumento não tenha sido feito pelo atuador, foi pelo ambiente.
            console.log(chalk.hex('#F7e500')(`----- ANÁLISE DO AMBIENTE ----- \nTemperatura aumentou por causa do ambiente.\nTemperatura resultante: ${this.temperatura}\n----- ANÁLISE DO AMBIENTE ----- \n`));
        }
    }

    diminuirTemperatura(valor, origem) { // Método da caldeira que diminui a temperatura da variável

        this.temperatura -= valor; // Subtrai a temperatura atual com a temperatura que foi diminuida pelo atuador

        //Exibe no console a temperatura para a análise do ambiente
        console.log(chalk.hex('#F7e500')(`----- ANÁLISE DO AMBIENTE ----- \nComando executado: diminuir. Origem: ${origem}.\nTemperatura resultante: ${this.temperatura}\n----- ANÁLISE DO AMBIENTE ----- \n`));
    }

    getTemperatura() { // Método que coleta a temperatura
        return this.temperatura;
    }
}
async function ambiente() { // Função que simula o ambiente em produção
    app.use(express.json()); // Define o método de REST em JSON

    let caldeira = new Caldeira(); // "Liga" a caldeira no ambiente simulado

    // A cada 15 segundos a caldeira irá aumentar a temperatura por conta do ambiente industrial
    // Que na simulação não possui uma ventilação adequada
    setInterval(() => {
        let aumento = Math.floor(Math.random() * 15) + 1; // gera um número aleatório entre 1 e 15
        caldeira.aumentarTemperatura(aumento, 'Natural'); // Define a causa natural e aumenta a temperatura da caldeira
    }, 15000); // Milisegundos

    app.get('/temperatura', (req, res) => { // Caso a requisição REST tenha sido um GET (apenas o sensor tem essa capacidade)
        res.send({ temperatura: caldeira.getTemperatura() }); // O sensor coleta o valor da temperatura atual.
    });

    app.post('/temperatura', (req, res) => { // Caso a requisição REST tenha sido um POST (apenas o atuador tem essa capacidade)

        let comando = req.body.comando; // Distrincha o JSON e coleta o comando feito pelo atuador para a análise do ambiente

        let valor = req.body.valor; // Distrincha o JSON e coleta o valor da temperatura que foi afetado pelo atuador para a análise do ambiente

        let origem = req.body.origem; // Distrincha o JSON e coleta o responsável pelo comando (atuador) para a análise do ambiente

        if (comando === 'aumentar') { // Caso o comando tenha sido aumentar

            caldeira.aumentarTemperatura(valor, origem);  // O atuador varia a temperatura da caldeira

        } else if (comando === 'diminuir') { // Caso o comando tenha sido diminuir

            caldeira.diminuirTemperatura(valor, origem); // O atuador varia a temperatura da caldeira
        }

    });

    app.listen(5000, () => {
        console.log('Simulação do ambiente industrial iniciado.');
    });
}


ambiente(); // Executa a simulação do ambiente
module.export = ambiente; // Exporta a função "ambiente" para ser utilizado pelo arquivo main.js (opcional, não recomendado)