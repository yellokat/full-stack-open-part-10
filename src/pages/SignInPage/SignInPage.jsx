import Text from '../../components/Text/Text';
import {useFormik} from "formik";
import {StyleSheet, Pressable, TextInput, View} from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.backgroundGrey,
    flex: 1
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.colors.white,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  column: {
    flexDirection: "column",
    gap: 20,
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 7,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 5,
  }
})

const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
  console.log(values);
};

const SignInForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.column}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
      />
      <Pressable onPress={formik.handleSubmit}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text fontSize="subheading" color="white">Sign In</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const SignInPage = () => {
  return <View style={styles.background}>
    <View style={styles.container}>
    <SignInForm/>
  </View>
  </View>
};

export default SignInPage;