import React from 'react';
import {StyleSheet, View} from "react-native";
import Text from '../../components/Text/Text';

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    gap: 0,
    height: 80
  },
  container:{
    flex:1,
  },
});

const RepositoryStats = ({testID, title, value}) => {
  return (
    <View testID={testID} style={styles.column} alignItems="center" justifyContent="center">
      <View style={styles.container}>
        <Text fontWeight="bold">{value}</Text>
      </View>
      <View style={styles.container}>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;