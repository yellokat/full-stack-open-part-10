import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from "react-native";
import theme from "../../theme";
import {useQuery} from "@apollo/client";
import {ME} from "../../graphql/queries";
import RepositoryItem from "../RepositoryPage/RepositoryItem";
import {format, parseISO} from "date-fns";
import Text from "../../components/Text/Text";
import CustomButton from "../../components/CustomButton";
import {useNavigate} from "react-router-native";

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
  flexRow:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    gap: 10
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
  spacer: {
    height: 10
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
  reviewerTextStyle: {
    fontWeight: "bold"
  },
  reviewDateTextStyle: {
    color: theme.colors.textSecondary
  }
});

const parseDate = (isoDateString) => {
  const date = parseISO(isoDateString);
  return format(date, 'dd.MM.yyyy');
}

const ItemSeparator = () => <View style={styles.separator}/>;

const MyReviewsPage = () => {
  const navigate = useNavigate()
  const {data, refetch} = useQuery(ME, {
    variables: {
      includeReviews: true
    }
  })

  if (!data) {
    return null
  }

  const reviews = data.me.reviews.edges.map(edge => edge.node)
  console.log(JSON.stringify(reviews))

  return (
    <FlatList
      data={reviews}
      renderItem={
        ({item}) => {
          return <View style={styles.container}>
            <View style={styles.column}>
              <View style={styles.row}>
                <View style={[styles.circle, styles.center]}>
                  <Text {...styles.ratingTextStyle}>{item.rating}</Text>
                </View>
                <View style={styles.column}>
                  <View>
                    <Text {...styles.reviewerTextStyle}>{item.repository.fullName}</Text>
                    <Text {...styles.reviewDateTextStyle}>{parseDate(item.createdAt)}</Text>
                  </View>
                  <Text>{item.text}</Text>
                </View>
              </View>
              <View style={styles.spacer}/>
              <View style={styles.flexRow}>
                <View flex={1}>
                <CustomButton text="View repository" onPress={()=>{navigate(`/${item.repository.id}`)}}/>
                </View>
                <View flex={1}>
                <CustomButton isDangerous={true} text="Delete review"/>
                </View>
              </View>
            </View>
          </View>
        }
      }
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviewsPage;