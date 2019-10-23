{
  const osc = require("osc");
  // import "phaser";
  const Game = require("./renderer/classes/Game.js");

  const init = () => {
    new Game();
  };
  init();

  const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 1234
  });

  const ball = document.querySelector(".ball");

  udpPort.on("ready", function() {
    console.log("Listening for OSC over UDP.");
  });

  udpPort.on("message", function(oscMessage) {
    console.log(oscMessage.args);
    const x = oscMessage.args[0];
    const y = oscMessage.args[0];

    ball.style.transform = `translate(${x}px, ${y}px)`;
  });

  udpPort.on("error", function(err) {
    console.log(err);
  });

  udpPort.open();
}
