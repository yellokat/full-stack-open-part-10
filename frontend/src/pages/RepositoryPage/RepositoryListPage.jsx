import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import theme from "../../theme";
import {useEffect, useState} from "react";
import useRepositories from "../../hooks/useRepositories";
import {useNavigate} from "react-router-native";
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGrey,
  },
});

const ItemSeparator = () => <View style={styles.separator}/>;

export const RepositoryListContainer = ({repositories, onPressed, pickerMenu}) => {

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={pickerMenu}
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
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState();
  const {repositories} = useRepositories(sortBy)

  if (!repositories) {
    return null;
  }

  const onPressed = ({path}) => {
    navigate(path)
  }

  const SortByPickerMenu = () => {
    return <Picker
      selectedValue={sortBy}
      onValueChange={(itemValue, _) =>{
        setSortBy(itemValue)
      }}>
      <Picker.Item label="Latest Repositories" value="latest"/>
      <Picker.Item label="Highest Rated Repositories" value="ratingDescending"/>
      <Picker.Item label="Lowest Rated Repositories" value="ratingAscending"/>
    </Picker>
  }

  return (
    <RepositoryListContainer repositories={repositories} onPressed={onPressed} pickerMenu={<SortByPickerMenu/>}/>
  );
};

export default RepositoryListPage;