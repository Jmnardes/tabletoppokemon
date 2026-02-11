const io = require("socket.io-client");

const SERVER_URL = process.env.REACT_APP_SOCKET_SERVER;

const getStoredAuth = () => {
  try {
    return {
      playerId: localStorage.getItem('playerId'),
      sessionCode: localStorage.getItem('sessionCode')
    }
  } catch {
    return {}
  }
}

const socket = io(SERVER_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  auth: (cb) => {
    cb(getStoredAuth())
  }
})

// Update auth on each reconnection attempt to ensure fresh credentials
socket.io.on('reconnect_attempt', () => {
  const auth = getStoredAuth()
  if (auth.playerId && auth.sessionCode) {
    socket.auth = auth
  }
})

export default socket;
