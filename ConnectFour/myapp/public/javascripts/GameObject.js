class GameObject {
    constructor(selector) {
        var rows,collums,selector;
        this.rows = 6;
        this.collums = 7;
        this.selector = selector;
        this.createGrid();
        this.player = "red";
        this.setUpMouseControl();
    }

    createGrid() {
        const $board = $(this.selector);

        for (var row = 0; row < this.rows; row ++) {
            const $line = $('<div>').addClass('row');
            for(var collum = 0; collum < this.collums; collum ++) {
                const $collum = $('<div>').addClass('collum empty').attr('data-collum',collum).attr('data-row',row);
                $line.append($collum);
            }
            $board.append($line);
        }

        console.log($board);
    }


    setUpMouseControl() {
        const $board = $(this.selector);

        var that = this;
        
        function findLastEmptyCell(collum) {
            const cellList = $(`.collum[data-collum='${collum}']`)
            for (let i = cellList.length; i >= 0; i--) {
                const $cell = $(cellList[i]);
                if ($cell.hasClass("empty")) {
                    return $cell;
                }
            }
            return null;
        }





        $board.on('mouseenter','.collum.empty',function() {
            const collum = $(this).data('collum');
            const $lastEmptyCell = findLastEmptyCell(collum);
            $lastEmptyCell.addClass("highLight");
        })


        $board.on('mouseleave','.collum', function() {
            $('.collum').removeClass("highLight");
        })


        $board.on('click','.collum.empty',function () { 
            const collum = $(this).data("collum");
            const $lastEmptyCell = findLastEmptyCell(collum)
            $lastEmptyCell.removeClass("empty");
            $lastEmptyCell.addClass(that.player);
            if (that.player === "red") {
                that.player = "black";
            } else {
                that.player = "red";
            }

         })


    }


}