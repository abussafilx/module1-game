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
        const buttonSpace = document.getElementById("button")
        
        this.players.forEach(element => {
            for (let i=0; i < element.length; i++) {
                const letter = document.createElement("div");
                letter.classList.add("letter");
                letter.innerText = element[i].toUpperCase();
                answerDisp.appendChild(letter)    
               
                const letterInput = document.createElement("div");
                letterInput.classList.add("letter");
                letterInput.innerHTML = `<input type="text" id="letter" name="letter" required minlength="1" maxlength="1" size="10" />`;
                attemptDisp.appendChild(letterInput);
                };

               
        });


        const answerButton = document.createElement("button")
        answerButton.innerText = "Answer"
        buttonSpace.appendChild(answerButton)
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






