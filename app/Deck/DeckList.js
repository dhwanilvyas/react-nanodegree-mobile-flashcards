import React, { Component } from 'react';
import { Container, Content, Text, Spinner, Button, Card, CardItem, Body, H3 } from 'native-base';
import Expo from 'expo';
import Deck from '../utils/Deck';

class DeckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      decks: null,
      loading: true
    };
  }

  static navigationOptions = {
    title: 'Decks'
  };

  componentDidMount() {
    Deck.getDecks()
      .then(response => {
        this.setState({
          decks: Object.keys(response).map(key => response[key]),
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

    if (!this.state.decks && !this.state.loading) {
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
      <Content contentContainerStyle={styles.content}>
        {this.state.decks.map(deck => {
          return (
            <Card key={deck.title}>
              <CardItem>
                <Body style={styles.card}>
                  <H3>{deck.title}</H3>
                  <Text>{deck.questions ? deck.questions.length : 0} cards</Text>
                </Body>
              </CardItem>
            </Card>
          );
        })}
      </Content>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  card: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default DeckList;
