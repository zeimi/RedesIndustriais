// Importação de bibliotecas Node.js
const axios = require('axios');
const chalk = require('chalk');

async function sensor() { // Função que simula o funcionamento do sensor

    setInterval(() => { // A cada 10 segundos o sensor irá medir a temperatura da caldeira

        axios.get('http://localhost:5000/temperatura') // Requisição REST utilizando o método GET no ambiente para medir a temperatura
            .then((medir) => {
                let temperaturaAtual = medir.data.temperatura; // Mede a temperatura

                console.clear() // Limpa a ultima informação da "Memória" do sensor, simulando um sensor real

                // Exibe a ultima temperatura medida pelo sensor na tela
                console.log(chalk.hex('#7dfba1')(`\n----- TEMPERATURA DO SENSOR ----- \nTemperatura medida: ${temperaturaAtual}\n----- TEMPERATURA DO SENSOR ----- \n`));

                axios.post('http://localhost:3000/controlador', { temperatura: temperaturaAtual }) // Requisição REST utilizando o método POST no CLP para enviar a temperatura
                    .then((res) => {
                    })
                    .catch((error) => { // Tratamento de erros ignorados (Sintaxe da biblioteca AXIOS)
                    });                 // Possíveis problemas: Não conseguiu alcansar o CLP/Ambiente
            })
            .catch((error) => {
            });
    }, 10000); // 10s em Milisegunos
}

sensor(); // Executa a simulação do sensor

module.exports = sensor; // Exporta a função "sensor" para ser utilizado pelo arquivo main.js (opcional, não recomendado)