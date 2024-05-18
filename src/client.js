const io = require("socket.io-client")

const socket = io('https://tabletoppokemon-server.onrender.com')
// const socket = io('http://localhost:3001')

// socket.on('get-players', (data) => {
//   data
// })

export default socket
