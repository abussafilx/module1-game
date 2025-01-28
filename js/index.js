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
        const playerinfo = document.getElementById("playerinfo")

        // Clear previous inputs
        answerDisp.innerHTML = "";
        attemptDisp.innerHTML = "";

        const currentPlayer = this.players[this.currentPlayerIndex].name;
        const attemptLine = document.createElement("div");
        attemptDisp.appendChild(attemptLine);

        // Tips
        playerinfo.innerHTML = "";
        const tips = document.createElement("div");
        tips.classList.add("tips");
        tips.innerText = `Tip: ${this.players[this.currentPlayerIndex].position} | #${this.players[this.currentPlayerIndex].number}`
        playerinfo.appendChild(tips)

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

        if (this.currentPlayerIndex === 0) {
            prevButton.disabled = true;}

            if (this.currentPlayerIndex === this.players.length - 1) {
                nextButton.disabled = true;}

        //check if answered

        let isAnswered = this.players[this.currentPlayerIndex].answered

        if (isAnswered === true) {
            answerButton.disabled = true;
            document.querySelectorAll(".letter").forEach((letter) => {
            letter.style.visibility = "visible";})

        };


    }

    

    //answer checker. If it is correct, should move to the next player. If it is not, should open another answer line. Up to 6 attempts.
    checkAnswer() {
        const inputs = document.querySelectorAll(".letter-input");
        const letters = document.querySelectorAll(".letter")
        const correctWord = this.players[this.currentPlayerIndex].name;
        let isCorrect = true;

        const attemptDisp = document.getElementById("attempts");
        const attempt2 = document.createElement("div")
        attemptDisp.appendChild(attempt2)


        inputs.forEach((input, i) => {
            if (input.value.toUpperCase() === correctWord[i].toUpperCase()) {
                input.style.backgroundColor = "lightgreen"; // Correct
                letters[i].style.visibility = "visible"; // Reveal correct letter
                input.disabled = true;
            } else {
                input.style.backgroundColor = "lightcoral"; // Incorrect
                isCorrect = false;
            }
        });

        if (isCorrect) {

            this.players[this.currentPlayerIndex].answered = true;

        }
    }

    prevQuestion() {
        if (this.currentPlayerIndex > 0) { // Prevent index from going below 0
            this.currentPlayerIndex--;
            this.displayPlayerInputs();
        }
    }

    nextQuestion() {
        if (this.currentPlayerIndex < this.players.length - 1) {
            this.currentPlayerIndex++;
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

const LineUp1 = new LineUp(442, "São Paulo FC", "São Paulo 1 x 1 Flamengo | Copa do Brasil Final 2023", [{ name: "Rafael", position: "Goalkeeper", number: 23, answered: "false" }, { name: "Calleri", position: "Striker", number: 9, answered: "false" }])

LineUp1.updateDisplay();

LineUp1.startQuiz();






