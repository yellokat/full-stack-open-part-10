import { StyleSheet, View } from 'react-native';
import RepositoryList from "./pages/RepositoryListPage/RepositoryList";
import Text from './components/Text/Text';
import AppBar from "./components/AppBar/AppBar";

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