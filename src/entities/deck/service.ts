import { ExposableError } from '../../utils';
import { deckErrorsLib } from './';
import { Card } from '../card';
import { ICard } from '../card/type';

export class Deck {
    private deck: Array<ICard>;

    constructor(deck: Array<ICard>) {
        this.deck = deck;
    }

    getCard() {
        if (!this.deck || this.deck.length === 0) {
            throw new ExposableError(deckErrorsLib.noCardsInTheDeck); 
        }
        const [card, ...restofTheDeck] = this.deck;
        this.deck = restofTheDeck;
        return new Card(card);
    }
}
