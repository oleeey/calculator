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
                    if (op == "/") {input[i] > 0 ? output /= input[i] : output = 0;}
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
    let ops = ["+", "-", "x", "/"];
    let comb = "";
    for (let i = 0; i < list.length; i++) {
        if (ops.includes(list[i]) && ops.includes(list[i + 1])) {
            let ops2 = list[i] + list[i + 1];
            if (ops2.includes("-")) {
                console.log();
            }
            
            }
        }  
    return list;
}

function combineNums(list) {
    for (let i = 0; i < list.length; i++) {
        if (typeof list[i] == "number" && typeof list[i + 1] == "number") {
            list[i] = Number(String(list[i]) + String(list[i + 1]));
            list[i + 1] = "";
            list = list.filter(x => x != "");
            return combineNums(list);
        }
    }
    list = list.filter(x => x != "");
    return list;
}

function sortInput(list) {
    console.log(list);

    list = combineOps(list);
    list = combineNums(list);
    console.log(list);
  
    for (let i = 0; i < list.length; i++) {
        if (list[i] == ".") {
            //console.log(list[i - 1], list[i], list[i + 1])
            list[i - 1] += (list[i + 1] / (10 ** String(list[i + 1]).length));
            list[i] = "";
            list[i + 1] = "";
            list = list.filter(x => x != "");
        }
    }
    return list;
}


