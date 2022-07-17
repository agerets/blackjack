import { Deck } from '../deck';
import { Player } from '../player';
import { IGameOpts, IGameResult } from './type';
import { log } from '../../utils';
import { config } from '../../config';

export class Game {

    static end(winnerName: string, players: Array<Player>): IGameResult {
        return {
            winner: winnerName,
            players: players.map(player => player.toJson()),
        };
    }

    static play(opts: IGameOpts) { // TODO: add type of card
        const deck = new Deck(opts.deck);
        const player = new Player(opts.playerName || config.get('playerName'));
        const bot = new Player(opts.botName || config.get('botName'));
        const endGame = (winnerName: string) => this.end(winnerName, [player, bot]);

        // Each player takes two cards each from the top
        // You take the first two cards
        player.takeCard(deck.getCard());
        player.takeCard(deck.getCard());

        // Bob takes the next two
        bot.takeCard(deck.getCard());
        bot.takeCard(deck.getCard());

        // If either player has 21 points - blackjack - that player wins the round
        for (const p of [player, bot]) {
            if (p.isBlackJack()) {
                log('blackjack');
                return endGame(p.name);
            }
        }

        // You draw cards first until the sum of your cards is 17 or higher
        while (player.points < 17) {
            player.takeCard(deck.getCard());
        }

        // If Player exceed 21 points Player loose without Bot having to draw more cards
        if (player.points > 21) {
            log('If Player exceed 21 points Player loose without Bot having to draw more cards');
            return endGame(bot.name);
        }

        // Bot draws cards until the sum of his cards is higher than yours
        while (bot.points <= player.points) {
            bot.takeCard(deck.getCard());
        }

        // If Bot cards exceed 21 points he looses
        if (bot.points > 21) {
            log('if his cards exceed 21 points he looses');
            return endGame(player.name);
        }

        // Otherwise Bot wins
        log('otherwise bob wins');
        return endGame(bot.name);
    }
}
