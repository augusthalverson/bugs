import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Bug } from '../types';
import BugItem from './bugItem';

const BugsList = () => {

    const bugs = (useSelector(state => state) as Bug[]);

  return (
    <View style={styles.container}>
      {
        bugs.length > 0 &&
          <ScrollView>
            {bugs.map((bug: Bug, index: number) => (
                <BugItem key={index} bug={bug}/>
            ))}
          </ScrollView>
      }

      {
      bugs.length === 0 &&
        <View style={styles.noBugsMsg}>
          <Text>Woohoo 🎉 You have no bugs to fix.</Text>
        </View>
      }
    </View>
  );
};

export default BugsList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noBugsMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
