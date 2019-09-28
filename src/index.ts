import express from "express"
import SocketWrapper from "./SocketWrapper";
import ExtendedSocket from "./ExtendedSocket";

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000


server.listen(port, () => {
  console.log('Server listening at port %d', port)
})
app.use(express.static(__dirname + '/public'))

io.on('connection', (socket: ExtendedSocket) => new SocketWrapper(socket, io))