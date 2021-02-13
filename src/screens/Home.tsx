import * as React from 'react';
import {FC, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AddBug from '../components/addBug';
import BugsList from '../components/bugsList';
import firestore from '@react-native-firebase/firestore';
import {addBug, resolveBug} from '../actions/bugs';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const Home: FC<{navigation: NavigationProp<ParamListBase>}> = ({
  navigation,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    firestore()
      .collection('bugs')
      .get()
      .then((results) => {
        results.docs.forEach((bug) => {
          dispatch(addBug(bug.data().desc, bug.id));
          if (bug.data().isResolved) {
            dispatch(resolveBug(bug.id));
          }
        });
      });
  });

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.bugsListView}>
          <BugsList navigation={navigation} />
        </View>
        <AddBug />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;

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
