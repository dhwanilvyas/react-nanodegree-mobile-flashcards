import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import Deck from '../utils/Deck';
import { addCardToDeck } from '../redux/actions/deck';

class AddCard extends Component {
  state = {
    question: null,
    answer: null
  };

  static navigationOptions = {
    title: 'Add card'
  };

  addCardToDeck() {
    const { params } = this.props.navigation.state;

    Deck.addCardToDeck(params.deck.title, this.state)
      .then(() => {
        this.props.dispatch(addCardToDeck(params.deck.title, this.state));
        this.props.navigation.navigate('DeckView', {deck: params.deck});
      });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item>
              <Input
                placeholder='Question'
                onChangeText={value => this.setState({question: value})}
               />
            </Item>
            <Item>
              <Input
                placeholder='Answer'
                onChangeText={value => this.setState({answer: value})}
               />
            </Item>
            <Button block dark style={{marginTop: 15}} onPress={this.addCardToDeck.bind(this)}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(null, null)(AddCard);
