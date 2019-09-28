import { Server } from "socket.io";
import { EventsIn, EventsOut } from "./Events";
import Player from "./Player";
import ExtendedSocket from "./ExtendedSocket";
import Game from "./Game";

export default class SocketWrapper
{
    private socket: ExtendedSocket
    private io: Server

    constructor(socket: ExtendedSocket, io: Server)
    {
        this.io = io
        this.socket = socket

        console.log('+1')

        this.socket.on(EventsIn.PLAYER_REGISTER, (data) => this.onPlayerRegister(data))
        this.socket.on(EventsIn.NEW_GAME, (data) => this.onNewGame(data))
        this.socket.on(EventsIn.JOIN_GAME, (data) => this.onJoinGame(data))
        // this.socket.on(EventsIn.READY, (data) => this.onReady(data))
        // this.socket.on(EventsIn.PLATFORM_MOVE, (data) => this.onPlatformMove(data))
        this.socket.on('disconnect', () => this.onDisconnect())
    }

    private onPlayerRegister(name: string)
    {
        Player.register(this.socket, name)
            .then((player) => {
                this.socket.player = player
                this.socket.emit(EventsOut.REGISTERED, player.username)
                this.socket.emit(EventsOut.UPDATE_GAMES, Game.getDataList())
                console.log('player registered ' + player.username)
            })
            .catch((error) => {
                this.socket.emit(EventsOut.ERROR, {message: error.message, code: error.code})
            })
    }

    private onNewGame(gameName: string)
    {
        Game.add(this.socket, gameName)
            .then((game) => game.playerJoin(this.socket.player))
            .then((player) => {
                this.io.emit(EventsOut.UPDATE_GAMES, Game.getDataList())
                if (player.game) {
                    this.socket.join(player.game.name)
                    this.emitToGame(player.game, EventsOut.UPDATE_GAME, player.game.getData())
                    console.log(player.username + ' joined game : ' + player.game.name)
                }
            })
            .catch((error) => {if (error) this.socket.emit(EventsOut.ERROR, error)})
    }

    private onJoinGame(gameName: string)
    {
        Game.getGameByName(gameName)
            .then(game => {
                if (!this.socket.player) return Promise.reject()
                return game.playerJoin(this.socket.player)
            })
            .then((player) => {
                this.socket.emit(EventsOut.UPDATE_GAMES, Game.getDataList())
                if (player.game) {
                    this.socket.join(player.game.name)
                    this.emitToGame(player.game, EventsOut.UPDATE_GAME, player.game.getData())
                    console.log(player.username + ' joined game : ' + player.game.name)
                }
            })
            .catch((error) => {if (error) this.socket.emit(EventsOut.ERROR, error)})
    }



    private onDisconnect()
    {
        const player = this.socket.player
        if (player) {
            Player.unregister(this.socket)
                .then((deletedplayer) => {
                    console.log(deletedplayer.username + ' has disconnected.')
                })
                .catch((err) => {
                    console.error('Error onDisconnect', err)
                })
        }
    }


    private emitToGame(game: Game, eventType: EventsOut, message: any)
    {
        this.io.to(game.name).emit(eventType, message)
    }
    

}