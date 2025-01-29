// Lineups are the main information of the game. Each day a new challenge with a new lineup.

class LineUp {
    constructor(formation, club, game, players) {
        this.formation = formation; // 442, 433 or 352 - to organize the players displayed on the field
        this.club = club;
        this.game = game;
        this.players = players; // array of objects
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

        // Select all input fields and attach event listeners
        const inputs = document.querySelectorAll(".letter-input");
        inputs.forEach((input, index) => {
            input.addEventListener("input", (e) => {
                if (e.target.value.length === 1) {
                    // Move to the next input if it exists
                    const nextInput = inputs[index + 1];
                    if (nextInput) nextInput.focus();
                }
            });

        });

        // Focus on the first input
        if (inputs.length > 0) {
            inputs[0].focus();
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
            prevButton.disabled = true;
        }

        if (this.currentPlayerIndex === this.players.length - 1) {
            nextButton.disabled = true;
        }

        // question counter

        const counterSpace = document.getElementById("counter")
        const counter = document.createElement("div");
        counterSpace.innerHTML = ""
        counter.innerText = `${this.currentPlayerIndex + 1} / ${this.players.length}`;
        counterSpace.appendChild(counter);


        //check if answered

        let isAnswered = this.players[this.currentPlayerIndex].answered

        if (isAnswered === true) {
            answerButton.disabled = true;
            document.querySelectorAll(".letter").forEach((letter) => {
                letter.style.visibility = "visible"
            });
            document.querySelectorAll(".letter-input").forEach((input) => {
                input.disabled = true;
            })

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

        //comparing letter by letter
        inputs.forEach((input, i) => {
            if (input.value.toUpperCase() === correctWord[i].toUpperCase()) {
                input.style.backgroundColor = "lightgreen"; // Correct
                letters[i].style.visibility = "visible";
                input.disabled = true;
            } else {
                input.style.backgroundColor = "lightcoral"; // Incorrect
                isCorrect = false;
                setTimeout(() => {
                    input.value = "";
                }, 1000);
            }
        });

        if (isCorrect) {

            this.players[this.currentPlayerIndex].answered = true;

        }

        //check if all players are answered
        const allAnswered = this.players.every(player => player.answered === true);

        if (allAnswered) {
            setTimeout(() => {
                window.location.href = "gameover.html"; // Redirect to the game-over page
            }, 1000);
        }
    }

    prevQuestion() {
        if (this.currentPlayerIndex > 0) {
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
        this.counter = 0;
        this.timer = 0;
    }
}

const LineUp1 = new LineUp(442, "São Paulo FC", "São Paulo 1 x 1 Flamengo | Copa do Brasil Final 2023", [{ name: "Rafael", position: "Goalkeeper", number: 23, answered: "false" }, { name: "Rafinha", position: "Right Defender", number: 13, answered: "false" }, { name: "Arboleda", position: "Defender", number: 5, answered: "false" }, { name: "Beraldo", position: "Defender", number: 32, answered: "false" }, { name: "Wellington", position: "Left Defender", number: 6, answered: "false" }, { name: "Pablo Maia", position: "Midfielder", number: 25, answered: "false" }, { name: "Alisson", position: "Midfielder", number: 15, answered: "false" }, { name: "Rato", position: "Winger", number: 27, answered: "false" }, { name: "Rodrigo Nestor", position: "Miedfilder", number: 11, answered: "false" }, { name: "Lucas", position: "Forward", number: 7, answered: "false" }, { name: "Calleri", position: "Striker", number: 9, answered: "false" }])

LineUp1.updateDisplay();

LineUp1.startQuiz();






