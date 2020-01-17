var game = function(gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.wordToGuess = null; //first player to join the game, can set the word
    this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
  };

game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0;
game.prototype.transitionStates["1 JOINT"] = 1;
game.prototype.transitionStates["2 JOINT"] = 2;
game.prototype.transitionStates["CHAR GUESSED"] = 3;
game.prototype.transitionStates["A"] = 4; //A won
game.prototype.transitionStates["B"] = 5; //B won
game.prototype.transitionStates["ABORTED"] = 6;

game.prototype.transitionMatrix = [
  [0, 1, 0, 0, 0, 0, 0], //0 JOINT
  [1, 0, 1, 0, 0, 0, 0], //1 JOINT
  [0, 0, 0, 1, 0, 0, 1], //2 JOINT (note: once we have two players, there is no way back!)
  [0, 0, 0, 1, 1, 1, 1], //CHAR GUESSED
  [0, 0, 0, 0, 0, 0, 0], //A WON
  [0, 0, 0, 0, 0, 0, 0], //B WON
  [0, 0, 0, 0, 0, 0, 0] //ABORTED
]