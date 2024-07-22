let result = document.querySelector('#result');
let expression = document.querySelector('#expression');
let firstNumber = '';
let userOperator = '';
let clearresult = false;

document.querySelectorAll('.number').forEach((number) => {
    number.addEventListener('click', () => {
        if (number.textContent == '') return;

        if (clearresult) clear();
        
        if (result.textContent == '0')
            result.textContent = number.textContent;
        else result.textContent += number.textContent;

        let num = document.createElement('span');
        num.textContent = number.textContent;
        expression.appendChild(num);
    });
});

document.querySelectorAll('.operator').forEach((operator) => {
    operator.addEventListener('click', (operator) => {
        let answer = 0;
        switch (operator.target.textContent) {
            case 'clear':
                clear(true);
                break;
            case 'del':
                del();
                break;
            case '=':
                answer = 
                    operate(
                        Number(firstNumber),
                        Number(result.textContent),
                        userOperator
                    );
                result.textContent = answer;
                clearresult = true;
                firstNumber = result.textContent;
                userOperator = '';
                break;
            default: // handle +, -, /, and *
                if (userOperator != '') {
                    result = 
                        operate(
                            Number(firstNumber),
                            Number(result.textContent),
                            operator.target.textContent
                        );
                    result.textContent = result;
                }

                firstNumber = result.textContent;
                userOperator = operator.target.textContent;
                clearresult = true;

                // Enables dynamic styling for operators to render in accent color.
                let op = document.createElement('span');
                op.classList.add('op-accent2');
                op.textContent = operator.target.textContent;
                expression.appendChild(op);
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

function clear(exp = false) {
    result.textContent = '0';
    if (exp) expression.textContent = '';

    // No need to clear for now
    clearresult = false;
}

function del() {
    // result shouldn't be empty, display 0 instead.
    if (result.textContent.length == 1) clear();
    // Remove the rightmost number on the result
    else result.textContent =
        result.textContent.slice(0, result.textContent.length - 1);
    expression.textContent = 
        expression.textContent.slice(0, expression.textContent.length - 1);
    
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