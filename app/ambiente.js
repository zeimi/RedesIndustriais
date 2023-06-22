const express = require('express');
const app = express();
app.use(express.json());

class Caldeira {
    constructor() {
        this.temperatura = 20; // temperatura inicial
    }

    aumentarTemperatura(valor, origem) {
        this.temperatura += valor; // aumenta a temperatura pelo valor passado
        if (origem === 'Atuador') {
            console.log(`Comando executado: aumentar. Origem: ${origem}. Temperatura resultante: ${this.temperatura}`);
        } else {
            console.log(`Temperatura aumentou por causa do ambiente. Temperatura resultante: ${this.temperatura}`);
        }
    }

    diminuirTemperatura(valor, origem) {
        this.temperatura -= valor; // diminui a temperatura pelo valor passado
        console.log(`Comando executado: diminuir. Origem: ${origem}. Temperatura resultante: ${this.temperatura}`);
    }

    getTemperatura() {
        return this.temperatura;
    }
}

let caldeira = new Caldeira();

// Aumenta a temperatura automaticamente a cada 15 segundos
setInterval(() => {
    let aumento = Math.floor(Math.random() * 15) + 1; // gera um número aleatório entre 1 e 15
    caldeira.aumentarTemperatura(aumento, 'Natural');
}, 15000);

app.get('/temperatura', (req, res) => {
    res.send({ temperatura: caldeira.getTemperatura() });
});

app.post('/temperatura', (req, res) => {
    let comando = req.body.comando;
    let valor = req.body.valor;
    let origem = req.body.origem;
    if (comando === 'aumentar') {
        caldeira.aumentarTemperatura(valor, origem);
    } else if (comando === 'diminuir') {
        caldeira.diminuirTemperatura(valor, origem);
    }
    res.send({ status: 'OK' });
});

app.listen(5000, () => {
    console.log('Caldeira ouvindo na porta 5000');
});
