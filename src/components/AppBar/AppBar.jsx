import {View, StyleSheet, Pressable, ScrollView} from 'react-native';
import Tab from "./Tab";
import theme from "../../theme";
import {useNavigate} from "react-router-native";

const styles = StyleSheet.create({
  appBar: {
    // paddingTop: Constants.statusBarHeight + 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  }
});

const AppBar = () => {
  const navigate = useNavigate();
  return <View style={styles.appBar}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Pressable onPress={() => {
        navigate("/");
      }}>
        <Tab>Repositories</Tab>
      </Pressable>
      <Pressable onPress={() => {
        navigate("/login");
      }}>
        <Tab>Sign in</Tab>
      </Pressable>
    </ScrollView>
  </View>;
};

export default AppBar;