const io = require("socket.io-client")

// const socket = io('https://tabletoppokemon-server.onrender.com')
const socket = io('http://localhost:3001')

socket.on('connect', () => {
    console.log('user connected')

    if (socket.recovered)
    console.log("session recovered!");

    setTimeout(() => {
      if (socket.io.engine) {
        // close the low-level connection and trigger a reconnection
        socket.io.engine.close();
      }
    }, 3.1 * 60 * 1000);
})

socket.on('disconnect', () => {
    console.log('user disconnected')
})

export default socket
