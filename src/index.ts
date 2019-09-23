import express from "express"
import { Socket } from "socket.io"

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
