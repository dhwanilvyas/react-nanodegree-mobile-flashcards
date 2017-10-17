import React, { Component } from 'react';
import { Container } from 'native-base';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import AppNavigation from './app/AppNavigation';
import store from './app/redux/store';

class App extends Component {
  state = {
    loading: true
  };

  async loadFonts() {
    // Expo.SecureStore.deleteItemAsync('udacicards');
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          onFinish={() => this.setState({ loading: false })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <Container style={{marginTop: 24}}>
          <AppNavigation />
        </Container>
      </Provider>
    )
  }
}
export default App;
