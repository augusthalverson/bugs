import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Bug } from '../types';

const Nav = () => {
    const numOfBugs = (useSelector(state => state) as Bug[]).length;
    
  return (
    <View style={styles.nav}>
          <Text style={styles.navText}>{numOfBugs} bugs to resolve</Text>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
    nav: {
        height: 70,
        backgroundColor: '#A41726',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    navText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold'
    },
});
