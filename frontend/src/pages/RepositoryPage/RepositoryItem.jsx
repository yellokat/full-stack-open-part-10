import React from 'react';
import {View, StyleSheet, Image} from "react-native";
import Text from '../../components/Text/Text';
import theme from "../../theme";
import Chip from "../../components/Chip/Chip";
import RepositoryStats from "./RepositoryStats";

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    gap:10
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 0,
  },
  textContainer: {
    flex: 1,
    flexShrink: 1
  },
  thumbnail: theme.thumbnail,
  logo: {
    width: 66,
    height: 58,
  },
  title: {
    fontWeight: "bold",
    fontSize: "subheading"
  },
});

const extractName = (fullName) => {
  return fullName.split('/')[0];
}

const truncateIfNeeded = (num) => {
  if (999 < num){
    return Math.floor(num/100)/10 + 'k';
  } else {
    return num;
  }
}

const RepositoryItem = ({fullName, description, language, forksCount, stargazersCount, reviewCount, ratingAverage}) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.thumbnail}
              src={`https://github.com/${extractName(fullName)}.png`}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.column} alignItems="flex-start" >
              <Text {...styles.title}>{fullName}</Text>
              <Text>{description}</Text>
              <Chip>{language}</Chip>
            </View>
          </View>
        </View>
        <View gap={50}/>
        <View style={styles.row} justifyContent="space-evenly">
          <RepositoryStats testID="repositoryStatStars" title="Stars" value={truncateIfNeeded(stargazersCount)}/>
          <RepositoryStats testID="repositoryStatForks" title="Forks" value={truncateIfNeeded(forksCount)}/>
          <RepositoryStats testID="repositoryStatReviews" title="Reviews" value={truncateIfNeeded(reviewCount)}/>
          <RepositoryStats testID="repositoryStatRating" title="Rating" value={truncateIfNeeded(ratingAverage)}/>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;