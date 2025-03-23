import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import theme from "../../theme";
import {useEffect, useState} from "react";
import useRepositories from "../../hooks/useRepositories";
import {useNavigate} from "react-router-native";
import {Picker} from '@react-native-picker/picker';
import {Searchbar} from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGrey,
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 10
  }
});

const ItemSeparator = () => <View style={styles.separator}/>;

export const RepositoryListContainer = ({repositories, onPressed, headerComponent}) => {

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={headerComponent}
      renderItem={
        ({item}) => {
          return (
            <Pressable onPress={() => {
              onPressed({path: `/${item.id}`})
            }}>
              <RepositoryItem {...item}/>
            </Pressable>
          )
        }
      }
    />
  );
};

const RepositoryListPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState();
  const {repositories} = useRepositories(sortBy)
  const [searchPhrase, setSearchPhrase] = useState('')

  if (!repositories) {
    return null;
  }

  const onPressed = ({path}) => {
    navigate(path)
  }

  const SortByPickerMenu = () => {
    return <Picker
      selectedValue={sortBy}
      onValueChange={(itemValue, _) => {
        setSortBy(itemValue)
      }}>
      <Picker.Item label="Latest Repositories" value="latest"/>
      <Picker.Item label="Highest Rated Repositories" value="ratingDescending"/>
      <Picker.Item label="Lowest Rated Repositories" value="ratingAscending"/>
    </Picker>
  }

  const SearchBarMenu = () => {
    return <Searchbar
      placeholder="Search repositories..."
      onChangeText={setSearchPhrase}
      value={searchPhrase}
    />
  }

  const HeaderComponent = () => {
    return <>
      <View style={styles.container}>
        <SearchBarMenu/>
      </View>
      <SortByPickerMenu/>
    </>
  }

  return (
    <RepositoryListContainer repositories={repositories} onPressed={onPressed} headerComponent={<HeaderComponent/>}/>
  );
};

export default RepositoryListPage;