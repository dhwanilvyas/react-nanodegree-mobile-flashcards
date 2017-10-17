import { TabNavigator, StackNavigator } from 'react-navigation';
import DeckList from './Deck/DeckList';
import CreateDeck from './Deck/CreateDeck';
import DeckView from './Deck/DeckView';
import AddCard from './Deck/AddCard';
import StartQuiz from './Deck/StartQuiz';

const Tabs = TabNavigator(
  {
    DeckList: { screen: DeckList },
    CreateDeck: { screen: CreateDeck },
  }
);

const AppNavigation = StackNavigator(
  {
    Home: { screen: Tabs, navigationOptions: { header: null } },
    DeckView: { screen: DeckView },
    AddCard: { screen: AddCard },
    StartQuiz: { screen: StartQuiz }
  }
);

export default AppNavigation;
