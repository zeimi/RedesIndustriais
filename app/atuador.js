const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/atuador', (req, res) => {
    let comando = req.body.comando;

    if (comando === 'aumentar') {
        console.log('Executando comando: aumentar temperatura');
    } else if (comando === 'diminuir') {
        console.log('Executando comando: diminuir temperatura');
    }

    axios.post('http://localhost:5000/temperatura', { comando: comando, valor: 5, origem: 'Atuador' })
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
