var main = function () {
    "use strict";
    $(".comment-input button").on("click",function(event) {
        

        if($(".comment-input input").val() !== ""){
            var $new_comment = $("<p>"),
            comment_text = $(".comment-input input").val();
            $new_comment.text(comment_text);     
            $(".comment").append($new_comment);
        }
    });
};


$(document).ready(main);

