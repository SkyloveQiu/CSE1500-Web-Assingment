var main = function () {
    "use strict";


var addCommentFromInputBox = function() {
    var $new_comment = $("<p>"),
    comment_text = $(".comment-input input").val();
    $new_comment.text(comment_text);
    $new_comment.hide();  
    $(".comment").append($new_comment);
    $new_comment.fadeIn();
    $(".comment-input input").val("");

}


    $(".comment-input button").on("click",function(event) {

        if($(".comment-input input").val() !== ""){
            addCommentFromInputBox();
        }
    });

    $(".comment-input input").on("keypress",function(event){
        if(event.keyCode == 13) {
            if($(".comment-input input").val() !== ""){
                addCommentFromInputBox();
            }
        }
    });
};


$(document).ready(main);

