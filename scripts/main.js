function initialiseDoc() {
    getCurrentYear();
    $("#consoleInput").focus();
    submitCommand();
    //always focus on input
    $(document).click(function(event) {$("#consoleInput").focus();});
}

function getCurrentYear() {
    console.log(new Date().getFullYear())
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
    var jsonHost = "https://jsonkeeper.com/b/TNDI";
    $.getJSON(jsonHost, function(data){
        $.each(data, function(key, val) {
            if (key == inputText) {
                if (val.text) {
                    $.each(val.text, function(value) {
                        $("#content").append("<span class='cmdHistory'>" + value);
                    });
                }
                if (val.action) {
                    switch (val.action) {
                        case 'redirect': 
                            window.open('val.action.content', '_blank');
                    }
                }
            } else {
                $("#content").append("<span>'" + text + "' is not recognized as an internal or external command.</span><br><span>Try -help for a list of commands.</span><br><br>");
            }
        });
    });
    
}