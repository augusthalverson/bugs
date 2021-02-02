import * as React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBug } from '../actions/bugs';

const AddBug = () => {
    const [value, onChangeText] = React.useState('');
    const dispatch = useDispatch();

    const handleAddBug = () => {
        if (value.length > 0) {
            dispatch(addBug(value));
            onChangeText('');
        }
    }

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.textField}
            onChangeText={text => onChangeText(text)}
            value={value}
            placeholder="Enter a new bug"
        />
        <Button disabled={value.length === 0} title="Add" onPress={handleAddBug} />  
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
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
    },
    textField: {

        padding: 5,
        flex: 1
    }
});
