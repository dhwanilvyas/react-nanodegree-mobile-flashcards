import Expo from 'expo';

export default {
  async saveDeckTitle (title) {
    let store = await this.getDecks();

    if (!store) store = {};

    store[title] = {
      title,
      questions: []
    };

    await Expo.SecureStore.setItemAsync('udacicards', JSON.stringify(store));

    return store[title];
  },

  async getDecks () {
    let decks = await Expo.SecureStore.getItemAsync('udacicards');
    return JSON.parse(decks);
  },

  async removeDecks() {
    await Expo.SecureStore.deleteItemAsync('udacicards');
    return true;
  },

  async addCardToDeck(deckTitle, card) {
    let store = await this.getDecks();
    store[deckTitle].questions.push(card);
    await Expo.SecureStore.setItemAsync('udacicards', JSON.stringify(store));
    return true;
  }
};
