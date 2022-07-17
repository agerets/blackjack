import { Card } from '../card';
import { IPlayer } from './type';

export class Player {
    get name() {
        return this.playerName;
    }

    get points() {
        return this.playerPoints;
    }

    private playerName: string;
    private playerPoints: number;
    private cards: Array<string>;

    constructor(name: string) {
        this.playerName = name;
        this.playerPoints = 0;
        this.cards = [];
    }

    takeCard(card: Card): void {
        this.playerPoints += card.points;
        this.cards.push(card.name);
    }

    isBlackJack(): boolean {
        return this.playerPoints === 21;
    }

    toJson(): IPlayer {
        return {
            name: this.playerName,
            points: this.playerPoints,
            cards: this.cards,
        }
    }
}
