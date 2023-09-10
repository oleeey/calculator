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
        let num = 0;
        let op = "";
        for (let i in input) {
            if (typeof(input[i]) == "number") {
                num = input[i];
            }
            else {
                op = input[i]
            }
        
        }
        console.log(num, op)

        $("#display").text(output);
    })
});