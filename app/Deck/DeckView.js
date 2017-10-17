import React, { Component } from 'react';
import { Container, Content, H1, H3, Button, Text } from 'native-base';
import commonStyles from '../utils/commonStyles';

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.deck.title}`,
  });

  render() {
    const { params } = this.props.navigation.state;

    return (
      <Container>
        <Content contentContainerStyle={commonStyles.centerContent}>
          <H1>{params.deck.title}</H1>
          <Text>{params.deck.questions.length} cards</Text>
        </Content>
        <Button style={commonStyles.fullButton} medium bordered dark block onPress={() => this.props.navigation.navigate('AddCard', {deck: params.deck})}>
          <Text>Add card</Text>
        </Button>
        <Button style={commonStyles.fullButton} medium dark block onPress={() => this.props.navigation.navigate('StartQuiz', {deck: params.deck})}>
          <Text>Start quiz</Text>
        </Button>
      </Container>
    );
  }
}

export default DeckView;
