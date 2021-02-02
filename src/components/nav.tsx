import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Bug} from '../types';

const Nav = () => {
  const numOfBugs = (useSelector((state) => state) as Bug[]).length;

  return (
    <View style={styles.nav}>
      <Text style={styles.navText}>🚨 {numOfBugs} bugs to resolve</Text>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  nav: {
    height: 70,
    backgroundColor: 'rgb(20,22,33)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomColor: 'rgb(14,15,21)',
    borderBottomWidth: 1,
  },
  navText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(219, 222, 247)',
  },
});
