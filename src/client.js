const io = require("socket.io-client")

const socket = io('http://localhost:3001')

// socket.on('get-players', (data) => {
//   data
// })

export default socket
