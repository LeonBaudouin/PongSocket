import { Server, Socket } from "socket.io";
import { EventsIn } from "./Events";

export default class SocketWrapper
{
    private socket: Socket
    private io: Server

    constructor(socket: Socket, io: Server) {
        this.io = io
        this.socket = socket

        this.socket.on(EventsIn.PLAYER_REGISTER, (data) => this.onPlayerRegister(data))
        this.socket.on(EventsIn.NEW_GAME, (data) => this.onNewGame(data))
        this.socket.on(EventsIn.JOIN_GAME, (data) => this.onJoinGame(data))
        this.socket.on(EventsIn.READY, (data) => this.onReady(data))
        this.socket.on(EventsIn.PLATFORM_MOVE, (data) => this.onPlatformMove(data))
    }

    private onPlayerRegister(name: string)
    {
    }

}