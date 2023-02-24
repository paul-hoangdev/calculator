const display = document.getElementById("display");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b); 
        case '–':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            if (b === 0)
                return "Error";
            return divide(a, b);
    }
}
let number = "";
let first;
let sign;
let isFirstClickedDot = true;
let isFirstClicked = true;
const num = document.querySelectorAll(".number");
const signs = document.querySelectorAll(".sign");
const equalButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");

num.forEach((button) => {
    button.addEventListener("click", () => {
            if (number === "") {
                isFirstClickedDot = true;
                isFirstClicked = true;
            }
            if (number === "0" && (Number(button.textContent) >= 0)) {
                number = "";
                number += button.textContent;
                display.textContent = number;
            }
            else if (number === "0" && button.textContext === ".") {
                number += button.textContent;
                display.textContent = number;
                isFirstClickedDot = false;
            }
            else if (button.textContent === ".") {
                if (isFirstClickedDot) {
                    number += button.textContent;
                    display.textContent = number; 
                    isFirstClickedDot = false;
                }
                else {
                    return;
                }
            }
            else {
                number += button.textContent;
                display.textContent = number;      
            }
    });
});

signs.forEach((button) => {
    button.addEventListener("click", () => {
        if (first != null && isFirstClicked && number != "") {
            first = operate(sign, first, number);
            number = "";
            display.textContent = first;
            isFirstClicked = false;
        }
        else if (isFirstClicked) {
            first = number;
            number = "";
            isFirstClicked = false;
        }
        sign = button.textContent;
    });
});

equalButton.addEventListener("click", () => {
    if (first == null && sign == null) {
        return;
    }
    first = operate(sign, first, number)
    display.textContent = first;
});
clearButton.addEventListener("click", () => {
    display.textContent = 0;
    first = null; 
    number = "";
    sign = null;
    isFirstClicked = true;
    isFirstClickedDot = true;
});

