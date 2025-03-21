import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from "./RepositoryItem";
import theme from "../../theme";
import {useEffect, useState} from "react";
import useRepositories from "../../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGrey,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem {...item} />}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories()

  if(!repositories){
    return null;
  }

  return (
    <RepositoryListContainer repositories={repositories}/>
  );
};

export default RepositoryList;