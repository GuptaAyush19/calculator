$(document).ready(function() {
    var n = [0];
    var failSafe = true;
    // $(".display").text();

    function display(str) {
        $(".display").text(str);
    }

    function blurDisplay(str) {
        $(".blur-display").text(str);
    }

    function lastTerm(arr) {
        return arr.length - 1;
    }

    function checkLenOfNum() {
        if (parseFloat(n[lastTerm(n)]) > 999999) {
            $(".display").css("font-size", "25px");
            return;
        }
    }

    // Take integer input from the user
    $(".integer div").click(function() {
        if (failSafe) {
            if (n.length >= 1) {
                $("#AC").text("C");
            }
            n[lastTerm(n)] = parseFloat($(this).text());
            if (parseFloat($(".display").text()) != 0) {
                n[lastTerm(n)] = (parseFloat($(".display").text() + n[lastTerm(n)]));
            }
            checkLenOfNum();
            display(n[lastTerm(n)]);
            console.log(n);
        }
    });

    // Take operator input from the user
    $(".operator").click(function() {
        $(".display").css("font-size", "75px");
        var str = "";
        if ($(this).text() != "=") {
            failSafe = true;
            let operator = $(this).text();
            blurDisplay(n[lastTerm(n)]);
            if (operator == "×") {
                operator = "*";
            } else if (operator == "÷") {
                operator = "/";
            }
            n.push(operator, 0);
            console.log(operator);
            display(0);
            checkLenOfNum();
        } else {
            for (i in n) {
                str += n[i];
            }
            var ans = eval(str);
            n = [ans];
            failSafe = false;
        }
        $("#AC").text("AC");
        blurDisplay(ans);
        display(ans);
    });

    $(".other-operator").click(function() {
        if (failSafe) {
            let otherOperator = $(this).text();
            if (otherOperator == "±") {
                n[lastTerm(n)] = parseFloat($(".display").text()) * (-1);
            }
            if (otherOperator == "%") {
                console.log("divide");
                blurDisplay(n[lastTerm(n)]);
                display(0);
                n.push("*", 100, "/", 0);
                failSafe = true;
            }
        }
    });

    // Clear button
    $("#AC").click(function() {
        $(".display").css("font-size", "75px");
        if ($(this).text() != "C") {
            console.log(n);
            location.reload();
        }
        $(this).text("AC");
        n[lastTerm(n)] = 0;
        display(0);
    });
});