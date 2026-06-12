const IS_PROD = process.env.NODE_ENV === 'production'
const LOG_ENDPOINT = process.env.REACT_APP_LOG_ENDPOINT // optional: e.g. '/api/log' or external URL

const pendingLogs = []
let flushTimer = null

function getContext() {
  try {
    return {
      playerId: localStorage.getItem('playerId') || undefined,
      sessionCode: localStorage.getItem('sessionCode') || undefined,
      url: window.location.href,
      userAgent: navigator.userAgent,
    }
  } catch {
    return {}
  }
}

function sendLogs(logs) {
  if (!LOG_ENDPOINT || logs.length === 0) return
  try {
    const blob = new Blob([JSON.stringify({ logs })], { type: 'application/json' })
    // Use sendBeacon for reliability (works even during page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(LOG_ENDPOINT, blob)
    } else {
      fetch(LOG_ENDPOINT, { method: 'POST', body: blob, keepalive: true }).catch(() => {})
    }
  } catch {
    // silently fail — logging should never break the app
  }
}

function flush() {
  if (pendingLogs.length === 0) return
  const batch = pendingLogs.splice(0)
  sendLogs(batch)
}

function queueLog(entry) {
  pendingLogs.push(entry)
  if (!flushTimer) {
    flushTimer = setTimeout(() => {
      flushTimer = null
      flush()
    }, 2000)
  }
}

const logger = {
  error(message, extra = {}) {
    const entry = {
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      ...getContext(),
      ...extra,
    }

    console.error(`[ERROR] ${message}`, extra)

    if (IS_PROD) {
      // Flush errors immediately — don't batch them
      sendLogs([entry])
    }
  },

  warn(message, extra = {}) {
    const entry = {
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      ...getContext(),
      ...extra,
    }

    console.warn(`[WARN] ${message}`, extra)

    if (IS_PROD) {
      queueLog(entry)
    }
  },

  info(message, extra = {}) {
    if (!IS_PROD) {
      console.log(`[INFO] ${message}`, extra)
    }
    // In production, info logs are only sent if LOG_ENDPOINT is set
    if (IS_PROD && LOG_ENDPOINT) {
      queueLog({
        level: 'info',
        message,
        timestamp: new Date().toISOString(),
        ...getContext(),
        ...extra,
      })
    }
  },
}

// Flush remaining logs before page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', flush)
}

export default logger
