import { ErrorLibrary } from '../../utils';

export const deckErrorsLib: ErrorLibrary = {
  noCardsInTheDeck: {
    status: 400,
    message: 'There are no cards in the deck',
  },
};
