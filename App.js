import React, { Component } from 'react';
import { Container } from 'native-base';
import { AppLoading } from 'expo';
import AppNavigation from './app/AppNavigation';

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
      <Container style={{marginTop: 24}}>
        <AppNavigation />
      </Container>
    )
  }
}
export default App;
