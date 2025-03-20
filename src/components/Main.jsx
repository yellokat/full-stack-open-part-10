import { StyleSheet, View } from 'react-native';
import RepositoryList from "./RepositoryList";
import Text from './Text/Text';
import AppBar from "./AppBar/AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <RepositoryList/>
    </View>
  );
};

export default Main;