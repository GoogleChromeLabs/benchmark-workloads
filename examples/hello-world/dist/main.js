let counter = 0;
const min = 0;
const max = 10;

const increaseButton = document.getElementById("increase-btn");
const decreaseButton = document.getElementById("decrease-btn");
const resetButton = document.getElementById("reset-btn");
const counterDisplay = document.getElementById("counter-display");

function updateDisplay() {
    counterDisplay.textContent = counter;
}

increaseButton.addEventListener("click", function() {
    counter = Math.min(counter+1, max)

    updateDisplay();
});
decreaseButton.addEventListener("click", function() {
    counter = Math.max(counter-1, min);

    updateDisplay();
});

resetButton.addEventListener("click", function() {
    counter = min;
    updateDisplay();
})

updateDisplay();
