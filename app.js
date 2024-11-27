let firstNum = 0;
let secondNum = null;
let operation = "";
let resetDisplay = false;

function add(x, y) {
    return roundToFiveDecimalPlaces(x + y);
}

function subtract(x, y) {
    return roundToFiveDecimalPlaces(x - y);
}

function multiply(x, y) {
    return roundToFiveDecimalPlaces(x * y);
}

function divide(x, y) {
    if (y === 0) {
        return "No. Don't.";
    }
    return roundToFiveDecimalPlaces(x / y);
}

function roundToFiveDecimalPlaces(num) {
    return Math.round(num * 100000) / 100000;
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
    document.getElementById("display2").innerText = "⠀";
    document.querySelectorAll(".operations").forEach((btn) =>
        btn.classList.remove("selected")
    );
}


function clearOne() {
    const display = document.getElementById("display");
    let currentValue = display.innerText;

    if (currentValue.length > 1) {
        display.innerText = currentValue.slice(0, -1);
    } else {
        display.innerText = "0";
    }
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
        display.innerText = btn === "." ? "0." : btn;
        resetDisplay = false;
    } else {
        if (btn === "." && display.innerText.includes(".")) {
            return;
        }

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
    updateSecondaryDisplay();

    clearDisplay();
}



function toggleSign() {
    const display = document.getElementById("display");
    let currentValue = parseFloat(display.innerText);

    if (!isNaN(currentValue)) {
        currentValue = -currentValue;
        display.innerText = currentValue;
    }
}

function updateSecondaryDisplay() {
    const secondaryDisplay = document.getElementById("display2");
    const operationSymbols = {
        add: "+",
        subtract: "-",
        multiply: "x",
        divide: "/",
    };

    if (operation && firstNum !== null) {
        secondaryDisplay.innerText = `${firstNum} ${operationSymbols[operation] || ""}`;
    } else {
        secondaryDisplay.innerText = "";
    }
}

function calculate() {
    const value = document.getElementById("display").innerText;

    if (operation) {
        secondNum = parseFloat(value);
        const result = operate(firstNum, secondNum, operation);

        if (result !== null) {
            const operationSymbols = {
                add: "+",
                subtract: "-",
                multiply: "x",
                divide: "/",
            };

            document.getElementById("display2").innerText = 
                `${firstNum} ${operationSymbols[operation]} ${secondNum} =`;

            document.getElementById("display").innerText = result;

            firstNum = result;
            secondNum = null;
            operation = "";
            resetDisplay = true;
            clearSelection();
        }
    }
}

document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.add("btnClick");
        
        setTimeout(() => {
            button.classList.remove("btnClick");
        }, 100);
    });
});

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        inputNum(key);
        highlightButton(getButtonId(key));
    } else if (key === ".") {
        inputNum(".");
        highlightButton("decimal");
    } else if (key === "+") {
        operationBtn("add");
        highlightButton("add");
    } else if (key === "-") {
        operationBtn("subtract");
        highlightButton("subtract");
    } else if (key === "*") {
        operationBtn("multiply");
        highlightButton("multiply");
    } else if (key === "/") {
        operationBtn("divide");
        highlightButton("divide");
    } else if (key === "Enter" || key === "=") {
        calculate();
        highlightButton("evaluate");
    } else if (key === "Backspace") {
        clearOne();
        highlightButton("clearone");
    } else if (key === "Escape") {
        clearAll();
        highlightButton("clear");
    } else if (key === "Delete") {
        clearAll();
        highlightButton("clear");
    } else if (key === "n") {
        toggleSign();
        highlightButton("negative");
    }
});

function getButtonId(key) {
    const keyMap = {
        "0": "zero",
        "1": "one",
        "2": "two",
        "3": "three",
        "4": "four",
        "5": "five",
        "6": "six",
        "7": "seven",
        "8": "eight",
        "9": "nine",
    };
    return keyMap[key];
}

function highlightButton(keyId) {
    const button = document.getElementById(keyId);

    if (button) {
        button.classList.add("btnClick");
        setTimeout(() => {
            button.classList.remove("btnClick");
        }, 100);
    }
}
