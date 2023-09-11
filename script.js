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
    })

    $("#equals").click(function() {
        sortInput(input);
        
       
        let op = "";
        //console.log(input)
        for (let i in input) {
            //console.log(input[i])
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
    })

    $("#clear").click(function() {
        input = [];
        output = 0;
        $("#display").text(output);
    })


});

function sortInput(list) {
    for (let i in list) {
        if (list[i] == list[i - 1]) {
            list[i] = Number(String(list[i]) + String(list[i - 1]));
            delete(list[i - 1]);
        }
    }
    console.log(list);
    for (let i in list) {
        if (list[i] == ".") {
            console.log(list[i - 1], list[i], list[i + 1])
            list[i - 1] += list[i + 1];
        }
    }
    console.log(list)
}
