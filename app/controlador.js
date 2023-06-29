const express = require('express');
const axios = require('axios');
const chalk = require('chalk')
const app = express();

async function controlador() {
	app.use(express.json());
	let temperaturaIdeal = 100;

	app.post('/controlador', (req, res) => {
		let temperaturaAtual = req.body.temperatura;
		console.log(`Temperatura atual: ${temperaturaAtual}`);

		if (temperaturaAtual < temperaturaIdeal) {
			console.log(chalk.hex('#C58ef5')('\n----- ANÁLISE DO CONTROLADOR ----- \nA temperatura está abaixo do ideal, precisa aumentar.\n'));
			console.log(chalk.hex('#C58ef5')(`Temperatura atual: ${temperaturaAtual}`));
			let aumento = Math.min(temperaturaIdeal - temperaturaAtual, 20); // calcula a diferença, limitada a 20
			console.log(chalk.hex('#C58ef5')(`Aumentando a temperatura em ${aumento} graus\n----- ANÁLISE DO CONTROLADOR ----- \n`));
			axios.post('http://localhost:4000/atuador', { comando: 'aumentar', valor: aumento });

		} else if (temperaturaAtual > temperaturaIdeal) {
			console.log(chalk.hex('#C58ef5')('\n----- ANÁLISE DO CONTROLADOR ----- \nA temperatura está acima do ideal, precisa diminuir\n'));

			console.log(chalk.hex('#C58ef5')(`Temperatura atual: ${temperaturaAtual}`));

			let diminuicao = Math.min(temperaturaAtual - temperaturaIdeal, 20); // calcula a diferença, limitada a 20

			console.log(chalk.hex('#C58ef5')(`Diminuindo a temperatura em ${diminuicao} graus\n----- ANÁLISE DO CONTROLADOR ----- \n`));

			axios.post('http://localhost:4000/atuador', { comando: 'diminuir', valor: diminuicao });
		} else {
			console.log(chalk.hex('#C58ef5')('A temperatura está ideal, mantenha\n----- ANÁLISE DO CONTROLADOR ----- \n'));
		}

		res.send({ status: 'OK' });
	});

	app.listen(3000, () => {
		console.log('Controlador ouvindo na porta 3000');
	});
}

controlador();
module.exports = controlador;