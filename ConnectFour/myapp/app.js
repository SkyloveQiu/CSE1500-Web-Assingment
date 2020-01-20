

var express = require("express");
var http = require("http");
var websocket = require("ws");
var Game = require("./server/game")
var GameStatus = require("./server/GameStatus");


var messages = require("./public/javascripts/messages")
var gameStatusObj = new GameStatus();


var port = 3000;
var app = express();

app.use(express.static(__dirname+"/public"));

app.get('/',(req,res) => {
    res.render("views/splash.ejs",{ players_connected: gameStatusObj.getPlayerConnected(), games_won: gameStatusObj.getGameCompleted(), game_init: gameStatusObj.getGameInitialized()})
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

var currentGame = new Game(0);

console.log(currentGame);
var connectionID = 0; //each websocket receives a unique ID


WebSocketServer.on("connection", function connection(ws) {
    console.log("connected....");
    let newPlayer = ws;
    newPlayer.id = connectionID++;
    let playerType = currentGame.addPlayer(newPlayer);
    gameStatusObj.addPlayerConnected();
    console.log(gameStatusObj.getPlayerConnected());
    websocketsClient[newPlayer.id] = currentGame;

    console.log("Player %s placed in game %s as %s", newPlayer.id, currentGame.id, playerType);

    /*
     * Inform the client about its assigned player type
     */

    newPlayer.send((playerType === "Red") ? messages.S_PLAYER_RED : messages.S_PLAYER_BLACK);

    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame.setState("Red TURN");
        currentGame.red.send(messages.S_START_GAME);
        currentGame = new Game(gameStatusObj.getGameInitialized());
        gameStatusObj.addGameInitialzed();
    }

    

    function changeMatrixStatus(row,collum,color,gameObject) {
        if (gameObject.gameMatrix[row][collum] !== 0) {
            return false;
        } else {
            gameObject.gameMatrix[row][collum] = color;
            return true;
        }
    } 


    function CheckForWinner(collum,row,tempGame,color) { 


        console.log(tempGame.gameMatrix);

        var flag = false;

        var tempCollum = collum;
        var tempRow = row;

        // check vertical

        var tempflag = 0

        for(var index = 0; index< 4; index++ ){
            if (row + index >5) {
                break;
            }
            if(tempGame.gameMatrix[row+index][collum] === color){
                tempflag++;
            } else {
                tempflag = 0;
            }
        }
        if (tempflag === 4) {
            flag = true;
        } 
        tempflag = 0;
        

        //check horizontal
        for(var index = 0; index < 7 ; index ++) {
            if(tempGame.gameMatrix[row][index] === color) {
                tempflag ++;
            } else {
                tempflag = 0;
            }
            if (tempflag === 4) {
                flag = true;
                break;
            }
        }

        if (tempflag <4) {
            tempflag= 0;
        }

        //check left up to right down
        for(var index = -6 ; index <= 6 ; index++) {
            if ((index + collum < 0) || (index + row < 0)) {
                continue;
            } else if ((index + collum > 6) || (index + row > 5)) {
                break;
            }
            if (tempGame.gameMatrix[index+row][index+collum] === color) {
                tempflag++;
            } else {
                tempflag = 0;
            }
            if (tempflag == 4) {
                flag = true;
                break;
            }

        }

        tempflag = 0;
        for(var index = -6 ; index <= 6 ; index++) {
            if ((index + collum < 0) || (index - row > 5)) {
                continue;
            } else if ((index + collum > 6) || (index - row < 0)) {
                break;
            }
            if (tempGame.gameMatrix[index-row][index+collum] === color) {
                tempflag++;
            } else {
                tempflag = 0;
            }
            if (tempflag == 4) {
                flag = true;
                break;
            }

            

        }


        return flag;
       

        
        
        


        



     }

    newPlayer.on("message", function incoming(message) {
        let mess = JSON.parse(message);

        let gameObj = websocketsClient[newPlayer.id];
        let isPlayerRed = (gameObj.red === newPlayer);
        
        if (gameObj.hasTwoConnectedPlayers()) {
            if (mess.type === messages.T_MAKE_A_MOVE) {
                if (isPlayerRed) {
                    console.log(message)
                    let incomingMessage = JSON.parse(message);
                    let collum = incomingMessage.data.collum;
                    let row = incomingMessage.data.row;                
                    let result = changeMatrixStatus(row,collum,1,gameObj);
                    let gameResult = CheckForWinner(collum,row,gameObj,1);
                    
                    if(result === false) {
                        gameObj.red.send(messages.S_INVALID_DROP);
                        console.log("Invalid move!");
                    }else {
                        gameObj.setState("Black TURN");
                        gameObj.black.send(message); 
                    
                    }

                    if(gameResult === true) {
                        gameObj.red.send(messages.S_GAME_WON);
                        gameObj.black.send(messages.S_YOU_LOST);
                    }

                     
                } else {
                    let incomingMessage = JSON.parse(message);
                    let collum = incomingMessage.data.collum;
                    let row = incomingMessage.data.row;                
                    let result = changeMatrixStatus(row,collum,2,gameObj);
                    let gameResult = CheckForWinner(collum,row,gameObj,2);
                    
                    if(result === false) {
                        gameObj.black.send(messages.S_INVALID_DROP);
                        console.log("Invalid move!");
                    }else {
                        gameObj.setState("Red TURN");
                        gameObj.red.send(message); 
                    }
                    if(gameResult === true) {
                        gameObj.black.send(messages.S_GAME_WON);
                        gameObj.red.send(messages.S_YOU_LOST);
                    }
                    
                }
                // if (mess.type === messages.T_GAME_WON) {
                //     gameStatus.gamesWon++;
                //     if (isPlayerRed) {
                //         gameObj.black.send(messages.S_YOU_LOST);
                //         gameObj.setState("Red WON");
                //     } else {
                //         gameObj.red.send(messages.S_YOU_LOST);
                //         gameObj.setState("Black WON");
                //     }
                // }
            }
        }
    });

    newPlayer.on("close", function (code) {
        console.log(newPlayer.id + " disconnected...");

        if (code == "1001") {
            let gameObj = websocketsClient[newPlayer.id];
            if (gameObj !== undefined) {
                if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
                    gameObj.setState("ABORTED");
                }
    
                try {
                    gameObj.Red.close();
                    gameObj.Red = null;
                    gameStatusObj.removePlayerConnected();
                } catch (e) {
                    console.log("red player closing: " + e);
                }
    
                try {
                    gameObj.black.close();
                    gameObj.black = null;
                    gameStatusObj.removePlayerConnected();
                } catch(e) {
                    // TODO: fix bug
                    console.log("Black player closing: " + e);
                }
            }

           
        }
    });
});

server.listen(port);




