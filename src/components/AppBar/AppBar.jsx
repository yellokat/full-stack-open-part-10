import {View, StyleSheet, Box, Pressable} from 'react-native';
import Constants from 'expo-constants';
import H2 from "../Text/H2";
import Tab from "./Tab";
import theme from "../../theme";

const styles = StyleSheet.create({
  appBar: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  }
});

let count = 0;

const AppBar = () => {
  return <View style={styles.appBar}>
    <Pressable onPress={() => {
      console.log(`pressed ${count++} times!`);
    }}>
      <Tab>Repositories</Tab>
    </Pressable>
  </View>;
};

export default AppBar;