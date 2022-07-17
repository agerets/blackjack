import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import { app } from '../../src/app';
import mockDeck from '../mock/deck.json';
import { checkPlayerResult, getPlayerAndBot } from '../utils';

const request = supertest(app);

jest.mock('../../src/config/schema', () => ({
    ...jest.requireActual('../../src/config/schema').default,
    deckUrl: 'http://test.com/shuffle',
}));

jest.mock('axios', () => {
    return {
      get: jest.fn((deckUrl: string) => {
        console.log({ deckUrl });
        return Promise.resolve({ data: mockDeck });
      }),
    };
}); 

describe('Integration tests - Game', () => {
    const playerName = 'Test';
    const botName = 'Bot';
    const deck: any = mockDeck;

    it(`GET /game/play?playerName=${playerName}&botName=${botName}`, () => {       
        return request
            .get(`/game/play?playerName=${playerName}&botName=${botName}`)
            .expect(StatusCodes.OK)
            .then(({ body }: Response) => {
                expect(body).toBeDefined()
                expect(body.winner).toEqual(playerName);
                const { player, bot } = getPlayerAndBot(body.players, { playerName, botName, deck });

                checkPlayerResult({
                    player,
                    playerCards: [deck[0], deck[1], deck[4], deck[5]],
                    expectedName: playerName,
                    expectedPoints: 19,
                });

                checkPlayerResult({
                    player: bot,
                    playerCards: [deck[2], deck[3], deck[6], deck[7]],
                    expectedName: botName,
                    expectedPoints: 28,
                });
            });
    });

    // TODO: add tests to cover negative scenarious (when input data is invalid)
    // TODO: test player's names change
});
