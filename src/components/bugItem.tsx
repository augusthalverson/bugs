import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

import {useDispatch} from 'react-redux';
import {resolveBug, deleteBug, unresolveBug} from '../actions/bugs';
import {Bug} from '../types';

const BugItem = ({bug}: {bug: Bug}) => {
  const dispatch = useDispatch();

  const handleResolve = () => {
    if (!bug.isResolved) {
      dispatch(resolveBug(bug.id));
    } else {
      dispatch(unresolveBug(bug.id));
    }
  };
  const handleDelete = () => {
    dispatch(deleteBug(bug.id));
  };

  return (
    <View style={[styles.bug]}>
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
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  resolvedBugText: {
    color: 'lightgray',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'gray',
  },

  bugLabelBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  bugLabel: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
