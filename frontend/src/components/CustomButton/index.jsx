import theme from "../../theme";
import {Pressable, StyleSheet, View} from "react-native";
import Text from "../Text/Text";

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 7,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  dangerButtonContainer : {
    backgroundColor: theme.colors.error,
    borderRadius: 7,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 5,
  }
})

const CustomButton = ({text, onPress, isDangerous, testID}) => {
  const buttonContainerStyle = [
    styles.buttonContainer,
    isDangerous ? styles.dangerButtonContainer : null,
  ]

  return <Pressable testID={testID} onPress={onPress}>
    <View style={buttonContainerStyle}>
      <View style={styles.button}>
        <Text fontSize="subheading" color="white">{text}</Text>
      </View>
    </View>
  </Pressable>
}

export default CustomButton;