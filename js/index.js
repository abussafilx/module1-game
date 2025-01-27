class LineUp {
    constructor (formation, club, game, players) {
        this.formation = formation;
        this.club = club;
        this.game = game;
        this.players = players;
        
    }

    updateDisplay() {
        const gameInfo = document.getElementById("gameinfo");
        gameInfo.innerHTML = `<p><b>Club</b>: ${this.club}</p> <p><b>Game</b>: ${this.game}</p>`
    }

    startQuiz (){
        const answerDisp = document.getElementById("answer");
        const attemptDisp = document.getElementById("attempts");
        
        this.players.forEach(element => {
            for (let i=0; i < element.length; i++) {
                const letter = document.createElement("div");
                letter.classList.add("letter");
                letter.innerText = element[i].toUpperCase();
                answerDisp.appendChild(letter)    
                };

            for (let i=0; i < element.length; i++) {
                const letterInput = document.createElement("div");
                letterInput.classList.add("letter");
                letterInput.innerText = "X";
                attemptDisp.appendChild(letterInput);
                };
            
        });
    }
};

class Player {
    constructor (name) {
        this.name = name;
    }
}

class Attempts {

};

const LineUp1 = new LineUp(442,"São Paulo FC", "São Paulo vs. Flamengo | Copa do Brasil Final 2023", ["Rafael"])

LineUp1.updateDisplay();

LineUp1.startQuiz();




