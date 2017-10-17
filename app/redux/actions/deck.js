import * as types from './types';
import Deck from '../../utils/Deck';

export function getDecks() {
  return (dispatch) => {
    Deck.getDecks()
      .then(decks => {
        dispatch(decksAvailable(decks));
      })
  }
}

export function addDeck(deck) {
  return {
    type: types.ADD_DECK,
    deck
  };
}

export function addCardToDeck(deck, card) {
  return {
    type: types.ADD_CARD_TO_DECK,
    deck,
    card
  };
}

function decksAvailable(decks) {
  return {
    type: types.DECKS_AVAILABLE,
    decks
  };
}
