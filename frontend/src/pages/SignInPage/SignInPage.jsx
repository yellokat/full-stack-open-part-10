import Text from '../../components/Text/Text';
import {Formik, useFormik, useFormikContext} from "formik";
import {StyleSheet, Pressable, TextInput, View} from "react-native";
import theme from "../../theme";
import * as yup from 'yup';
import useSignIn from "../../hooks/useSignIn";

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

export const SignInContainer = ({handleSignIn}) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("username is required."),
    password: yup.string().required("password is required."),
  });

  const onSubmit = async (values) => {
    const {username, password} = values;
    try {
      await handleSignIn({username, password})
    } catch (e) {
      // display error
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <SignInForm/>
    </Formik>
  );
};

const SignInForm = () => {
  const formik = useFormikContext();

  const UsernameErrorMessage = ({formik}) => {
    if (formik.touched.username && formik.errors.username) {
      return <Text style={{color: 'red'}}>{formik.errors.username}</Text>
    }
    return <></>
  }

  const PasswordErrorMessage = ({formik}) => {
    if (formik.touched.password && formik.errors.password) {
      return <Text style={{color: 'red'}}>{formik.errors.password}</Text>
    }
    return <></>
  }

  return <View style={styles.column}>
    <View>
      <TextInput
        testID="usernameInput"
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        borderColor={(formik.touched.username && formik.errors.username) ? theme.colors.error : null}
        onChangeText={formik.handleChange('username')}
      />
      <UsernameErrorMessage formik={formik}/>
    </View>
    <View>
      <TextInput
        testID="passwordInput"
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        borderColor={(formik.touched.username && formik.errors.password) ? theme.colors.error : null}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
      />
      <PasswordErrorMessage formik={formik}/>
    </View>
    <Pressable testID="signInButton" onPress={formik.handleSubmit}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text fontSize="subheading" color="white">Sign In</Text>
        </View>
      </View>
    </Pressable>
  </View>
}

const SignInPage = () => {
  const [signIn] = useSignIn();
  return <View style={styles.background}>
    <View style={styles.container}>
      <SignInContainer handleSignIn={signIn}/>
    </View>
  </View>
};

export default SignInPage;