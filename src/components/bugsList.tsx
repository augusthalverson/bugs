import {NavigationProp, ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {FC} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Bug} from '../types';
import BugItem from './bugItem';

const BugsList: FC<{navigation: NavigationProp<ParamListBase>}> = ({
  navigation,
}) => {
  const bugs = useSelector((state) => state) as Bug[];

  return (
    <View style={styles.container}>
      {bugs.length > 0 && (
        <FlatList
          data={bugs}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {id: item.id})}>
              <BugItem bug={item} />
            </TouchableOpacity>
          )}
        />
      )}

      {bugs.length === 0 && (
        <View style={styles.noBugsMsg}>
          <Text>Woohoo 🎉 You have no bugs to fix.</Text>
        </View>
      )}
    </View>
  );
};

export default BugsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noBugsMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
