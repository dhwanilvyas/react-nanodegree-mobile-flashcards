import React, { Component } from 'react';
import { Container, Text, Spinner, Button } from 'native-base';
import Expo from 'expo';

class DeckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: null,
      loading: true
    };
  }

  static navigationOptions = {
    title: 'Deck'
  };

  componentDidMount() {
    Expo.SecureStore.getItemAsync('udacicards')
      .then(response => {
        this.setState({
          cards: response,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner />
      );
    }

    if (!this.state.cards && !this.state.loading) {
      return (
        <Container>
          <Text>Seems like you have not added any decks yet.</Text>
          <Button onPress={() => this.props.navigation.navigate('CreateDeck')}>
            <Text>Add one right now!</Text>
          </Button>
        </Container>
      );
    }

    return (
      <Text>Homed!</Text>
    );
  }
}

export default DeckList;
