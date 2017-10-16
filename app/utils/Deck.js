import Expo from 'expo';

export default {
  async saveDeckTitle (title) {
    let store = await this.getDecks();

    if (!store) store = {};

    store[title] = {
      title
    };

    await Expo.SecureStore.setItemAsync('udacicards', JSON.stringify(store));

    return;
  },

  async getDecks () {
    let decks = await Expo.SecureStore.getItemAsync('udacicards');
    return JSON.parse(decks);
  },

  async removeDecks() {
    await Expo.SecureStore.deleteItemAsync('udacicards');
    return true;
  }
};
