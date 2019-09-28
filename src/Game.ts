import ExtendedSocket from "./ExtendedSocket";
import { Errors } from "./Errors";
import Player from "./Player";

export default class Game
{
    public static list: Game[] = []

    public name: string
    public players: Player[] = []
    public state: GameState = GameState.waiting

    public constructor(name: string)
    {
        this.name = name
    }

    public isFull() : boolean
    {
        return this.players.length > 1
    }

    public getData()
    {
        return {
            name: this.name,
            state: this.state,
            players: this.players.map(player => player.username)
        }
    }

    public playerJoin(player: Player): Promise<Player|never>
    {
        if (this.state != GameState.waiting) {
            console.log('GAME IS CURRENTLY ' + this.state)
            Promise.reject(Errors.GAME_UNAVAILABLE)
        }
        if (this.isFull) {
            console.log('GAME ' + this.name + ' IS FULL : ' + Player.name + ' TRIED TO JOIN')
            Promise.reject(Errors.GAME_FULL)
        }
        
        player.game = this
        this.players.push(player)
        return Promise.resolve(player)
    }

    public static add(socket: ExtendedSocket, gameName: string): Promise<Game|never>
    {
        if (!socket.player) {
            console.log('Some dude\'s trying to create a game')
            return Promise.reject()
        }
        if (!this.gameNameIsValid(gameName)) {
            console.log('GAME_NAME_INVALID: ' + gameName)
            return Promise.reject(Errors.GAME_NAME_INVALID)
        }

        if (this.gameNameExists) {
            console.log('GAME_NAME_TAKEN: ' + gameName)
            return Promise.reject(Errors.GAME_NAME_TAKEN)
        }

        const game = new Game(gameName)
        Game.list.push(game)

        return Promise.resolve(game)
    }

    private static gameNameIsValid(gameName: string)
    {
        return typeof gameName === 'string' && gameName.match(/^[\w-\d]{1,15}$/g)
    }

    private static gameNameExists(gameName: string)
    {
        return !!Game.list.filter((game) => gameName === game.name).length
    }

    public static getDataList()
    {
        return Game.list.map(game => game.getData)
    }

    public static getGameByName(name: string): Promise<Game|never>
    {
        const list = Game.list.filter((game) => game.name == name)
        if (list.length == 0) {
            return Promise.reject(Errors.GAME_NOT_FOUND)
        }
        return Promise.resolve(list[0])
    }

}

export enum GameState {
    waiting = 'waiting',
    running = 'running',
    ended = 'ended'
}