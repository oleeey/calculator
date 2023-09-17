$(document).ready(function() {
    let input = [];
    let output = 0;

    $(".buttons").click(function(event) {
        if (event.target.className.includes("nums")) {
            input.push(Number(event.target.value));
        }
        else {
            input.push(event.target.value);
        }

        $("#display1").text(inputCurrent(input));
    })

    $("#equals").click(function() {
        input = sortInput(input);
        
        let op = "";
        for (let i in input) {
            if (typeof(input[i]) == "number") {
                if (op) {
                    if (op == "+") {output += input[i];}
                    if (op == "-") {output -= input[i];}
                    if (op == "x") {output *= input[i];}
                    if (op == "/") {output /= input[i]}
                    op = "";
                }
                else {
                    output = input[i];
                }  
            }
            else {
                op = input[i]
            }
        
        }

        output = toFixedIfNecessary(output, 4);
        $("#display").text(output);
        $("#display1").text(inputCurrent(input) + "=" + output);
    })

    $("#clear").click(function() {
        input = [];
        output = 0;
        $("#display").text(output);
        $("#display1").text("0");
    })


});

function inputCurrent(input) {
    let inputC = "";
    input.forEach(x => inputC += x);
    return inputC;
}

function combineOps(list) {
    let opsList = ["+", "-", "x", "/"];
    for (let i = 0; i < list.length; i++) {
        if (opsList.includes(list[i]) && opsList.includes(list[i + 1])) {
            let ops = list[i] + list[i + 1];          
            let comb = "";
            if (ops.includes("-")) {
                switch (ops) {
                    case "+-":
                        comb = "-";
                        break;
                    case "-+":
                        comb = "-";
                        break;
                    case "--":
                        comb = "+";
                        break;
                    case "-x":
                        comb = "x";
                        break;
                    case "x-":
                        comb = "x";
                        list[i + 2] *= -1;
                        break;
                    case "-/":
                        comb = "/";
                        break;
                    case "/-":
                        comb = "/";
                        list[i + 2] *= -1;
                        break;
                }
                list[i] = comb;
                list[i + 1] = "";               
            }
            else {
             list[i] = "";
            }
                list = list.filter(x => x != "");
                return combineOps(list);
            }
        }  
    return list;
}

function combineNums(list) {
    for (let i = 0; i < list.length; i++) {
        if (typeof list[i] == "number" && typeof list[i + 1] == "number") {
            list[i] = Number(String(list[i]) + String(list[i + 1]));
            list[i + 1] = "";
            list = list.filter(x => {return x || x === 0});
            return combineNums(list);
        }
    }
    list = list.filter(x => x != "");
    return list;
}

function combineCommas(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == "." && list[i + 1] == ".") {
            list[i + 1] = "";
            list = list.filter(x => {return x || x === 0});
            return combineCommas(list);
        }
    }
    list = list.filter(x => {return x || x === 0});
    return list;
}

function sortInput(list) {
    list = combineCommas(list);
    list = combineOps(list);
    list = combineNums(list);
  
    for (let i = 0; i < list.length; i++) {
        if (list[i] == ".") {
            list[i - 1] += (list[i + 1] / (10 ** String(list[i + 1]).length));
            list[i] = "";
            list[i + 1] = "";
            list = list.filter(x => x != "");
        }
    }
    return list;
}

function toFixedIfNecessary( value, dp ){
    return +parseFloat(value).toFixed( dp );
  }
