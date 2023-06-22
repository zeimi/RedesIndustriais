const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/sensor', (req, res) => {
    let temperaturaAtual = req.body.temperatura;
    let temperaturaIdeal = 100; // considerando 100 como a temperatura ideal para processamento do aço

    console.log(`Temperatura atual: ${temperaturaAtual}`);

    if (temperaturaAtual < temperaturaIdeal) {
        console.log('Temperatura abaixo do ideal, enviando comando para aumentar.');
        axios.post('http://localhost:4000/atuador', { comando: 'aumentar' })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    } else if (temperaturaAtual > temperaturaIdeal) {
        console.log('Temperatura acima do ideal, enviando comando para diminuir.');
        axios.post('http://localhost:4000/atuador', { comando: 'diminuir' })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        console.log('Temperatura ideal, mantendo a mesma.');
    }

    res.send({ status: 'OK' });
});

app.listen(3000, () => {
    console.log('Controlador ouvindo na porta 3000');
});
