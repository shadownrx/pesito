const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

const votes = {};
const fights = [
    'shoshua vs eso tilin',
    'El turco Malek vs El pulpo Boy',
    'El chino hamada vs Nicolás',
    'lucas MJ vs Lautaro cuchi',
    'Gael vs Axel',
    'thiago Fariña vs Lucas Molina',
    'pablo(el chino), marcos y maxi vs gero',
    'Eric bus vs Hernán Soria',
    'Gonzalo (pollo) vs El Viejo Ale',
    'Marco vs Rype, Maxi, Agus, Gero , Nicolás',
    'pulpo Junior vs ????????',
    'Mateo vs Juan',
    'thiago Fariña vs Mariano Rodríguez',
    'sam sulek vs Aron',
    'Diego vs Roke',
    'Juan am vs Zacarías',
    'Valentinaib vs Agustina',
    'calamar boy vs Nico el grandoto',
    'sacles vs maximo',
    'angel Soria vs Jonathan',
    'El turko Malek vs Mariano Rodríguez',
    'Uncos vs Gaston',
    'Soria Ángel vs vieja escuela',
    'chino (pablo) vs guille'
];

fights.forEach((fight, index) => {
    votes[`fight${index}_option1`] = 0;
    votes[`fight${index}_option2`] = 0;
});

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.send(JSON.stringify(votes));

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.vote) {
            votes[data.vote]++;
        } else if (data.undo) {
            votes[data.undo]--;
            if (votes[data.undo] < 0) {
                votes[data.undo] = 0;
            }
        }

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(votes));
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
