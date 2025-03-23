import { StyleSheet, View } from 'react-native';
import RepositoryListPage from "./pages/RepositoryPage/RepositoryListPage";
import AppBar from "./components/AppBar/AppBar";
import {Navigate, Route, Routes} from "react-router-native";
import SignInPage from "./pages/SignInPage/SignInPage";
import RepositoryDetailPage from "./pages/RepositoryPage/RepositoryDetailPage";
import CreateReviewPage from "./pages/CreateReviewPage";
import SignUpPage from "./pages/SignUpPage";
import MyReviewsPage from './pages/MyReviewsPage';

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
        <Route path="/" element={<RepositoryListPage />} />
        <Route path="/:id" element={<RepositoryDetailPage />}/>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/createReview" element={<CreateReviewPage />} />
        <Route path="/myReviews" element={<MyReviewsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;