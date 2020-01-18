var Game = function(id) {
    this.id = id;
    this.red = null;
    this.black = null;
    this.gameState = "0 JOINT";
};

Game.prototype.transitionStates = {};
Game.prototype.transitionStates["0 JOINT"] = 0;
Game.prototype.transitionStates["1 JOINT"] = 1;
Game.prototype.transitionStates["2 JOINT"] = 2;
Game.prototype.transitionStates["Red TURN"] = 3;
Game.prototype.transitionStates["Black TURN"] = 4;
Game.prototype.transitionStates["Red WON"] = 5;
Game.prototype.transitionStates["Black WON"] = 6;
Game.prototype.transitionStates["ABORTED"] = 7;

Game.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0, 0, 0],   // 0 JOINT
    [1, 0, 1, 0, 0, 0, 0, 0],   // 1 JOINT
    [0, 0, 0, 1, 0, 0, 0, 1],   // 2 JOINT
    [0, 0, 0, 0, 1, 1, 0, 1],   // W TURN
    [0, 0, 0, 1, 0, 0, 1, 1],   // B TURN
    [0, 0, 0, 0, 0, 0, 0, 0],   // W WON
    [0, 0, 0, 0, 0, 0, 0, 0],   // B WON
    [0, 0, 0, 0, 0, 0, 0, 0],   // ABORTED
];
Game.prototype.isValidTransition = function(from, to) {
    
    console.assert(typeof from == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof from);
    console.assert(typeof to == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof to);
    console.assert( from in this.transitionStates === true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, from);
    console.assert( to in this.transitionStates === true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, to);
    
    let i, j;
    if (! (from in this.transitionStates)) {
        return false;
    }
    else {
        i = this.transitionStates[from];
    }

    if (!(to in this.transitionStates)) {
        return false;
    }
    else {
        j = this.transitionStates[to];
    }

    return (this.transitionMatrix[i][j] > 0);
};

Game.prototype.isValidState = function (s) {
    return (s in this.transitionStates);
};

Game.prototype.setState = function (newState) {

    console.assert(typeof newState == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof newState);

    if (this.isValidState(newState) && this.isValidTransition(this.gameState, newState)) {
        this.gameState = newState;
        console.log("[STATUS] %s", this.gameState);
    }
    else {
        return new Error("Impossible status change from %s to %s " + this.gameState + newState);
    }
};

Game.prototype.hasTwoConnectedPlayers = function() {
    return !(this.gameState === "0 JOINT" || this.gameState === "1 JOINT" );
};

Game.prototype.addPlayer = function(player) {
    console.assert(player instanceof Object, "%s: Expecting an object (WebSocket), got a %s", arguments.callee.name, typeof player);

    if (this.hasTwoConnectedPlayers()) {
        return new Error("Invalid call to addPlayer, current state is " + this.gameState);
    }

    if(this.red === null) {
        this.red = player;
        this.setState("1 JOINT");
        return "Red";
    } else {
        this.black = player;
        this.setState("2 JOINT");
        return "Black";
    }
};

Game.prototype.finalGamestate = function(){
    switch(this.gameState){
        case "Red WON":
        case "Black WON":
        case "ABORTED":
            return true;
        default:
            return false;
    }
};

module.exports = Game;



