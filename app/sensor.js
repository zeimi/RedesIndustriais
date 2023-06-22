const axios = require('axios');

setInterval(() => {
    axios.get('http://localhost:5000/temperatura')
        .then((response) => {
            let temperaturaAtual = response.data.temperatura;
            console.log(`Temperatura medida: ${temperaturaAtual}`);
            axios.post('http://localhost:3000/controlador', { temperatura: temperaturaAtual })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
}, 10000);
