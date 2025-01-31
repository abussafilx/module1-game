// Lineups are the main information of the game. Each day a new challenge with a new lineup.

class LineUp {
    constructor(formation, club, game, players, startIndex = 0) {
        this.formation = formation; // 442, 433 or 352 - to organize the players displayed on the field
        this.club = club;
        this.game = game;
        this.players = players; // array of objects
        this.currentPlayerIndex = startIndex; // Track the active player

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
        const board = document.getElementById("board")
        const field = document.getElementById("field")
        const answerDisp = document.getElementById("answer");
        const attemptDisp = document.getElementById("attempts");
        const playerinfo = document.getElementById("playerinfo");

        // Clear previous inputs
        answerDisp.innerHTML = "";
        attemptDisp.innerHTML = "";
        board.classList.add("hidden");
        field.classList.remove("hidden");

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

            if (currentPlayer[i] === " ") {
                // If it's a space, add a space instead of a letter or input
                const skipSpace = document.createElement("div");

                skipSpace.classList.add("skipspace");
                skipSpace.innerText = "-";
                answerDisp.appendChild(document.createElement("br"));
                attemptLine.appendChild(skipSpace);
                continue;
            }

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

        };

        // Select all input fields and attach event listeners
        const inputs = document.querySelectorAll(".letter-input");


        inputs.forEach((input, index) => {
            input.addEventListener("input", (e) => {
                if (e.target.value.length === 1) {
                    // Move to the next input if it exists
                    const nextInput = inputs[index + 1];
                    if (nextInput) nextInput.focus();
                };
            });
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    // Checks answer
                    this.checkAnswer()
                };
            });
            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && input.value === "" && index > 0) {
                    // Move back
                    inputs[index - 1].focus();
                };
            });


        });

        // Focus on the first input
        setTimeout(() => {
            inputs[0].focus();
        }, 100);


        //previous button
        const buttonSpace = document.getElementById("button");
        buttonSpace.innerHTML = "";
        const prevButton = document.createElement("button");
        prevButton.innerText = "Previous";
        buttonSpace.appendChild(prevButton);
        prevButton.addEventListener("click", () => {
            this.prevQuestion();
            updateURL();
        });


        //answer button  
        const answerButton = document.createElement("button");
        answerButton.innerText = "Answer";
        buttonSpace.appendChild(answerButton);
        answerButton.addEventListener("click", () => this.checkAnswer());

        // next question button
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next";
        buttonSpace.appendChild(nextButton);
        nextButton.addEventListener("click", () => {
            this.nextQuestion();
            updateURL();
        });

        if (this.currentPlayerIndex === 0) {
            prevButton.disabled = true;
        }

        if (this.currentPlayerIndex === this.players.length - 1) {
            nextButton.disabled = true;
        }

        //go back button
        const backSpace = document.getElementById("back");
        backSpace.innerHTML = "";
        const backButton = document.createElement("button");
        backButton.innerText = "Back";
        backSpace.appendChild(backButton);
        backButton.addEventListener("click", () => {
            board.classList.add("hidden");
            field.classList.remove("hidden");
        });

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

    selectPlayer(index) {
        this.currentPlayerIndex = index;
        this.displayPlayerInputs();

        const board = document.getElementById("board");
        const field = document.getElementById("field");

        board.classList.remove("hidden");
        field.classList.add("hidden");
    }




    displayField() {
        // Update game info on the field
        const fieldGameInfo = document.getElementById("gameinfo2");
        fieldGameInfo.innerHTML = `<p><b>Club</b>: ${this.club}</p> <p><b>Game</b>: ${this.game}</p>`;

        // Get field sections
        const sections = {
            gk: document.getElementById("gk"),
            defense: document.getElementById("defense"),
            midfield: document.getElementById("midfield"),
            attack: document.getElementById("attack")
        };


        // Formation mapping
        const formationMap = {
            442: [1, 4, 4, 2],  // 1 GK, 4 Defenders, 4 Midfielders, 2 Attackers
            433: [1, 4, 3, 3],
            352: [1, 3, 5, 2]
        };

        const positions = ["gk", "defense", "midfield", "attack"];
        let playerIndex = 0;

        if (!formationMap[this.formation]) {
            console.error("Invalid formation:", this.formation);
            return;
        }

        // Generate player elements dynamically
        formationMap[this.formation].forEach((count, sectionIndex) => {
            for (let i = 0; i < count; i++) {
                if (playerIndex >= this.players.length) break;

                const playerDiv = document.createElement("div");
                playerDiv.classList.add("shirt");
                playerDiv.innerHTML = `<p> ${ this.players[playerIndex].number}</p>`; // Show jersey number

                // Attach event listener for selection
                playerDiv.addEventListener("click", ((index) => () => this.selectPlayer(index))(playerIndex));

                // Append player to the correct field section
                sections[positions[sectionIndex]].appendChild(playerDiv);

                playerIndex++;
            }
        });
    }




    //answer checker. If it is correct, should move to the next player. If it is not, should open another answer line. Up to 6 attempts.
    checkAnswer() {
        const inputs = document.querySelectorAll(".letter-input");
        const letters = document.querySelectorAll(".letter")
        const correctWord = this.players[this.currentPlayerIndex].name.replace(/\s/g, ""); // Remove spaces from correct answer
        let isCorrect = true;

        const attemptDisp = document.getElementById("attempts");
        const attempt2 = document.createElement("div")
        attemptDisp.appendChild(attempt2)

        //comparing letter by letter
        inputs.forEach((input, i) => {
            if (input.value.toUpperCase() === correctWord[i].toUpperCase()) {
                input.style.backgroundColor = "#AAB99A"; // Correct
                letters[i].style.visibility = "visible";
                input.disabled = true;
            } else {
                input.style.backgroundColor = "#BE3144"; // Incorrect
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
            this.selectPlayer(this.currentPlayerIndex);
        }
    }

    nextQuestion() {
        if (this.currentPlayerIndex < this.players.length - 1) {
            this.currentPlayerIndex++;
            this.selectPlayer(this.currentPlayerIndex);
        }
    }

}

class User {
    constructor(name) {
        this.name = name;
        this.counter = 0;
        this.timer = 0;
        this.currentPlayer = 0; // index of the player we're trying to guess
    }
}

function getPlayerIndexFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.has("player") ? parseInt(params.get("player")) : 0;
}

const playerIndex = getPlayerIndexFromURL(); // Get player index before creating the lineup

// const lineUp1 = new LineUp(352, "São Paulo FC", "São Paulo 1 x 1 Flamengo | Copa do Brasil Final 2023",
//     [{ name: "Rafael", position: "Goalkeeper", number: 23, answered: false },
//     { name: "Rafinha", position: "Right Defender", number: 13, answered: false },
//     { name: "Arboleda", position: "Defender", number: 5, answered: false },
//     { name: "Beraldo", position: "Defender", number: 32, answered: false },
//     { name: "Wellington", position: "Left Defender", number: 6, answered: false },
//     { name: "Pablo Maia", position: "Midfielder", number: 25, answered: false },
//     { name: "Alisson", position: "Midfielder", number: 15, answered: false },
//     { name: "Rato", position: "Winger", number: 27, answered: false },
//     { name: "Rodrigo Nestor", position: "Midfielder", number: 11, answered: false },
//     { name: "Lucas", position: "Forward", number: 7, answered: false },
//     { name: "Calleri", position: "Striker", number: 9, answered: false }], playerIndex); // Pass the index

// lineUp1.updateDisplay();
// lineUp1.startQuiz();
// lineUp1.displayField();





const lineUp2 = new LineUp(352, "Brazil", "Brazil 2 x 0 Germany | World Cup Final 2002",
    [{ name: "Marcos", position: "Goalkeeper", number: 1, answered: false },
    { name: "Lucio", position: "Defender", number: 3, answered: false },
    { name: "Edmilson", position: "Defender", number: 5, answered: false },
    { name: "Roque Junior", position: "Defender", number: 4, answered: false },
    { name: "Cafu", position: "Right Defender", number: 2, answered: false },
    { name: "Kleberson", position: "Midfielder", number: 23, answered: false },
    { name: "Ronaldinho", position: "Midfielder", number: 11, answered: false },
    { name: "Gilberto Silva", position: "Midfielder", number: 15, answered: false },
    { name: "Roberto Carlos", position: "Left Defender", number: 6, answered: false },
    { name: "Rivaldo", position: "Forward", number: 10, answered: false },
    { name: "Ronaldo", position: "Striker", number: 9, answered: false }], playerIndex); // Pass the index

lineUp2.updateDisplay();
lineUp2.startQuiz();
lineUp2.displayField();

function updateURL() {
    const newURL = window.location.pathname + `?player=${lineUp1.currentPlayerIndex}`;
    window.history.pushState({}, "", newURL);
}