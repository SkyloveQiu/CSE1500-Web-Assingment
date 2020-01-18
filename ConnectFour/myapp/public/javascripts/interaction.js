(function setup() {
    const gameObject = new GameObject('#game');
    var dropMusic = new Audio("../music/click.wav");
    var socket = new WebSocket("ws://localhost:3000");

    const gameObject = new GameObject('#game',socket);

    

})