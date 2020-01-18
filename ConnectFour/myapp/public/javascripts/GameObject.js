class GameObject {
    constructor(selector,socket) {
        var rows,collums,selector;
        this.rows = 6;
        this.collums = 7;
        this.selector = selector;
        this.socket = socket;
        this.createGrid();
        this.player = null;
        this.turn = false;
        this.GameMatrix = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0], // 0 means nothing, 1 means red , 2 means black XD.
        ]
        
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


    updateGameState(collum,row,player,myTurn) {
        if(myTurn) {
            const $board = $(this.selector);
            const cellList = $(`.collum[data-collum='${collum}']`);
            const $cell = $(cellList[row]);
            this.occupyCell($cell,player);
        } else {
            let message = Messages.O_MAKE_A_MOVE;
            message.data.collum = collum;
            message.data.row = row;
            message.data.player = this.player;
            mess = JSON.stringify(message);
            this.socket.send(mess);
            this.turn = false;



        }


    }


    occupyCell($cell,colour) {
        $cell.removeClass("empty");
        $cell.addClass(colour);
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
            that.occupyCell($lastEmptyCell,that.player);

         })


    }


}