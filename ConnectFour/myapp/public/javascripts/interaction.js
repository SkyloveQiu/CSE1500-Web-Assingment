(function setup() {
    var socket = new WebSocket("ws://localhost:3000");

    const gameObject = new GameObject('#game',socket);

    socket.onmessage = function (event) { 
        let incomingMessage = JSON.parse(event.data);
        let $clicked = null;

        if (incomingMessage.type === Messages.S_START_GAME) {
            console.log(incomingMessage);
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
     console.log("game ready");

})();