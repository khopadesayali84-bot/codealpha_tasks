let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let resetScreen = false;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandElement.innerText = currentOperand;
    previousOperandElement.innerText = previousOperand;
}

function appendNumber(number) {
    if (currentOperand === '0' || resetScreen) {
        currentOperand = '';
        resetScreen = false;
    }

    if (number === '.' && currentOperand.includes('.')) return;

    currentOperand += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentOperand === '') return;

    if (previousOperand !== '') {
        calculate();
    }

    switch(op) {
        case '+': operation = '+'; break;
        case '-': operation = '-'; break;
        case '*': operation = '×'; break;
        case '/': operation = '÷'; break;
    }

    previousOperand = `${currentOperand} ${operation}`;
    currentOperand = '';
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();

    const display = document.querySelector('.display');
    display.classList.add('pulse');
    setTimeout(() => display.classList.remove('pulse'), 500);
}

function deleteLastChar() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    if (previousOperand === '' || currentOperand === '') return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result;

    switch(operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = current === 0 ? 'Error' : prev / current; break;
        default: return;
    }

    if (result !== 'Error') {
        result = parseFloat(result.toFixed(10)).toString();
    }

    previousOperand = '';
    currentOperand = result;
    operation = undefined;
    resetScreen = true;
    updateDisplay();
}

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    else if (e.key === '.') appendNumber('.');
    else if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape') clearAll();
    else if (e.key === 'Backspace') deleteLastChar();
});