import {useApolloClient, useMutation, useQuery} from "@apollo/client";
import {SIGN_IN} from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import {useNavigate} from "react-router-native";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (err) => {
      throw new Error("login failed with error: " + err.message);
    },
  })
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient()

  const signIn = async ({username, password}) => {
    const result =  await mutate({variables: {username, password}});
    await authStorage.setAccessToken(result.data.authenticate.accessToken)
    await apolloClient.resetStore();
    await navigate('/');
    return result;
  }

  return [signIn, result];
};

export default useSignIn;