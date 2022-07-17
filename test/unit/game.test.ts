import { Game } from '../../src/entities/game';
import { IGameOpts, IGameResult } from '../../src/entities/game/type';
import { checkPlayerResult, getPlayerAndBot } from '../utils';

jest.mock('../../src/config/schema', () => ({
    ...jest.requireActual('../../src/config/schema').default,
    deckUrl: 'http://test.com/shuffle',
}));

describe('Unit tests - Game', () => {
    const playerName = 'Andrey';
    const botName = 'Bot';

    it('If Player\'s points equal 21 after 1st draw then he wins', () => {
        const gameOpts: IGameOpts = {
            playerName,
            botName,
            deck: [
                { suit: 'SPADES', value: 'A' },
                { suit: 'HEARTS', value: 'J' },
                { suit: 'DIAMONDS', value: '10' },
                { suit: 'CLUBS', value: '4' },
            ],
        };
        const result: IGameResult = Game.play(gameOpts);
        expect(result.winner).toEqual(gameOpts.playerName);
        
        const { player, bot } = getPlayerAndBot(result.players, gameOpts);

        checkPlayerResult({
            player,
            playerCards: [gameOpts.deck[0], gameOpts.deck[1]],
            expectedName: gameOpts.playerName,
            expectedPoints: 21,
        });

        checkPlayerResult({
            player: bot,
            playerCards: [gameOpts.deck[2], gameOpts.deck[3]],
            expectedName: gameOpts.botName,
            expectedPoints: 14,
        });
    });

    it('If Player\'s points not equal 21 after 1st draw and Bot\'s points equal 21 after 1st draw then he wins', () => {
        const gameOpts: IGameOpts = {
            playerName,
            botName,
            deck: [
                { suit: 'DIAMONDS', value: '10' },
                { suit: 'CLUBS', value: '9' },
                { suit: 'SPADES', value: 'Q' },
                { suit: 'HEARTS', value: 'A' },
            ],
        };

        const result: IGameResult = Game.play(gameOpts);
        expect(result.winner).toEqual(gameOpts.botName);

        const { player, bot } = getPlayerAndBot(result.players, gameOpts);

        checkPlayerResult({
            player,
            playerCards: [gameOpts.deck[0], gameOpts.deck[1]],
            expectedName: gameOpts.playerName,
            expectedPoints: 19,
        });

        checkPlayerResult({
            player: bot,
            playerCards: [gameOpts.deck[2], gameOpts.deck[3]],
            expectedName: gameOpts.botName,
            expectedPoints: 21,
        });
    });

    it('If Player exceed 21 points after next draws Player loose without Bot having to draw more cards', () => {
        const gameOpts: IGameOpts = {
            playerName,
            botName,
            deck: [
                { suit: 'SPADES', value: 'A' },
                { suit: 'SPADES', value: '2' },
                { suit: 'CLUBS', value: '6' },
                { suit: 'CLUBS', value: 'A' },
                { suit: 'DIAMONDS', value: '2' },
                { suit: 'DIAMONDS', value: 'J' },
            ],
        };

        const result: IGameResult = Game.play(gameOpts);
        expect(result.winner).toEqual(gameOpts.botName);

        const { player, bot } = getPlayerAndBot(result.players, gameOpts);

        checkPlayerResult({
            player,
            playerCards: [gameOpts.deck[0], gameOpts.deck[1], gameOpts.deck[4], gameOpts.deck[5]],
            expectedName: gameOpts.playerName,
            expectedPoints: 25,
        });

        checkPlayerResult({
            player: bot,
            playerCards: [gameOpts.deck[2], gameOpts.deck[3]],
            expectedName: gameOpts.botName,
            expectedPoints: 17,
        });
    });

    it('If Bot\'s points after next draws more than Player\'s points and exceed 21 points he looses', () => {
        const gameOpts: IGameOpts = {
            playerName,
            botName,
            deck: [
                { suit: 'DIAMONDS', value: 'Q' },
                { suit: 'SPADES', value: 'Q' },
                { suit: 'CLUBS', value: 'J' },
                { suit: 'HEARTS', value: '8' },
                { suit: 'SPADES', value: 'A' },
            ],
        };

        const result: IGameResult = Game.play(gameOpts);
        expect(result.winner).toEqual(gameOpts.playerName);

        const { player, bot } = getPlayerAndBot(result.players, gameOpts);

        checkPlayerResult({
            player,
            playerCards: [gameOpts.deck[0], gameOpts.deck[1]],
            expectedName: gameOpts.playerName,
            expectedPoints: 20,
        });

        checkPlayerResult({
            player: bot,
            playerCards: [gameOpts.deck[2], gameOpts.deck[3], gameOpts.deck[4]],
            expectedName: gameOpts.botName,
            expectedPoints: 29,
        });
    });

    it('If Bot\'s points after next draws more than Player\'s points and less 21 he wins', () => {
        const gameOpts: IGameOpts = {
            playerName,
            botName,
            deck: [
                { suit: 'SPADES', value: '2' },
                { suit: 'DIAMONDS', value: '10' },
                { suit: 'CLUBS', value: '3' },
                { suit: 'CLUBS', value: 'Q' },
                { suit: 'DIAMONDS', value: '7' },
                { suit: 'DIAMONDS', value: '8' },
            ],
        };

        const result: IGameResult = Game.play(gameOpts);
        expect(result.winner).toEqual(gameOpts.botName);

        const { player, bot } = getPlayerAndBot(result.players, gameOpts);

        checkPlayerResult({
            player,
            playerCards: [gameOpts.deck[0], gameOpts.deck[1], gameOpts.deck[4]],
            expectedName: gameOpts.playerName,
            expectedPoints: 19,
        });

        checkPlayerResult({
            player: bot,
            playerCards: [gameOpts.deck[2], gameOpts.deck[3], gameOpts.deck[5]],
            expectedName: gameOpts.botName,
            expectedPoints: 21,
        });
    });
});
  