const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let temperaturaIdeal = 100;

app.post('/controlador', (req, res) => {
	let temperaturaAtual = req.body.temperatura;
	console.log(`Temperatura atual: ${temperaturaAtual}`);

	if (temperaturaAtual < temperaturaIdeal) {
		console.log('A temperatura está abaixo do ideal, precisa aumentar');
		let aumento = Math.min(temperaturaIdeal - temperaturaAtual, 20); // calcula a diferença, limitada a 20
		console.log(`Aumentando a temperatura em ${aumento} graus`);
		axios.post('http://localhost:4000/atuador', { comando: 'aumentar', valor: aumento });
	} else if (temperaturaAtual > temperaturaIdeal) {
		console.log('A temperatura está acima do ideal, precisa diminuir');
		let diminuicao = Math.min(temperaturaAtual - temperaturaIdeal, 20); // calcula a diferença, limitada a 20
		console.log(`Diminuindo a temperatura em ${diminuicao} graus`);
		axios.post('http://localhost:4000/atuador', { comando: 'diminuir', valor: diminuicao });
	} else {
		console.log('A temperatura está ideal, mantenha');
	}

	res.send({ status: 'OK' });
});

app.listen(3000, () => {
	console.log('Controlador ouvindo na porta 3000');
});
