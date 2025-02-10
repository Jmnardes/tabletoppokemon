const io = require("socket.io-client");

const SERVER_URL = process.env.REACT_APP_SOCKET_SERVER;
console.log(SERVER_URL)

const socket = io(SERVER_URL);

socket.on("connect", () => {
  if (socket.recovered) {
    console.log("Session recovered!");
  }

  setTimeout(() => {
    if (socket.io.engine) {
      socket.io.engine.close();
    }
  }, 3.1 * 60 * 1000);
});

socket.on("disconnect", () => {
  console.log("User disconnected");
});

export default socket;
