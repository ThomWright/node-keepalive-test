import * as net from "net"
import * as http from "http"
import {PORT, SERVER_SOCKET_TIMEOUT, tsLog} from "./common"

interface SocketIdExt {
  id?: number
}

const agent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 1_000,
  maxSockets: 2,
  maxFreeSockets: 128,
  timeout: SERVER_SOCKET_TIMEOUT / 4,
})

let id = 0

const sendReq = () => {
  tsLog("req")
  const req = http.request(
    {
      host: "localhost",
      port: PORT,
      agent,
    },
    (res) => {
      tsLog(
        "res",
        (res.socket as net.Socket & SocketIdExt).id,
        res.socket.localPort,
        "->",
        res.socket.remotePort,
      )
      // tslint:disable-next-line: no-empty
      res.on("data", () => {}) // Apparently it is required to consume the data
      res.on("error", (err) => {
        tsLog("res", err)
      })
    },
  )
  req.on("error", (err) => {
    tsLog("req", err)
  })
  req.on("socket", (socket: net.Socket & SocketIdExt) => {
    if (socket.id == null) {
      socket.id = id++
      socket.on("connect", () =>
        tsLog("socket", socket.id, socket.localPort, "connect"),
      )
      socket.on("timeout", () =>
        tsLog("socket", socket.id, socket.localPort, "timeout"),
      )
      socket.on("error", (err) =>
        tsLog("socket", socket.id, socket.localPort, "error", err),
      )
      socket.on("close", () =>
        tsLog("socket", socket.id, socket.localPort, "close"),
      )
      socket.on("end", () =>
        tsLog("socket", socket.id, socket.localPort, "end"),
      )
    }
  })
  req.end()
}

sendReq()
sendReq()
sendReq()
sendReq()

const interval = setInterval(() => {
  sendReq()
  sendReq()
}, 2_800)

setTimeout(() => clearInterval(interval), 15_000)

process.addListener("exit", () => {
  tsLog("Destroy agent")
  agent.destroy()
})
