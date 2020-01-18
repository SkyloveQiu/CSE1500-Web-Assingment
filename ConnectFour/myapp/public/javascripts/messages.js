(function(exports){

    exports.O_START_GAME = {
        type: "START-GAME"
    }
    exports.S_START_GAME = JSON.stringify(exports.O_START_GAME);

    exports.T_GAME_WON = "GAME-WON";             
    exports.O_GAME_WON = {
        type: exports.T_GAME_WON
    };
    exports.S_GAME_WON = JSON.stringify(exports.O_GAME_WON);

    exports.T_MAKE_A_MOVE = "MAKE-A-MOVE";

    exports.O_MAKE_A_MOVE = {
        type: exports.T_MAKE_A_MOVE,
        data: {
            collum:null,
            rows:null,
            player:null
        }
    };

    exports.T_YOU_LOST = "YOU_LOST";
    exports.O_YOU_LOST = {
        type: exports.T_YOU_LOST
    };
    exports.S_YOU_LOST = JSON.stringify(exports.O_YOU_LOST);

    exports.T_PLAYER_RED = "PLAYER_RED";
    exports.O_PLAYER_RED = {
        type: exports.T_PLAYER_RED
    }
    exports.S_PLAYER_RED = JSON.stringify(exports.O_PLAYER_RED);
    
    exports.T_PLAYER_BLACK = "PLAYER_BLACK";
    exports.O_PLAYER_BLACK = {
        type: exports.T_PLAYER_BLACK
    }
    exports.S_PLAYER_BLACK = JSON.stringify(exports.O_PLAYER_BLACK);
    
})(typeof exports === "undefined" ? this.Messages = {} : exports);

