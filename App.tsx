import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import bugsReducer from './src/reducers/bugs';
import BugsList from './src/components/bugsList';
import Nav from './src/components/nav';
import AddBug from './src/components/addBug';
import {addBug} from './src/actions/bugs';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const store = createStore(bugsReducer);

  useEffect(() => {
    firestore()
      .collection('bugs')
      .get()
      .then((results) => {
        results.docs.forEach((bug) => {
          store.dispatch(addBug(bug.data().desc));
        });
      });
  });

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Provider store={store}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Nav />
          <View style={styles.bugsListView}>
            <BugsList />
          </View>
          <AddBug />
        </KeyboardAvoidingView>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  bugsListView: {
    flex: 1,
  },
});

export default App;
