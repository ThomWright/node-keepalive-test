import * as http from "http"
import {PORT, SERVER_SOCKET_TIMEOUT, tsLog} from "./common"

const server = http.createServer((req, res) => {
  tsLog("req", req.socket.localPort, "<-", req.socket.remotePort)

  setTimeout(() => {
    res.writeHead(200)
    res.end()
  }, Math.random() * 1000)
})

server.keepAliveTimeout = SERVER_SOCKET_TIMEOUT

server.listen({
  host: "0.0.0.0",
  port: PORT,
})

server.on("connection", (socket) => {
  tsLog("socket", socket.remotePort, "connect")
  socket.on("timeout", () => tsLog("socket", socket.remotePort, "timeout"))
  socket.on("error", (err) => tsLog("socket", socket.remotePort, "error", err))
  socket.on("close", () => tsLog("socket", socket.remotePort, "close"))
  socket.on("end", () => tsLog("socket", socket.remotePort, "end"))
})
