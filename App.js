import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './src/screens/home';
import DetailScreen from './src/screens/detail';
import AppName from './src/constants/AppName';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={AppName.MainScreen} component={MainScreen} />
        <Stack.Screen name={AppName.DetailScreen} component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
