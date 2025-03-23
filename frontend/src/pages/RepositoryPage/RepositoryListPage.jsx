import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import RepositoryItem from "./RepositoryItem";
import theme from "../../theme";
import React, {useEffect, useState} from "react";
import useRepositories from "../../hooks/useRepositories";
import {useNavigate} from "react-router-native";
import {Picker} from '@react-native-picker/picker';
import {Searchbar} from 'react-native-paper';
import _ from 'lodash';

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



export class RepositoryListContainer extends React.Component {
  renderItemSeparator(){
    return <View style={styles.separator}/>;
  }

  constructor(props) {
    super(props);
    this.state = {
      sortBy: "latest",
      searchPhrase: "",
    }
  }

  renderSearchBarMenu(){
    return <Searchbar
      placeholder="Search repositories..."
      onChangeText={(changedText)=>{
        this.setState({...this.state, searchPhrase: changedText})
        this.props.handleSearchBarChange(changedText)
      }}
      value={this.state.searchPhrase}
    />
  }

  renderHeader(){
    return <>
      <View style={styles.container}>
        {this.props.pickerMenu}
      </View>
      {this.renderSearchBarMenu()}
    </>
  }

  render() {
    const props = this.props
    return (
      <FlatList
        data={props.repositories}
        ItemSeparatorComponent={this.renderItemSeparator()}
        ListHeaderComponent={this.renderHeader()}
        renderItem={
          ({item}) => {
            return (
              <Pressable onPress={() => {
                props.onPressed({path: `/${item.id}`})
              }}>
                <RepositoryItem {...item}/>
              </Pressable>
            )
          }
        }
      />
    );
  }
};

const RepositoryListPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('latest');
  const [searchPhrase, setSearchPhrase] = useState('')
  const {repositories} = useRepositories({sortBy, searchPhrase})

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
        setSortBy(itemValue);
      }}>
      <Picker.Item label="Latest Repositories" value="latest"/>
      <Picker.Item label="Highest Rated Repositories" value="ratingDescending"/>
      <Picker.Item label="Lowest Rated Repositories" value="ratingAscending"/>
    </Picker>
  }

  const handleSearchBarChange = (searchPhrase) => {
    setSearchPhrase(searchPhrase);
  }

  return (
    <RepositoryListContainer repositories={repositories} onPressed={onPressed} pickerMenu={<SortByPickerMenu/>} handleSearchBarChange={_.debounce(handleSearchBarChange, 500)}/>
  );
};

export default RepositoryListPage;