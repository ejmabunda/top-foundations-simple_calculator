let screen = document.querySelector('#screen');
let firstNumber = '';
let userOperator = '';
let clearScreen = false;

document.querySelectorAll('.number').forEach((number) => {
    number.addEventListener('click', () => {
        if (clearScreen) clear();
        if (screen.textContent == '0')
            screen.textContent = number.textContent;
        else screen.textContent += number.textContent;
    });
});

document.querySelectorAll('.operator').forEach((operator) => {
    operator.addEventListener('click', (operator) => {
        let result = 0;
        switch (operator.target.textContent) {
            case 'clear':
                clear();
                break;
            case 'del':
                del();
                break;
            case '=':
                result = 
                    operate(
                        Number(firstNumber),
                        Number(screen.textContent),
                        userOperator
                    );
                screen.textContent = result;
                clearScreen = true;
                firstNumber = screen.textContent;
                userOperator = '';
                break;
            default: // handle +, -, /, and *
                if (userOperator != '') {
                    result = 
                        operate(
                            Number(firstNumber),
                            Number(screen.textContent),
                            operator.target.textContent
                        );
                    screen.textContent = result;
                }

                firstNumber = screen.textContent;
                userOperator = operator.target.textContent;
                clearScreen = true;
                break;
        }
    });
});

function operate(n1, n2, operator) {
    switch (operator) {
        case '+':
            return add(n1, n2);
        case '-':
            return subtract(n1, n2);
        case '*':
            return multiply(n1, n2);
        case '/':
            return divide(n1, n2);
        default:
            console.error('Something went wrong in `operate`');
    }
}

function clear() {
    screen.textContent = '0';

    // No need to clear for now
    clearScreen = false;
}

function del() {
    // Screen shouldn't be empty, display 0 instead.
    if (screen.textContent.length == 1) clear();
    // Remove the rightmost number on the screen
    else screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
}

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

clear();