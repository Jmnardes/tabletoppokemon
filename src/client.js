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
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10000,
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

// --- Connection error logging for production visibility ---
socket.on('connect_error', (err) => {
  console.error('[SOCKET] connect_error:', err.message, {
    type: err.type,
    description: err.description,
  })
})

socket.io.on('reconnect_error', (err) => {
  console.error('[SOCKET] reconnect_error:', err.message)
})

socket.io.on('reconnect_failed', () => {
  console.error('[SOCKET] reconnect_failed: all reconnection attempts exhausted')
})

export default socket;
