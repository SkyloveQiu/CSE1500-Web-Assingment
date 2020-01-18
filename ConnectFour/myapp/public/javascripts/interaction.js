(function setup() {
    const gameObject = new GameObject('#game');
    var dropMusic = new Audio("../music/click.wav");
    var socket = new WebSocket("ws://localhost:3000");

    const gameObject = new GameObject('#game',socket);

    socket.onmessage = function (event) { 
        let incomingMessage = JSON.parse(event.data);
        let $clicked = null;

        if (incomingMessage.type === "START-GAME") {
            gameObject.setTurn(true);
        }

        if (incomingMessage.type === Messages.T_PLAYER_BLACK) {
            gameObject.setPlayer("black");
            gameObject.createGrid();


        }

        if (incomingMessage.type === Messages.T_PLAYER_RED) {
            gameObject.setPlayer("red");
            gameObject.createGrid();
        }

        if (incomingMessage.type === Messages.T_MAKE_A_MOVE) {
            let collum = incomingMessage.data.collum;
            let row = incomingMessage.data.row;
            let player = incomingMessage.data.player;
            gameObject.updateGameState(collum,row,player,true);
        }
     }

})();