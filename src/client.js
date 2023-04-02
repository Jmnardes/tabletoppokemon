const io = require("socket.io-client")

const socket = io('https://tabletoppokemon-server.onrender.com')

// socket.on('get-players', (data) => {
//   data
// })

export default socket
