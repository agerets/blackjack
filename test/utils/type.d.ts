import { ICard } from '../../src/entities/card/type';
import { IPlayer } from '../../src/entities/player/type';

export interface CheckPlayerResultParams {
    player: IPlayer,
    playerCards: Array<ICard>,
    expectedName: string | null | undefined,
    expectedPoints: number;
}
