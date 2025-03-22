import React from 'react';
import RepositoryItem from "./RepositoryItem";
import {useParams} from "react-router-native";
import {useQuery} from "@apollo/client";
import {GET_REPOSITORY} from "../../graphql/queries";
import CustomButton from "../../components/CustomButton";
import {StyleSheet, View} from "react-native";
import theme from "../../theme";
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.backgroundGrey,
    flex: 1
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.white,
  },
  column: {
    flexDirection: "column",
    gap: 10,
  }
});

const RepositoryDetailPage = () => {
  const repositoryId = useParams().id
  const response = useQuery(GET_REPOSITORY, {
    variables: {
      id: repositoryId
    }
  })

  if (!response.data) {
    return null;
  }

  const onPress = (url) => {
    console.log(`pressed! url : ${url}`)
    Linking.openURL(url)
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.column}>
          <RepositoryItem {...response.data.repository}/>
          <CustomButton text="Open in Github" onPress={()=>onPress(response.data.repository.url)}/>
        </View>
      </View>
    </View>
  );
};

export default RepositoryDetailPage;