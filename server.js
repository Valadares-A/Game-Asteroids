// https://medium.com/@raj_36650/integrate-socket-io-with-node-js-express-2292ca13d891
const app = require("express")();
const express = require("express");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { updatePlayer, Player } = require("./lib/game");
const port = 4200;

let GAME = {
  players: {},
  asteroids: [],
};

const COLORS = ["green", "red", "blue", "yellow", "pink", "orange", "purple"];

// https://stackoverflow.com/questions/54173476/js-file-gets-a-neterr-aborted-404-not-found
app.use("/", express.static("./"));

io.on("connection", function (socket) {
  socket.on("disconnect", function () {
    COLORS.push(GAME.players[socket.username].color);
    delete GAME.players[socket.username];
    io.emit("users-changed", { user: socket.username, event: "left" });
  });

  socket.on("set-name", (name) => {
    socket.username = name;
    const index = Math.floor(Math.random() * COLORS.length);
    const color = COLORS[index];
    COLORS.splice(index, 1);
    GAME.players = {
      ...GAME.players,
      [name]: new Player(
        30,
        30,
        color,
        Math.floor(Math.random() * 470),
        Math.floor(Math.random() * 470)
      ),
    };
    io.emit("users-changed", { user: name, event: "joined" });
  });

  socket.on("send-message", (message) => {
    io.emit("message", {
      msg: message.text,
      user: socket.username,
      createdAt: new Date(),
    });
  });

  socket.on("getGameState", (player, screen) => {
    updatePlayer(GAME.players[player], screen);
    io.emit("gameState", GAME);
  });

  socket.on("keydown", (player, e) => {
    if (e.key == "Right" || e.key == "ArrowRight") {
      GAME.players[player].keys.rightPressed = true;
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {
      GAME.players[player].keys.leftPressed = true;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
      GAME.players[player].keys.upPressed = true;
    }
    if (e.key == "Down" || e.key == "ArrowDown") {
      GAME.players[player].keys.downPressed = true;
    }
    if (e.key === "z") {
      GAME.players[player].keys.spacePressed = true;
    }
  });
  socket.on("keyup", (player, e) => {
    if (e.key == "Right" || e.key == "ArrowRight") {
      GAME.players[player].keys.rightPressed = false;
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {
      GAME.players[player].keys.leftPressed = false;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
      GAME.players[player].keys.upPressed = false;
    }
    if (e.key == "Down" || e.key == "ArrowDown") {
      GAME.players[player].keys.downPressed = false;
    }
    if (e.key === "z") {
      GAME.players[player].keys.spacePressed = false;
    }
  });
});

server.listen(port, function () {
  console.log("server started...");
  console.log("listening in http://localhost:" + port);
});

server.on("error", (error) => {
  console.error(error);
});
