import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Nom des Pages *À Changer*
import Search from '../components/Search';
import Movie from '../components/Movie';

const SearchNavigation = createStackNavigator();

function RootStack() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        //
        name="ViewSearch"
        //Nom des page import
        component={Search}
        //titre page
        options={{ title: 'Recherche' }}
      />
      <SearchNavigation.Screen
        name="ViewMovie"
        component={Movie}
        options={{ title: 'Film' }}
      />
    </SearchNavigation.Navigator>
  );
}

export default RootStack;