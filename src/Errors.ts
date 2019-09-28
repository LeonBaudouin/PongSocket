export const Errors = {
    GAME_NAME_TAKEN: {
        message: 'game name already exist',
        code: 200
    },
    GAME_NAME_INVALID: {
        message: 'invalid game name',
        code: 201
    },
    GAME_NOT_FOUND: {
        message: 'game not found',
        code: 202
    },
    GAME_FULL: {
        message: 'game full',
        code: 203
    },
    GAME_UNAVAILABLE: {
        message: 'game unavailable',
        code: 204
    },
    ALREADY_INGAME: {
        message: 'already in a game',
        code: 205
    },
    USERNAME_TAKEN: {
        message: 'username already exist',
        code: 100
    },
    USERNAME_INVALID: {
        message: 'invalid username',
        code: 101
    },
    ALREADY_CONNECTED: {
        message: 'already connected',
        code: 101
    },
}

export interface Error
{
    message: string
    code: number
}