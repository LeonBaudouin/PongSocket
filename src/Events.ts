export enum EventsIn
{
    PLAYER_REGISTER = 'player register',
    NEW_GAME = 'new game',
    JOIN_GAME = 'join game',
    READY = 'ready',
    PLATFORM_MOVE = 'platform move'
}

export enum EventsOut
{
    REGISTERED = 'registered',
    UPDATE_GAME = 'update game',
    UPDATE_GAMES = 'update games',
    GAME_START = 'game_start',
    PLATFORM_MOVE = 'plateform move',
    READY = 'ready',
    ERROR = 'pong error'
}