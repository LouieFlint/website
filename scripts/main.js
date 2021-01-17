function initialiseDoc() {
    getCurrentYear();
    $("#consoleInput").focus();
    submitCommand();
    //always focus on input
    $(document).click(function(event) {$("#consoleInput").focus();});
}

function getCurrentYear() {
    $("#currentYear").html(new Date().getFullYear());
}

function submitCommand() {
    var input = $('#consoleInput');
    input.keyup(function(event) {
        if (event.keyCode == 13) {
            var text = $('#consoleInput').val().toLowerCase();
            createCommandElement(text);
            if (text != '') {
                createResponseElement(text);
                $('#consoleInput').val('');
            }            
            $('html, body').animate({scrollTop:$(document).height()}, 1);
        }
    });
}

function createCommandElement(text) {
    $("#content").append("<span class='cmdHistory'>C:&#92;Users&#92;You>" + (text != '' ?  text : '') + "</span><br>");
}

function createResponseElement(inputText) {
    var jsonHost = "https://raw.githubusercontent.com/LouieFlint/website/master/content/commands.json";
    $.getJSON(jsonHost, function(data){
        var match = false;
        $.each(data, function(i, elem) {
            console.log(data);
            if (i == inputText) {
                if (elem.text) {
                    $.each(elem.text, function(index, value) {
                        $("#content").append("<span class='cmdHistory'>" + value + "</span><br>");
                    });
               }
               if (elem.action) {
                    switch (elem.action.type) {
                        case 'redirect':
                            setTimeout(window.open(elem.action.content, '_blank'), 5000);                            
                    }
                }
                match = true;
            }
        });
        if (!match) {
            $("#content").append("<span>'" + inputText + "' is not recognized as an internal or external command.</span><br><span>Try -help for a list of commands.</span><br><br>");
        }
    });
    
}
