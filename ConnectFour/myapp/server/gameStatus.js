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

    getGameInitialized() {
        return this.gameInitialized;
    }

    addGameInitialzed() {
        this.gameInitialized = this.gameInitialized + 1;
    }

    getGameAborted() {
        return this.gameAborted;
    }

    addGameAborted() {
        this.gameAborted = this.gameAborted + 1;
    }

    getGameCompleted() {
        return this.gameCompleted;
    }

    addGameCompleted() {
        this.gameCompleted = this.gameCompleted + 1;
    }


}