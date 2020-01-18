var express = require("express");
var http = require("http");
var websocket = require("ws");
var Game = require("./server/game")

var messages = require("./public/javascripts/messages")
var gameStatus = require("./server/gameStatus");


var port = 3000;
var app = express();

app.use(express.static(__dirname+"/public"));

app.get('/',(req,res) => {
    res.render("/Users/skylove/CSE1500/Web-Assignment/ConnectFour/myapp/views/splash.ejs",{ players_connected: gameStatus.playerConnected, games_won: gameStatus.gameCompleted, game_init: gameStatus.gameInitialized})
})

app.get('/game', function (req, res) {
    res.sendFile("game.html", {root: "./public/game"});
});

var server = http.createServer(app);
const WebSocketServer = new websocket.Server({server});

var websocketsClient = {};

setInterval(function () {
    for (let i in websocketsClient) {
        let gameObj = websocketsClient[i];
        if (gameObj.finalGamestate()) {
            console.log("Deleting element " + i);
            delete websocketsClient[i];
        }
    }
}, 50000);

console.log(gameStatus.gameInitialized);
var currentGame = new Game(0);

console.log(currentGame);
var connectionID = 0; //each websocket receives a unique ID


WebSocketServer.on("connection", function connection(ws) {
    console.log("connected....");
    let newPlayer = ws;
    newPlayer.id = connectionID++;
    let playerType = currentGame.addPlayer(newPlayer);
    gameStatus.playersConnected++;
    websocketsClient[newPlayer.id] = currentGame;

    console.log("Player %s placed in game %s as %s", newPlayer.id, currentGame.id, playerType);

    /*
     * Inform the client about its assigned player type
     */

    newPlayer.send((playerType === "Red") ? messages.S_PLAYER_RED : messages.S_PLAYER_BLACK);

    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame.setState("Red TURN");
        currentGame.red.send(messages.S_START_GAME);
        currentGame = new Game(gameStatus.gamesInitialized++);//gameStatus.gamesInitialized++
    }

    newPlayer.on("message", function incoming(message) {
        let mess = JSON.parse(message);

        let gameObj = websocketsClient[newPlayer.id];
        let isPlayerRed = (gameObj.red === newPlayer);
        
        if (gameObj.hasTwoConnectedPlayers()) {
            if (mess.type === messages.T_MAKE_A_MOVE) {
                if (isPlayerRed) {
                    gameObj.setState("Black TURN");
                    gameObj.black.send(message);  
                } else {
                    gameObj.setState("Red TURN");
                    gameObj.red.send(message);
                }
                if (mess.type === messages.T_GAME_WON) {
                    gameStatus.gamesWon++;
                    if (isPlayerRed) {
                        gameObj.black.send(messages.S_YOU_LOST);
                        gameObj.setState("Red WON");
                    } else {
                        gameObj.red.send(messages.S_YOU_LOST);
                        gameObj.setState("Black WON");
                    }
                }
            }
        }
    });

    newPlayer.on("close", function (code) {
        console.log(newPlayer.id + " disconnected...");

        if (code == "1001") {
            let gameObj = WebSocketServer[newPlayer.id];

            if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
                gameObj.setState("ABORTED");
            }

            try {
                gameObj.Red.close();
                gameObj.Red = null;
                gameStatus.playersConnected--;
            } catch (e) {
                console.log("red player closing: " + e);
            }

            try {
                gameObj.black.close();
                gameObj.black = null;
                gameStatus.playersConnected--;
            } catch(e) {
                console.log("Black player closing: " + e);
            }
        }
    });
});

server.listen(port);




