/* Prepare config variables */
const valuesToGuess = [];
const userValues = [];
const n_values = 5;
const waitingTime = 3000;

/* Generate random numbers */
for (let i = 0; i < n_values; i++) {
    const randomValue = Math.floor(Math.random() * 9) + 1;
    valuesToGuess.push(randomValue);
}

/* DOM nodes */
const inputsEl = document.querySelectorAll(".mem-input");
const submitEl = document.getElementById("submit-btn");
const messageEl = document.getElementById("message");

/* Firstly show all values inside inputs */
for (let i = 0; i < valuesToGuess.length; i++) {
    const value = valuesToGuess[i];
    inputsEl[i].value = value;
}

/* Clear input values after 30s and make them fillables*/
const timeoutId = setTimeout(function() {
    for (let i = 0; i < inputsEl.length; i++) {
        const input = inputsEl[i];
        input.value = "";
        input.disabled = false;

        /* Allow button use */
        submitEl.disabled = false;
    }
}, waitingTime)

/* Handle submit button event */
submitEl.addEventListener("click", function(e) {
    e.preventDefault();
    
    /* Store user input values */
    for (let i = 0; i < inputsEl.length; i++) {
        const input = Number(inputsEl[i].value);

        /* Check if valid input else stop execution */
        if (Number.isInteger(input) && (input > 0 && input < 10)) {
            userValues.push(input);
        } else {
            console.log("Errore, puoi inserire solo interi tra 1 e 9");
            messageEl.className = "text-danger";
            messageEl.innerText = "Errore, puoi inserire solo interi tra 1 e 9";
            return;
        }
    }

    /* Prepare counter */
    let foundCounter = 0;
    
    /* Check values */
    for (let i = 0; i < userValues.length; i++) {
        const userValue = userValues[i];
        let found = false;

        for (let j = 0; j < valuesToGuess.length; j++) {
            const guessValue = valuesToGuess[j];
            
            if (userValue === guessValue) {
                found = true;
                break;
            }
        }

        /* Log found or not */
        if (found) {
            console.log("Indovinato: " + userValue);
            foundCounter++;
        }
    }

    /* Result message */
    if (foundCounter === n_values) {
        console.log(`Hai Vinto! ${foundCounter} su ${n_values}`);
        
        messageEl.className = "text-success";
        messageEl.innerText = `Hai Vinto! ${foundCounter} su ${n_values}`;
    } else {
        console.log(`Hai indovinato ${foundCounter} valori su ${n_values}`);
        
        messageEl.className = "text-danger";
        messageEl.innerText = `Hai Perso! Hai indovinatto ${foundCounter} su ${n_values}`;
    }
})