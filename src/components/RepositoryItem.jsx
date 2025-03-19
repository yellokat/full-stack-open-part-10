import React from 'react';
import {Text, View} from "react-native";

const RepositoryItem = ({fullName, description, language, forksCount, stargazersCount, reviewCount, ratingAverage}) => {
  return (
    <Text>
      Full name: {fullName}{'\n'}
      Description: {description}{'\n'}
      Language: {language}{'\n'}
      Stars: {stargazersCount}{'\n'}
      Forks: {forksCount}{'\n'}
      Reviews: {reviewCount}{'\n'}
      Rating: {ratingAverage}
    </Text>
  );
};

export default RepositoryItem;