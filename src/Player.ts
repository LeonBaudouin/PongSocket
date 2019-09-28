import { Errors } from "./Errors"
import ExtendedSocket from "./ExtendedSocket"
import Game from "./Game"

export default class Player
{
    public static list: Player[] = []

    public username: string
    public game: Game|null = null

    public constructor(username: string)
    {
        this.username = username
    }

    public static register(socket: ExtendedSocket, username: string): Promise<Player|never>
    {
        if (socket.player) {
            console.log('ALREADY_CONNECTED')
            return Promise.reject(Errors.ALREADY_CONNECTED)
        }
        
        if (Player.usernameExists(username)) {
            console.log('USERNAME_EXISTS: ' + username)
            return Promise.reject(Errors.USERNAME_TAKEN)
        }

        if (!Player.usernameIsValid(username)) {
            console.log('USERNAME_INVALID: ' + username)
            return Promise.reject(Errors.USERNAME_INVALID)
        }

        const player = new Player(username)
        Player.list.push(player)
    
        return Promise.resolve(player)
    }

    
    public static unregister(socket: ExtendedSocket): Promise<Player|never>
    {
        if (!socket.player) return Promise.reject('No socket user found')

        const index = Player.list.findIndex((user) => user.username === socket.player.username)
        
        if (index == null) {
            return Promise.reject(null)
        } else {
            const deleted = Player.list.splice(index, 1)[0]
            return Promise.resolve(deleted)
        }
    }


    private static usernameIsValid(username: string)
    {
        return typeof username === 'string' && username.match(/^[\w-\d]{1,15}$/g)
    }

    private static usernameExists(username: string)
    {
        return !!Player.list.filter((player) => username === player.username).length
    }

}