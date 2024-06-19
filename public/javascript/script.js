const ws = new WebSocket(`ws://${window.location.host}`);

// Lista de enfrentamientos
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

// Generar las tarjetas de votación
const voteList = document.getElementById('vote-list');

fights.forEach((fight, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>${fight}</h2>
        <button class="vote-btn" onclick="vote('fight${index}_option1')">Opción 1</button>
        <button class="undo-btn" onclick="undoVote('fight${index}_option1')">Deshacer Opción 1</button>
        <button class="vote-btn" onclick="vote('fight${index}_option2')">Opción 2</button>
        <button class="undo-btn" onclick="undoVote('fight${index}_option2')">Deshacer Opción 2</button>
        <p>Opción 1: <span id="fight${index}_option1-count">0</span></p>
        <p>Opción 2: <span id="fight${index}_option2-count">0</span></p>
    `;
    voteList.appendChild(card);
});

ws.onmessage = (event) => {
    const votes = JSON.parse(event.data);
    Object.keys(votes).forEach(key => {
        document.getElementById(`${key}-count`).textContent = votes[key];
    });
};

function vote(option) {
    ws.send(JSON.stringify({ vote: option }));
}

function undoVote(option) {
    ws.send(JSON.stringify({ undo: option }));
}
