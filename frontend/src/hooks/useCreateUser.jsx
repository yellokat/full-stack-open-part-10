import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../graphql/queries";
import useSignIn from "./useSignIn";

const useCreateUser = () => {
  const [signIn] = useSignIn()
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (err) => {
      throw new Error("Failed to create user with error: " + err.message)
    }
  })
  const createUser = async ({username, password}) => {
    await mutate({
      variables: {
        username,
        password
      }
    });
    await signIn({username, password})
  }
  return [createUser]
}

export default useCreateUser;