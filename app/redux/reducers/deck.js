import * as types from '../actions/types';

const initialState = {
  decks: [],
  loading: true
};

const decksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DECKS_AVAILABLE:
      return Object.assign({}, state, {
        decks: action.decks ? Object.keys(action.decks).map(key => action.decks[key]) : [],
        loading: false
      })
    case types.ADD_DECK:
      let decks = state.decks;
      decks.push(action.deck);

      return Object.assign({}, state, {
        decks
      });
    case types.ADD_CARD_TO_DECK:
      let stateDecks = state.decks.map(deck => {
        if (deck.title === action.deck) {
          deck.questions.push(action.card);
          return deck;
        }
        return deck;
      });

      return Object.assign({}, state, {
        decks: stateDecks
      });
    default:
      return initialState;
  }
}

export default decksReducer;
