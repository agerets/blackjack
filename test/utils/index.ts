
import { IPlayer } from '../../src/entities/player/type';
import { IGameOpts } from '../../src/entities/game/type';
import { CheckPlayerResultParams } from './type';

export const checkPlayerResult = ({ player, playerCards, expectedName, expectedPoints }: CheckPlayerResultParams) => {
    expect(player.name).toEqual(expectedName);
    expect(player.points).toEqual(expectedPoints);
    expect(player.cards).toBeDefined();
    expect(player.cards.length).toEqual(playerCards.length);
    player.cards.forEach((card: string, index: number) => {
        expect(card).toEqual(`${playerCards[index].suit[0]}${playerCards[index].value}`);
    });
};

export const getPlayerAndBot = (players: Array<IPlayer>, gameOpts: IGameOpts) => {
    expect(players).toBeDefined();
    expect(players.length).toEqual(2);

    const player = players.find(({ name }) => name === gameOpts.playerName);
    expect(player).toBeDefined();

    const bot = players.find(({ name }) => name === gameOpts.botName);
    expect(bot).toBeDefined();

    return {
        player,
        bot,
    } as any;
};
