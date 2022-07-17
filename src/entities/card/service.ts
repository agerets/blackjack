import { ICard, TCardValue } from './type';

export class Card {
    public get name() {
        return this.cardName;
    }

    public get points() {
        return this.cardPoints;
    }

    private cardName: string;
    private cardPoints: number;

    constructor(card: ICard) {
        this.cardName = Card.getName(card);
        this.cardPoints = Card.getPoints(card.value);
    }

    static getName(card: ICard) {
        return `${card.suit[0]}${card.value}`;
    }

    static getPoints(value: TCardValue) {
        if (['J', 'Q', 'K'].includes(value)) {
            return 10;
        }
        if (value === 'A') {
            return 11;
        }
        return Number(value);
    }
}
