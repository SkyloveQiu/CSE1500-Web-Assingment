// var gameStatus = {
//     playerConnected : 0,
//     gameInitialized : 0,
//     gameAborted: 0,
//     gameCompleted :0
// };

class gameStatus {
    constructor() {
        this.playerConnected = 0;
        this.gameInitialized = 0;
        this.gameAborted = 0;
        this.gameCompleted = 0;
    }

    getPlayerConnected() {
        return this.gameCompleted;
    }

    addPlayerConnected() {
        this.playerConnected = this.playerConnected + 1;
    } 

    removePlayerConnected() {
        this.playerConnected = this.playerConnected - 1;
    }






}