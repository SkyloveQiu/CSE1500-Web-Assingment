var main = function(toDoObjects) {
    "use strict";

    var toDos = toDoObjects.map(function(toDo) {
        return toDo.discription;
    });





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
                $("main .content").hide();
                $("main .content").append($content);
                $("main .content").fadeIn();
                
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Third tab clicked!");
            }

            return false;
        });
        
    });
}

$(document).ready(function() {  
    $.getJSON("toDos.json",function (toDoObjects) {
        main(toDoObjects); 
    });
});