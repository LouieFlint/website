var theme = "windows";

function initialiseDoc() {
    setTheme(theme);
    getCurrentYear();
    $("#consoleInput").focus();
    inputListeners();
    //always focus on input
    $("body").click(function(event) {$("#consoleInput").focus();});
}

var userTexts = {
    windows: ['CMD.exe - louieflint.com', 'C:/Users/You&gt;'],
    ubuntu: ['you@louieflint.com: ~','you@louieflint.com<span class="white">:</span><span class="blue">~</span><span class="white">$</span>']
}


function setTheme(type) {
    $("#theme").attr('href',"css/theme-" + type + ".css");
    $.each($(".cmdHistory"), function(i, elem) {
        var text = elem.innerHTML.replace(userTexts[theme][1], '');
        elem.innerHTML = userTexts[type][1] + text;
    });
    $("#userText").html("<span>" + userTexts[type][1] + "</span>");
    $.each(userTexts, function(i, v){
        $(".theme-item." + i).attr("onclick", "setTheme('" + i + "')");
        $(".theme-item." + type).attr("class", "theme-item " + type);
        $("#main-title").html(userTexts[type][0]);
    })
    $(".theme-item." + type).attr("onclick","");
    $(".theme-item." + type).addClass("selected");
    theme = type;
}


function getCurrentYear() {
    $("#currentYear").html(new Date().getFullYear());
}

var historylength = 0;
var historyPos;
var lastTyped;
function inputListeners() {
    var input = $('#consoleInput');
    input.keyup(function(event) {
        if (event.keyCode == 13) {
            //sanitize input
            var text = $('#consoleInput').val().replace(/(<([^>]+)>)/ig,"");
            createCommandElement(text, theme);
            if (text.replace(/\s/g, "").length > 0) {
                createResponseElement(text);
                historylength++;
                historyPos = historylength;
            }
            $('#consoleInput').val('');
            $('html, body').animate({scrollTop:$(document).height()}, 1);
        }
        if (event.keyCode == 38) {
            if (historyPos == historylength) {
                lastTyped = $('#consoleInput').val().replace(/(<([^>]+)>)/ig,"");
            }
            if (historyPos && historyPos > 0) {
                historyPos--;
                var newText = $('.cmdHistory').children('.history')[historyPos].innerHTML;
                $('#consoleInput').val(newText);
            }
        }
        if (event.keyCode == 40) {
            if (historyPos == historylength - 1) {
                $('#consoleInput').val(lastTyped);
                historyPos++;
            }
            else if (historyPos !== null && historyPos < historylength) {
                historyPos++;        
                var newText = $('.cmdHistory').children('.history')[historyPos].innerHTML;
                $('#consoleInput').val(newText);
            }
        }
    });
}

function createCommandElement(text, theme) {
    $("#content").append("<span class='cmdHistory'>" + "<span class='userText'>" + userTexts[theme][1] + "</span><span class='history'>" + (text != '' ?  text : '') + "</span></div><br>");
}

function createResponseElement(inputText) {
    inputTextLower = inputText.toLowerCase();
    var jsonHost = "https://raw.githubusercontent.com/LouieFlint/website/gh-pages/content/commands.json";
    $.getJSON(jsonHost, function(data){
        var match = false;
        $.each(data, function(i, elem) {
            if (i == inputTextLower) {
                if (elem.text) {
                    $("#content").append("<span class='resHistory'></span>")
                    $.each(elem.text, function(index, value) {
                        $(".resHistory").last().append("<span class='resHistLine'>" + value + "</span><br>");
                    });
               }
               if (elem.action) {
                    switch (elem.action.type) {
                        case 'redirect':
                            window.open(elem.action.content, '_blank');                            
                    }
                }
                match = true;
            }
        });
        if (!match) {
            $("#content").append("<span class='resHistory'><span class='resHistLine'>'" + inputText + "' is not recognized as an internal or external command.</span><br><span class='resHistLine'>Try <span class='hintText'>-help</span> for a list of commands.</span></span><br><br>");
        }
    });
}
