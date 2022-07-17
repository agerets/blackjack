import { IPlayer } from '../player/type';

export interface IGameOpts {
    playerName?: string | null;
    botName?: string | null;
    deck: Array<any>; // TODO: add cards type
}

export interface IGameResult {
    winner: string;
    players: Array<IPlayer>;
}
