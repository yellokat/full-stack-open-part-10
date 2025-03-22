import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import theme from "../../theme";
import {useEffect, useState} from "react";
import useRepositories from "../../hooks/useRepositories";
import {useNavigate} from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGrey,
  },
});

const ItemSeparator = () => <View style={styles.separator}/>;

export const RepositoryListContainer = ({repositories, onPressed}) => {

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={
        ({item}) => {
          return (
            <Pressable onPress={()=>{onPressed({path: `/${item.id}`})}}>
              <RepositoryItem {...item}/>
            </Pressable>
          )
        }
      }
    />
  );
};

const RepositoryListPage = () => {
  const {repositories} = useRepositories()
  const navigate = useNavigate();

  if (!repositories) {
    return null;
  }

  const onPressed = ({path}) => {
    navigate(path)
  }

  return (
    <RepositoryListContainer repositories={repositories} onPressed={onPressed}/>
  );
};

export default RepositoryListPage;