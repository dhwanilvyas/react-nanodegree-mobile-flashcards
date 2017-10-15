import { TabNavigator } from 'react-navigation';
import DeckList from './Deck/DeckList';
import CreateDeck from './Deck/CreateDeck';

const AppNavigation = TabNavigator(
  {
    DeckList: { screen: DeckList },
    CreateDeck: { screen: CreateDeck },
  }
);

export default AppNavigation;
