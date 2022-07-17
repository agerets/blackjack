export interface ICard {
    suit: TSuit;
    value: TCardValue;
}

export type TSuit = 'HEARTS' | 'DIAMONDS' | 'SPADES' | 'CLUBS';

export type TCardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
