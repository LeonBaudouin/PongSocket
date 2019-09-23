import { Errors } from "./Errors"
import ExtendedSocket from "./ExtendedSocket"

export default class Player
{
    public static list: Player[]

    public username: string

    public constructor(username: string)
    {
        this.username = username
    }

    public static register(socket: ExtendedSocket, username: string): Promise<Player|never>
    {
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
        Player.list.sort((a, b) => {
            if(a.username < b.username) return -1
            if(a.username > b.username) return 1
            return 0
        })
    
        return Promise.resolve(player)
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