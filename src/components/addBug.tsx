import * as React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {addBug} from '../actions/bugs';
import firestore from '@react-native-firebase/firestore';

const AddBug = () => {
  const [value, onChangeText] = React.useState('');
  const dispatch = useDispatch();

  const handleAddBug = () => {
    if (value.length > 0) {
      firestore()
        .collection('bugs')
        .add({desc: value, isResolved: false})
        .then((newBugReference) => {
          newBugReference.get().then((newBug) => {
            dispatch(addBug(newBug.data()?.desc, newBug.id));
          });
        });
      onChangeText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder="Enter a new bug"
        placeholderTextColor="rgb(146,152,195)"
      />
      <Button
        disabled={value.length === 0}
        title="Add"
        color="rgb(146,152,195)"
        onPress={handleAddBug}
      />
    </View>
  );
};

export default AddBug;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'rgb(146,152,195)',
    borderWidth: 1,
    borderRadius: 5,
  },
  textField: {
    padding: 5,
    flex: 1,
    color: 'rgb(146,152,195)',
    fontWeight: 'bold',
  },
});
