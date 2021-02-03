import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import bugsReducer from './src/reducers/bugs';
import BugsList from './src/components/bugsList';
import Nav from './src/components/nav';
import AddBug from './src/components/addBug';
import {addBug, resolveBug} from './src/actions/bugs';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const store = createStore(bugsReducer);

  useEffect(() => {
    firestore()
      .collection('bugs')
      .get()
      .then((results) => {
        results.docs.forEach((bug) => {
          store.dispatch(addBug(bug.data().desc, bug.id));
          if (bug.data().isResolved) {
            store.dispatch(resolveBug(bug.id));
          }
        });
      });
  });

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar barStyle="light-content" />
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
    backgroundColor: 'rgb(20,22,33)',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(30,33,48)',
  },
  bugsListView: {
    flex: 1,
  },
});

export default App;
