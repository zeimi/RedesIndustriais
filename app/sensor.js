const axios = require('axios');

setInterval(() => {
    axios.get('http://localhost:5000/temperatura')
        .then((response) => {
            console.log(`Temperatura medida: ${response.data.temperatura}`);
            axios.post('http://localhost:3000/sensor', { temperatura: response.data.temperatura })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
}, 10000); // pega a temperatura da caldeira a cada 10 segundos
