import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Center, Form, Item, Label, Input, H3, Button, Text, Footer } from 'native-base';
import Deck from '../utils/Deck';
import { addDeck } from '../redux/actions/deck';

class CreateDeck extends Component {
  state = {
    deckTitle: ''
  };

  createDeck = () => {
    Deck.saveDeckTitle(this.state.deckTitle)
      .then((deck) => {
        this.props.dispatch(addDeck(deck));
        this.setState({deckTitle: ''});
        this.props.navigation.navigate('DeckView', {deck});
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Form>
            <Item style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} underline={false}>
              <Input
                onChangeText={value => this.setState({deckTitle: value})}
                focus
                placeholder="Enter deck title"
                placeholderTextColor='white'
                underlineColorAndroid='transparent'
                value={this.state.deckTitle}
                style={styles.input} />
            </Item>
          </Form>
        </Content>
        <Button full bordered medium transparent onPress={this.createDeck} style={styles.button}>
          <Text>Create deck</Text>
        </Button>
      </Container>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#2F80ED',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  input: {
    fontSize: 40,
    color: '#f5f5f5'
  },
  button: {
    backgroundColor: '#ffffff',
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
  },
}

export default connect(null, null)(CreateDeck);
