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

const RepositoryList = () => {
  const { repositories } = useRepositories()

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem {...item} />}
    />
  );
};

export default RepositoryList;