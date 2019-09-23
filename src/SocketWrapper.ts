import { Server } from "socket.io";
import { EventsIn, EventsOut } from "./Events";
import Player from "./Player";
import ExtendedSocket from "./ExtendedSocket";

export default class SocketWrapper
{
    private socket: ExtendedSocket
    private io: Server

    constructor(socket: ExtendedSocket, io: Server)
    {
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
        Player.register(this.socket, name)
            .then((player) => {
                this.socket.player = player
                this.socket.emit(EventsOut.REGISTERED, player.username)
                this.socket.emit(EventsOut.UPDATE_GAMES, Game.list)
                console.log('player registered' + player)
            })
            .catch((error) => this.socket.emit(EventsOut.ERROR, error))
    }

    private onNewGame(name: string)
    {

    }

}