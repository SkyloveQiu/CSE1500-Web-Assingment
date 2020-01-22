class GameObject {
    constructor(selector,socket) {
        var rows,collums,selector;
        this.rows = 6;
        this.collums = 7;
        this.selector = selector;
        this.socket = socket;
        this.player = null;
        this.turn = false;
        this.fullScreen = false;
        
        
    }


   
    getPlayer() {
        return this.player;
    }

    setPlayer(player) {
        this.player = player;
    }

    getTurn() {
        return this.turn;
    }

    setTurn(turn) {
        this.turn = turn;
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
            let mess = JSON.stringify(message);
            this.socket.send(mess);
            this.turn = false;
            $("#GameStatus .Status").text("It's not your turn. please wait for other user to opperate!");


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
            if (that.turn === true) {
                const cellList = $(`.collum[data-collum='${collum}']`)
                for (let i = cellList.length; i >= 0; i--) {
                    const $cell = $(cellList[i]);
                    if ($cell.hasClass("empty")) {
                        return [$cell,i];
                    }
                }
                return null;
            }
        }

        $board.on('mouseenter','.collum.empty',function() {
            if (that.turn === true) {
                const collum = $(this).data('collum');
                const cellList = findLastEmptyCell(collum);
                const $lastEmptyCell = cellList[0];
                $lastEmptyCell.addClass("highLight");
            }
        })


        $board.on('mouseleave','.collum', function() {
            if (that.turn === true) {
                $('.collum').removeClass("highLight");
            }
        })

        $("#FullScreen").click(function () { 
            if (that.fullScreen === false) {
                $board.addClass("full");
                that.fullScreen = true;
            } else {
                $board.removeClass("full");
                that.fullScreen = false;
            }
            
        });
        $board.on('click','.collum.empty',function () { 
            console.log(that.turn);
            if (that.turn === true) {
                const collum = $(this).data("collum");
                const result = findLastEmptyCell(collum);
                const $lastEmptyCell = result[0];
                const row = result[1];
                that.occupyCell($lastEmptyCell,that.player);
                that.updateGameState(collum,row,that.player,false);
            }
            playSound();
         })

         console.log("set up");

         function playSound() {
            var audio = document.getElementById('audio');
            audio.play();
        }




    }




}