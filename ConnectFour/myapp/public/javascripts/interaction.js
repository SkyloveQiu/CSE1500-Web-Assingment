(function setup() {
    var socket = new WebSocket("ws://localhost:3000");

    const gameObject = new GameObject('#game',socket);

    socket.onmessage = function (event) { 
        console.log("message recieved");
        let incomingMessage = JSON.parse(event.data);
        let $clicked = null;
        console.log(incomingMessage);
        if (incomingMessage.type === "START-GAME") {
            console.log(incomingMessage);
            gameObject.setTurn(true);
            $("#GameStatus .Status").text("It's your turn.");
        }

        if (incomingMessage.type === Messages.T_PLAYER_BLACK) {
            gameObject.setPlayer("black");
            gameObject.createGrid();
            gameObject.setUpMouseControl();
            $("#GameStatus").append(`<p class="GamerRed"> You own the black</p>`);
            $("#GameStatus").append(`<p class="Status"> It's not your turn. please wait for other user to opperate!</p>`)


        }

        if (incomingMessage.type === Messages.T_PLAYER_RED) {
            gameObject.setPlayer("red");
            gameObject.createGrid();
            gameObject.setUpMouseControl();
            $("#GameStatus").append(`<p class="GamerRed"> You own the red</p>`);
            $("#GameStatus").append(`<p class="GamerRed Status"> Game is not starting, please wait for other player to join</p>`)
        }

        if (incomingMessage.type === Messages.T_MAKE_A_MOVE) {
            let collum = incomingMessage.data.collum;
            let row = incomingMessage.data.row;
            let player = incomingMessage.data.player;
            gameObject.updateGameState(collum,row,player,true);
            gameObject.setTurn(true);
            $("#GameStatus .Status").text("It's your turn.");
        }


        if (incomingMessage.type === Messages.T_YOU_LOST) {
            gameObject.setTurn(false);
            alert("You lost this game");
        }

        if (incomingMessage.type === Messages.T_GAME_WON) {
            gameObject.setTurn(false);
            alert("You win this game");
        }




     }
     console.log("game ready");

})();