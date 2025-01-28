// Lineups are the main information of the game. Each day a new challenge with a new lineup.

class LineUp {
    constructor(formation, club, game, players) {
        this.formation = formation; // 442, 433 or 352 - to organize the players displayed on the field
        this.club = club;
        this.game = game;
        this.players = players; // array
        this.currentPlayerIndex = 0; // Track the active player

    }

    // updates the titles and game information displayed
    updateDisplay() {
        const gameInfo = document.getElementById("gameinfo");
        gameInfo.innerHTML = `<p><b>Club</b>: ${this.club}</p> <p><b>Game</b>: ${this.game}</p>`;
    }

    // Sets up the quiz
    startQuiz() {
        this.displayPlayerInputs();
    }

    // Displays inputs for the current player
    displayPlayerInputs() {
        const answerDisp = document.getElementById("answer");
        const attemptDisp = document.getElementById("attempts");

        // Clear previous inputs
        answerDisp.innerHTML = "";
        attemptDisp.innerHTML = "";

        const currentPlayer = this.players[this.currentPlayerIndex];
        const attemptLine = document.createElement("div");
        attemptDisp.appendChild(attemptLine);

        //for each player, display letter by letter and have the same number of input spaces. The game compares letter by letter
        for (let i = 0; i < currentPlayer.length; i++) {
            // Correct answer space (hidden)
            const letter = document.createElement("div");
            letter.classList.add("letter");
            letter.innerText = currentPlayer[i].toUpperCase();
            letter.style.visibility = "hidden"; // Hide the correct answer initially
            answerDisp.appendChild(letter);

            // Input spaces
            const letterInput = document.createElement("input");
            letterInput.type = "text";
            letterInput.classList.add("letter-input");
            letterInput.maxLength = 1;
            attemptLine.appendChild(letterInput);
        }

        //previous button
        const buttonSpace = document.getElementById("button");
        buttonSpace.innerHTML = "";
        const prevButton = document.createElement("button");
        prevButton.innerText = "Previous";
        buttonSpace.appendChild(prevButton);
        prevButton.addEventListener("click", () => this.prevQuestion());


        //answer button  
        const answerButton = document.createElement("button");
        answerButton.innerText = "Answer";
        buttonSpace.appendChild(answerButton);
        answerButton.addEventListener("click", () => this.checkAnswer());

        // next question button
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next";
        buttonSpace.appendChild(nextButton);
        nextButton.addEventListener("click", () => this.nextQuestion());


    }



    //answer checker. If it is correct, should move to the next player. If it is not, should open another answer line. Up to 6 attempts.
    checkAnswer() {
        const inputs = document.querySelectorAll(".letter-input");
        const letters = document.querySelectorAll(".letter")
        const correctWord = this.players[this.currentPlayerIndex];
        let isCorrect = true;

        const attemptDisp = document.getElementById("attempts");
        const attempt2 = document.createElement("div")
        attemptDisp.appendChild(attempt2)


        inputs.forEach((input, index) => {
            if (input.value.toUpperCase() === correctWord[index].toUpperCase()) {
                input.style.backgroundColor = "lightgreen"; // Correct
                letters[index].style.visibility = "visible"; // Reveal correct letter
                input.disabled = true;
            } else {
                input.style.backgroundColor = "lightcoral"; // Incorrect
                isCorrect = false;
            }
        });

        if (isCorrect) {

        }
    }

    prevQuestion() {
        this.currentPlayerIndex--;
        if (this.currentPlayerIndex >= 0) {
            this.displayPlayerInputs();
        }
    }

    nextQuestion() {
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex < this.players.length) {
            this.displayPlayerInputs();
        }
    }
}

class Player {
    constructor(name) {
        this.name = name;
    }
}

class Attempts {

};

const LineUp1 = new LineUp(442, "São Paulo FC", "São Paulo vs. Flamengo | Copa do Brasil Final 2023", ["Rafael", "Rafinha", "Arboleda", "Calleri"])

LineUp1.updateDisplay();

LineUp1.startQuiz();






