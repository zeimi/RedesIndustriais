const axios = require('axios');
const chalk = require('chalk');

async function sensor() {
    setInterval(() => {
        axios.get('http://localhost:5000/temperatura')
            .then((response) => {
                let temperaturaAtual = response.data.temperatura;
                console.clear()
                console.log(chalk.hex('#7dfba1')(`\n----- TEMPERATURA DO SENSOR ----- \nTemperatura medida: ${temperaturaAtual}\n----- TEMPERATURA DO SENSOR ----- \n`));
                axios.post('http://localhost:3000/controlador', { temperatura: temperaturaAtual })
                    .then((res) => {
                        //console.log(res.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }, 10000);
}

sensor();
module.exports = sensor;