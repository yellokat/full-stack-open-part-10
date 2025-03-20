import { StyleSheet, View } from 'react-native';
import RepositoryList from "./pages/RepositoryListPage/RepositoryList";
import AppBar from "./components/AppBar/AppBar";
import {Navigate, Route, Routes} from "react-router-native";
import SignInPage from "./pages/SignInPage/SignInPage";

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
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;