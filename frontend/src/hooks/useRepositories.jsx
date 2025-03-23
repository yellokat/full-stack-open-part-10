import {useState, useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = ({sortBy, searchPhrase}) => {

  const getVariables = () => {
    switch(sortBy){
      case "latest":
        return {
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
          searchKeyword: searchPhrase
        }
      case "ratingDescending":
        return{
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
          searchKeyword: searchPhrase
        }
      case "ratingAscending":
        return {
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
          searchKeyword: searchPhrase
        }
    }
  }
  const [repositories, setRepositories] = useState();
  const {data, error, loading, refetch} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: getVariables()
  });
  useEffect(() => {
    if (loading === false && !error) {
      const repos = data.repositories.edges
        .map((edge) => edge.node)
        .map((node) => ({
          id: node.id,
          description: node.description,
          forksCount: node.forksCount,
          fullName: node.fullName,
          language: node.language,
          ratingAverage: node.ratingAverage,
          reviewCount: node.reviewCount,
          stargazersCount: node.stargazersCount,
        }))
      setRepositories(repos)
    }
  }, [loading]);

  return {repositories, loading, refetch};
};

export default useRepositories;