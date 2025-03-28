import {Platform} from "react-native";

const getPlatformSpecificFont = () => {
  if (Platform.OS === "android") {
    return 'roboto'
  } else if (Platform.OS === "ios") {
    return 'arial'
  } else {
    return 'System'
  }
}

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#FFFFFF',
    backgroundGrey: '#C5C6D0',
    error: '#FF0000'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 24,
  },
  fonts: {
    main: getPlatformSpecificFont()
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
  }
};

export default theme;