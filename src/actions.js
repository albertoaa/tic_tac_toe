import * as consts from './consts'

export function play(square) {
    return {type: consts.PLAY, square}
}

export function historyJump(moment) {
    return {type: consts.HISTORY_JUMP, moment}
}