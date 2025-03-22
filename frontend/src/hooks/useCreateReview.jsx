import {CREATE_REVIEW} from "../graphql/mutations";
import {useApolloClient, useMutation} from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import {useNavigate} from "react-router-native";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (err) => {
      throw new Error("Failed to create review with error: " + err.message)
    }
  })
  const navigate = useNavigate();
  const createReview = async ({ownerName, repositoryName, rating, text}) => {
    const result = await mutate({
        variables: {
          ownerName,
          repositoryName,
          rating,
          text
        }
      });
    await navigate(`/${result.data.createReview.repositoryId}`)
    return result;
  }
  return [createReview, result]
}

export default useCreateReview;