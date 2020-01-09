var main = function() {
    "use strict";

    var toDos = [
        "Finish writting this book",
        "Take Gracie to the park",
        "Answer emails",
        "Prep for Monday's class",
        "Make up some new toDos",
        "Get Groceries"
    ];







    $(".tabs a span").toArray().forEach(function(element) {
        $(element).on("click",function(){
            var $element = $(element);
            var $content;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if($element.parent().is(":nth-child(1)")) {
                console.log("First tab clicked!");
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function(todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Third tab clicked!");
            }

            return false;
        });
        
    });
}

$(document).ready(main);