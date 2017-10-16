import React, { Component } from 'react';
import { Text } from 'native-base';
import AppNavigation from './app/AppNavigation';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <Text>App loading.</Text>
    }

    return <AppNavigation />
  }
}
export default App;
