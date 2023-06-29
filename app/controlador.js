// Importação de bibliotecas Node.js
const express = require('express');
const axios = require('axios');
const chalk = require('chalk')

async function controlador() { // Função que simula um Controlador Lógico Programável
	const app = express();
	app.use(express.json());

	let temperaturaIdeal = 100; // O CLP foi programado para que deixe a temperatura da caldeira à 100° Celcius.

	app.post('/controlador', (req, res) => { // Escuta requisições REST do método POST (do sensor) para receber a temperatura atual
		let temperaturaAtual = req.body.temperatura;
		console.log(`Temperatura atual: ${temperaturaAtual}`); // Exibe a temperatura atual na tela de usuário do CLP

		if (temperaturaAtual < temperaturaIdeal) { // Verifica se a temperatura atual está abaixo do ideal

			//Exibe informações na tela do usuário do CLP
			console.log(chalk.hex('#C58ef5')('\n----- ANÁLISE DO CONTROLADOR ----- \nA temperatura está abaixo do ideal, precisa aumentar.\n'));
			console.log(chalk.hex('#C58ef5')(`Temperatura atual: ${temperaturaAtual}`));

			let aumento = Math.min(temperaturaIdeal - temperaturaAtual, 20); // Calcula a diferença, limitada a 20 por comando

			//Exibe informações na tela do usuário do CLP
			console.log(chalk.hex('#C58ef5')(`Aumentando a temperatura em ${aumento} graus\n----- ANÁLISE DO CONTROLADOR ----- \n`));

			axios.post('http://localhost:4000/atuador', { comando: 'aumentar', valor: aumento }); // Envia o comando ao Atuador

		} else if (temperaturaAtual > temperaturaIdeal) { // Verifica se a temperatura atual está acima do ideal

			//Exibe informações na tela do usuário do CLP
			console.log(chalk.hex('#C58ef5')('\n----- ANÁLISE DO CONTROLADOR ----- \nA temperatura está acima do ideal, precisa diminuir\n'));
			console.log(chalk.hex('#C58ef5')(`Temperatura atual: ${temperaturaAtual}`));

			let diminuicao = Math.min(temperaturaAtual - temperaturaIdeal, 20); // calcula a diferença, limitada a 20 por comando

			//Exibe informações na tela do usuário do CLP
			console.log(chalk.hex('#C58ef5')(`Diminuindo a temperatura em ${diminuicao} graus\n----- ANÁLISE DO CONTROLADOR ----- \n`));

			axios.post('http://localhost:4000/atuador', { comando: 'diminuir', valor: diminuicao }); // Envia o comando ao Atuador

		} else { // Caso a temperatura seja igual à ideal

			//Exibe informações na tela do usuário do CLP
			console.log(chalk.hex('#C58ef5')('A temperatura está ideal, mantenha\n----- ANÁLISE DO CONTROLADOR ----- \n'));
		}

	});

	app.listen(3000, () => { // Inicia o CLP na simulação
		console.log('Iniciando simulação de sistema CLP');
	});
}

controlador(); // Função que inicia o CLP

module.exports = controlador; // Exporta a função "controlador" para ser utilizado pelo arquivo main.js (opcional, não recomendado)