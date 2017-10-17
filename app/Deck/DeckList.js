import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Container, Content, Text, Spinner, Button, Card, CardItem, Body, H3 } from 'native-base';
import Expo from 'expo';
import commonStyles from '../utils/commonStyles';
import { getDecks } from '../redux/actions/deck';

class DeckList extends Component {
  static navigationOptions = {
    title: 'Decks'
  };

  componentDidMount() {
    this.props.dispatch(getDecks());
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    }

    if (this.props.decks.length === 0) {
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
          {this.props.decks.map(deck => {
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

function mapStateToProps(state) {
  return {
    decks: state.decks.decks,
    loading: state.decks.loading
  };
}

export default connect(mapStateToProps, null)(DeckList);
