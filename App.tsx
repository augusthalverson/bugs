import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import {Provider} from 'react-redux';
import bugsReducer from './src/reducers/bugs';
import {createStore} from 'redux';

const Stack = createStackNavigator();

const App = () => {
  const store = createStore(bugsReducer);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {backgroundColor: 'rgb(101,0,25)'},
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen
            options={{
              headerStyle: {backgroundColor: 'rgb(101,0,25)'},
              headerTintColor: '#fff',
            }}
            name="Details"
            component={Details}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
