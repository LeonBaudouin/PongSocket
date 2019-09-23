import ExtendedSocket from "./ExtendedSocket";
import { Errors } from "./Errors";

export default class Game
{
    public static list: Game[]

    public name: string

    public constructor(name: string)
    {
        this.name = name
    }

    public static add(socket: ExtendedSocket, gameName: string): Promise<Game|never>
    {
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
}