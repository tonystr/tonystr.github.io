
/**
 * Parses a string for mathematical equations, and returns the answer
 * @param {String} str Input string containing mathematical expression
*/
stringMath = function() {
    let string = document.getElementById('input').value;

    let variables = [];
    let callStack = [];
    let number = "";
    let action = "";
    let stage  = 0;
    let stagemax = 1;
    let sign = 1;

    for (let i = 0; i < string.length; i++) {
        switch (string.charAt(i)) {

            // Operator
            case (string.charAt(i).match(`[+\\-*/^%]`) || false).input:
                let numset = false;
                if (number.length > 0) {
                    variables.push(Number(number) * sign);
                    sign = 1;
                    number = "";
                    numset = true;
                }

                let tertiary = string.charAt(i).match(`\\^`) && true;
                let secondary = string.charAt(i).match(`[*/%]`) && true;
                let stg = stage*3 + Number(secondary) + Number(tertiary) * 2;
                let operator = string.charAt(i);

                if (operator == "-") {
                    sign = -1;
                    operator = "+";
                    if (!numset) operator = "";
                }

                if (operator) {
                    callStack.push(stg + operator);
                    stagemax = stg > stagemax ? stg : stagemax;
                    console.log("operator");
                }
            break;

            // Digit
            case (string.charAt(i).match(`[0-9.]`) || false).input:
                number += string.charAt(i);
                console.log("digit");
            break;

            // Paranthesises
            case "(": stage++; break;
            case ")": stage--;
                if (stage < 0) {
                    return "Error: Non-matched closing bracket(s)";
                }
            break;
        }
    }

    if (number) variables.push(Number(number) * sign);

    if(variables.length > 1) {
        for (let stage = stagemax; stage >= 0; stage--) {
            if (callStack.length < 1) break;
            for (let i = 0; i < callStack.length; i++) {
                switch (callStack[i]) {
                    case stage + "*": variables[i] = (variables[i] * Number(variables[i+1])); callStack.splice(i, 1); variables.splice(i--+1, 1); break;
                    case stage + "/": variables[i] = (variables[i] / Number(variables[i+1])); callStack.splice(i, 1); variables.splice(i--+1, 1); break;
                    case stage + "%": variables[i] = (variables[i] % Number(variables[i+1])); callStack.splice(i, 1); variables.splice(i--+1, 1); break;
                    case stage + "+": variables[i] = (variables[i] + Number(variables[i+1])); callStack.splice(i, 1); variables.splice(i--+1, 1); break;
                    case stage + "-": variables[i] = (variables[i] - Number(variables[i+1])); callStack.splice(i, 1); variables.splice(i--+1, 1); break;
                    case stage + "^": variables[i] = Math.pow(variables[i], Number(variables[i+1])); callStack.splice(i, 1); variables.splice(i--+1, 1); break;

                }
            }
        }
    }

    if (isNaN(variables[0]) || variables[0] === undefined || variables[0] === null ) {
        if (variables.length < 1) document.getElementById('output').value = "";

    } else  {
        document.getElementById('output').value = variables[0];
    }
}
