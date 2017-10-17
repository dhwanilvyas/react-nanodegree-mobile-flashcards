import React, { Component } from 'react';
import { Container, Content, H1, H3, Button, Footer, Text } from 'native-base';
import commonStyles from '../utils/commonStyles';
import Notifications from '../utils/notification';

class StartQuiz extends Component {
  static navigationOptions = {
    title: 'Quiz'
  };

  score = 0;
  state = {
    answerViewActive: false,
    quizComplete: false,
    totalQuestions: 0,
    currentQuestion: 1
  };

  componentDidMount() {
    this.setState({
      totalQuestions: this.props.navigation.state.params.deck.questions.length
    })
  }

  toggleAnswerView = () => {
    this.setState(() => ({
      answerViewActive: !this.state.answerViewActive
    }));
  }

  changeCurrentQuestion = () => {
    let q = this.state.currentQuestion;
    q += 1;

    this.setState(() => ({
      currentQuestion: q,
    }));

    if (this.state.currentQuestion == this.props.navigation.state.params.deck.questions.length) {
      this.completeQuiz();
    }
  }

  correct = () => {
    this.score++;
    this.changeCurrentQuestion();
  }

  inCorrect = () => {
    this.score--;
    this.changeCurrentQuestion();
  }

  completeQuiz = () => {
    this.setState({
      quizComplete: true
    });

    Notifications.clearLocalNotification()
      .then(Notifications.setLocalNotification)
  }

  render() {
    const { params } = this.props.navigation.state;

    if (!params.deck.questions.length) {
      return (
        <Container>
          <Content contentContainerStyle={commonStyles.centerContent}>
            <H3>No cards are added to this deck.</H3>
            <Button bordered dark block style={commonStyles.fullButton} onPress={() => this.props.navigation.navigate('AddCard', {deck: params.deck})}>
              <Text>Add now!</Text>
            </Button>
          </Content>
        </Container>
      )
    }

    if (this.state.quizComplete) {
      return (
        <Container>
          <Content contentContainerStyle={commonStyles.centerContent}>
            <H1>Quiz over!</H1>
            <Text>You scored {this.score}/{params.deck.questions.length}</Text>
            <Button bordered dark block style={commonStyles.fullButton} onPress={() => this.props.navigation.navigate('StartQuiz', {deck: params.deck})}>
              <Text>Retake quiz</Text>
            </Button>
            <Button bordered dark block style={commonStyles.fullButton} onPress={() => this.props.navigation.navigate('DeckView', {deck: params.deck})}>
              <Text>Back home</Text>
            </Button>
          </Content>
        </Container>
      )
    }

    const card = params.deck.questions[this.state.currentQuestion - 1];

    return (
      <Container>
        <Content contentContainerStyle={commonStyles.centerContent}>
          <H1>{this.state.answerViewActive ? card.answer : card.question}</H1>
          {this.state.answerViewActive &&
            <Button transparent block style={commonStyles.fullButton} onPress={this.toggleAnswerView}>
              <Text>Question</Text>
            </Button>
          }
          {!this.state.answerViewActive &&
            <Button transparent block style={commonStyles.fullButton} onPress={this.toggleAnswerView}>
              <Text>Answer</Text>
            </Button>
          }
        </Content>
        <Button success block style={commonStyles.fullButton} onPress={this.correct}>
          <Text>Correct</Text>
        </Button>
        <Button danger block style={commonStyles.fullButton} onPress={this.inCorrect}>
          <Text>Incorrect</Text>
        </Button>
        <Footer style={styles.footer}>
          <Text>{this.state.currentQuestion}/{this.state.totalQuestions}</Text>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  footer: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  }
}

export default StartQuiz;
