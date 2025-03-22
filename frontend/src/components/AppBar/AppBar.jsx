import {View, StyleSheet, Pressable, ScrollView} from 'react-native';
import Tab from "./Tab";
import theme from "../../theme";
import {useNavigate} from "react-router-native";
import {useApolloClient, useQuery} from "@apollo/client";
import {ME} from "../../graphql/queries";
import useAuthStorage from "../../hooks/useAuthStorage";

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
  const {data, refetch} = useQuery(ME)
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient()

  if (!data) {
    return null
  }

  const isLoggedIn = (!!data && !!data.me)

  const SignInTab = () => {
    return <Pressable onPress={() => {
      navigate("/login");
    }}>
      <Tab>Sign in</Tab>
    </Pressable>
  }

  const SignOutTab = () => {
    return <Pressable onPress={async () => {
      await authStorage.removeAccessToken()
      await apolloClient.resetStore()
      await refetch()
    }}>
      <Tab>Sign out</Tab>
    </Pressable>
  }

  const CreateReviewTab = () => {
    return <Pressable onPress={() => {
      navigate("/createReview");
    }}>
      <Tab>Create a review</Tab>
    </Pressable>
  }

  const SignUpTab = () => {
    return <Pressable onPress={() => {
      navigate("/signUp");
    }}>
      <Tab>Sign Up</Tab>
    </Pressable>
  }

  const PublicTabs = () => {
    return <>
      <SignInTab/>
      <SignUpTab/>
    </>
  }

  const PrivateTabs = () => {
    return <>
      <CreateReviewTab/>
      <SignOutTab/>
    </>
  }

  return <View style={styles.appBar}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Pressable onPress={() => {
        navigate("/");
      }}>
        <Tab>Repositories</Tab>
      </Pressable>
      {isLoggedIn ? <PrivateTabs/> : <PublicTabs/>}
    </ScrollView>
  </View>;
};

export default AppBar;