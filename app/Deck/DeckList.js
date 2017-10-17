import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Content, Text, Spinner, Button, Card, CardItem, Body, H3 } from 'native-base';
import Expo from 'expo';
import Deck from '../utils/Deck';
import commonStyles from '../utils/commonStyles';

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
          decks: response ? Object.keys(response).map(key => response[key]) : null,
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
        <Container style={styles.noContent}>
          <Text style={styles.noContentText}>No decks found.</Text>
          <Button block style={styles.noContentButton} onPress={() => this.props.navigation.navigate('CreateDeck')}>
            <Text>Add one right now!</Text>
          </Button>
        </Container>
      );
    }

    return (
      <Content contentContainerStyle={styles.content} scrollEnabled={false}>
        <ScrollView>
          {this.state.decks.map(deck => {
          return (
            <Card key={deck.title}>
              <CardItem button onPress={() => this.props.navigation.navigate('DeckView', {deck})}>
                <Body style={styles.card}>
                  <H3>{deck.title}</H3>
                  <Text>{deck.questions.length} cards</Text>
                </Body>
              </CardItem>
            </Card>
          );
        })}
        </ScrollView>
      </Content>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    margin: 5
  },
  noContent: {
    ...commonStyles.centerContent,
    backgroundColor: '#9CCC65',
  },
  noContentText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  noContentButton: {
    margin: 15
  },
  card: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default DeckList;
