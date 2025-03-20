import Text from "../Text/Text";
import {StyleSheet, View} from "react-native";
import React from "react";
import theme from "../../theme";

const styles = StyleSheet.create({
  chipBackground: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  chipContent: {
    margin: 7,
  },
  colorWhite: {
    color: "white",
  }
})

const Chip = ({children}) => {
  return (
    <View style={styles.chipBackground}>
      <View style={styles.chipContent}>
        <Text {...styles.colorWhite}>{children}</Text>
      </View>
    </View>
  );
};

export default Chip;
