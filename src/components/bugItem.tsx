import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

import {useDispatch} from 'react-redux';
import {resolveBug, deleteBug, unresolveBug} from '../actions/bugs';
import {Bug} from '../types';
import firestore from '@react-native-firebase/firestore';

const BugItem = ({bug}: {bug: Bug}) => {
  const dispatch = useDispatch();

  const handleResolve = () => {
    if (!bug.isResolved) {
      dispatch(resolveBug(bug.id));
      firestore()
        .collection('bugs')
        .doc(bug.id)
        .update({isResolved: true})
        .then((result) => {
          console.log(result);
        });
    } else {
      dispatch(unresolveBug(bug.id));
      firestore()
        .collection('bugs')
        .doc(bug.id)
        .update({isResolved: false})
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleDelete = () => {
    dispatch(deleteBug(bug.id));
    firestore()
      .collection('bugs')
      .doc(bug.id)
      .delete()
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.bug}>
      <View style={styles.bugLabelBox}>
        <Text
          style={[
            styles.bugLabel,
            bug.isResolved ? styles.resolvedBugText : null,
          ]}>
          {bug.desc}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={bug.isResolved ? 'unresolve' : 'resolve'}
          onPress={handleResolve}
        />
        <Button title="delete" color="#810020" onPress={handleDelete} />
      </View>
    </View>
  );
};

export default BugItem;

const styles = StyleSheet.create({
  bug: {
    marginLeft: '3%',
    marginRight: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    borderBottomColor: 'rgb(146,152,195)',
    borderBottomWidth: 1,
  },
  resolvedBugText: {
    color: '#fff',
    opacity: 0.25,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'white',
  },

  bugLabelBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  bugLabel: {
    fontSize: 18,
    color: 'rgb(219, 222, 247)',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
