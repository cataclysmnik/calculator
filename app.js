let firstNum = 0;
let secondNum = null;
let operation = "";
let resetDisplay = false;

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return "Error";
    }
    return x / y;
}

function operate(firstNum, secondNum, operation) {
    if (operation === "add") {
        return add(firstNum, secondNum);
    } else if (operation === "subtract") {
        return subtract(firstNum, secondNum);
    } else if (operation === "multiply") {
        return multiply(firstNum, secondNum);
    } else if (operation === "divide") {
        return divide(firstNum, secondNum);
    } else {
        return null;
    }
}

function clearAll() {
    firstNum = 0;
    secondNum = null;
    operation = "";
    resetDisplay = false;
    document.getElementById("display").innerText = "0";
    document.querySelectorAll(".operations").forEach((btn) =>
        btn.classList.remove("selected")
    );
}

function clearSelection() {
    document.querySelectorAll(".operations").forEach((btn) =>
        btn.classList.remove("selected")
    );
}

function clearDisplay() {
    document.getElementById("display").innerText = "0";
}

function populateDisplay(btn) {
    const display = document.getElementById("display");
    if (resetDisplay) {
        display.innerText = btn;
        resetDisplay = false;
    } else {
        if (display.innerText === "0" && btn !== ".") {
            display.innerText = btn;
        } else {
            display.innerText += btn;
        }
    }
}

function inputNum(num) {
    populateDisplay(num);
}

function operationBtn(opBtn) {
    const operationButtons = document.querySelectorAll(".operations");
    operationButtons.forEach((btn) => btn.classList.remove("selected"));

    const element = document.getElementById(opBtn);
    element.classList.add("selected");

    const value = document.getElementById("display").innerText;

    if (!resetDisplay) {
        if (firstNum === 0 && operation === "") {
            firstNum = parseFloat(value);
        } else if (operation) {
            secondNum = parseFloat(value);
            firstNum = operate(firstNum, secondNum, operation);
            document.getElementById("display").innerText = firstNum;
        }
    }

    operation = opBtn;
    resetDisplay = true;
}

function calculate() {
    const value = document.getElementById("display").innerText;

    if (operation) {
        secondNum = parseFloat(value);
        const result = operate(firstNum, secondNum, operation);

        if (result !== null) {
            document.getElementById("display").innerText = result;
            firstNum = result;
            secondNum = null;
            operation = "";
            resetDisplay = true;
            clearSelection();
        }
    }
}
