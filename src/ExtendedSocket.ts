import { Socket } from "socket.io";
import Player from "./Player";

export default interface ExtendedSocket extends Socket {
    player: Player
}