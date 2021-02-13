import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, withSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {deleteBug, resolveBug, unresolveBug} from '../actions/bugs';
import {Bug} from '../types';

const Details: FC<{navigation: NavigationProp<ParamListBase>; route: any}> = ({
  navigation,
  route,
}) => {
  const bugs = useSelector((state) => state as Bug[]);
  const dispatch = useDispatch();
  const [bug, setBug] = useState<Bug>();

  useEffect(() => {
    setBug(bugs.find((aBug: Bug) => aBug.id === route.params?.id));
  }, [route.params, bugs]);

  const handleResolve = () => {
    if (bug) {
      if (bug.isResolved) {
        dispatch(unresolveBug(bug.id));
      } else {
        dispatch(resolveBug(bug.id));
      }
    }
  };

  const handleDelete = () => {
    if (bug) {
      dispatch(deleteBug(bug.id));
      navigation.goBack();
    }
  };
  if (bug) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView>
            <Text style={styles.idText}>{bug.id}</Text>
            <Text style={styles.text}>{bug.desc}</Text>
            <Text
              style={[
                styles.isResolvedText,
                bug.isResolved
                  ? styles.isCompleteText
                  : styles.isNotCompleteText,
              ]}>
              {bug.isResolved ? '✓ Completed' : 'Not completed'}
            </Text>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                bug.isResolved ? styles.unResolveButton : styles.resolveButton,
              ]}
              onPress={handleResolve}>
              <Text style={styles.buttonText}>
                {bug?.isResolved ? 'Unresolve' : 'Resolve'}
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
  }
  return <Text>Loading...</Text>;
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
  isCompleteText: {
    color: 'rgb(0,255,0)',
  },
  isNotCompleteText: {
    color: 'rgb(255,0,0)',
  },
  isResolvedText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.5,
  },
  resolveButton: {
    backgroundColor: 'green',
    marginRight: 5,
  },
  unResolveButton: {
    marginRight: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
