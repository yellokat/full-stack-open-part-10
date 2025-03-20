import { useState, useEffect } from 'react';
import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const {data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  useEffect(() => {
    if(loading === false && !error){
      setRepositories(data.repositories)
    }
  }, [loading]);

  return { repositories, loading, refetch };
};

export default useRepositories;