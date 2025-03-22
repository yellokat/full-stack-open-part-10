import React from 'react';
import RepositoryItem from "./RepositoryItem";
import {useParams} from "react-router-native";
import {useQuery} from "@apollo/client";
import {GET_REPOSITORY} from "../../graphql/queries";
import CustomButton from "../../components/CustomButton";
import {FlatList, StyleSheet, View} from "react-native";
import theme from "../../theme";
import * as Linking from 'expo-linking';
import Text from '../../components/Text/Text';
import {format, parseISO} from "date-fns";

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.backgroundGrey,
    flex: 1
  },
  itemBackground: {
    backgroundColor: theme.colors.white,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.white,
  },
  row: {
    flexDirection: 'row',
    gap: 20
  },
  column: {
    flexDirection: "column",
    gap: 10,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundGrey,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderColor: theme.colors.primary,
    borderWidth: 3,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  ratingTextStyle: {
    fontSize: "heading",
    color: "primary",
    fontWeight: "bold"
  },
  reviewerTextStyle:{
    fontWeight: "bold"
  },
  reviewDateTextStyle:{
    color: theme.colors.textSecondary
  }
});

const RepositoryDetailPage = () => {
  const repositoryId = useParams().id
  const response = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {
      id: repositoryId
    }
  })

  if (!response.data) {
    return null;
  }

  const repoData = response.data.repository;
  const reviews = repoData.reviews.edges.map(edge => edge.node)

  const onPress = (url) => {
    Linking.openURL(url)
  }

  const parseDate = (isoDateString) => {
    const date = parseISO(isoDateString);
    return format(date, 'dd.MM.yyyy');
  }

  const ItemSeparator = () => <View style={styles.separator}/>;

  return (
    <View style={styles.background}>
      <View style={styles.column}>
        <FlatList
          data={reviews}
          renderItem={
            ({item}) => {
              return <View style={styles.container}>
                <View style={styles.row}>
                  <View style={[styles.circle, styles.center]}>
                    <Text {...styles.ratingTextStyle}>{item.rating}</Text>
                  </View>
                  <View style={styles.column}>
                    <View>
                      <Text {...styles.reviewerTextStyle}>{item.user.username}</Text>
                      <Text {...styles.reviewDateTextStyle}>{parseDate(item.createdAt)}</Text>
                    </View>
                    <Text>{item.text}</Text>
                  </View>
                </View>
              </View>
            }
          }
          ListHeaderComponent={
            <View style={styles.itemBackground}>
              <RepositoryItem {...repoData}/>
              <View style={styles.container}>
                <CustomButton text="Open in Github" onPress={() => onPress(repoData.url)}/>
              </View>
              <ItemSeparator/>
            </View>

          }
          ItemSeparatorComponent={ItemSeparator}
        >

        </FlatList>
      </View>
    </View>
  );
};

export default RepositoryDetailPage;