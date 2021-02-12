import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {FC} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {deleteBug, resolveBug, unresolveBug} from '../actions/bugs';

const Details: FC<{navigation: NavigationProp<ParamListBase>; route: any}> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();

  const handleResolve = () => {
    if (route.params?.isResolved) {
      dispatch(unresolveBug(route.params?.id));
    } else {
      dispatch(resolveBug(route.params?.id));
    }
  };

  const handleDelete = () => {
    dispatch(deleteBug(route.params?.id));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView>
          <Text style={styles.idText}>{route.params?.id}</Text>
          <Text style={styles.text}>{route.params?.desc}</Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.resolveButton]}
            onPress={handleResolve}>
            <Text style={styles.buttonText}>
              {route.params?.isResolved ? 'Unresolve' : 'Resolve'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(30,33,48)',
    padding: 10,
  },
  deleteButton: {
    backgroundColor: 'rgb(101, 0, 25)',
    marginLeft: 5,
  },
  innerContainer: {
    flex: 1,
  },
  idText: {
    color: 'rgb(89, 97, 149)',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  resolveButton: {
    backgroundColor: 'green',
    marginRight: 5,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
