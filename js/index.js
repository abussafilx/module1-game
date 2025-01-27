class LineUp {
    constructor (formation, club, game, players) {
        this.formation = formation;
        this.club = club;
        this.game = game;
        this.players = players;
    }

};

class Player {
    constructor (name) {
        this.name = name;
    }
}

const LineUp1 = new LineUp(442,"São Paulo FC", "São Paulo vs. Flamengo | Copa do Brasil Final 2023", ["Rafael", "Rafinha", "Arboleda", "Beraldo", "Caio Paulista", "Pablo Maia", "Alisson", "Rato", "Lucas", "Rodrigo Nestor", "Calleri"])

