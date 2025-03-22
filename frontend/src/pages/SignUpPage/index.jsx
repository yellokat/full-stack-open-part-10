import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import theme from "../../theme";
import useSignUp from '../../hooks/useCreateUser'
import useSignIn from "../../hooks/useSignIn";
import useCreateReview from '../../hooks/useCreateReview'
import {SignInContainer} from "../SignInPage/SignInPage";
import * as yup from "yup";
import {Formik, useFormikContext} from "formik";
import Text from "../../components/Text/Text";
import CustomButton from "../../components/CustomButton";

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
  inputWithoutHeightLimit: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 60
  },
  column: {
    flexDirection: "column",
    gap: 20,
  }
})

export const SignUpContainer = ({handleSignUp}) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("username is required."),
    password: yup.string().required("password is required."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null])
      .required('password confirmation is required.'),
  });

  const onSubmit = async (values) => {
    const {username, password, passwordConfirm} = values;
    try {
      await handleSignUp({
        username,
        password
      })
    } catch (e) {
      // display error
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <SignUpForm/>
    </Formik>
  );
};

const SignUpForm = () => {
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

  const PasswordConfirmErrorMessage = ({formik}) => {
    if (formik.touched.passwordConfirm && formik.errors.passwordConfirm) {
      let errorMessage = formik.errors.passwordConfirm
      if (errorMessage.includes('passwordConfirm must be one of the following values: Ref(password')) {
        errorMessage = "password and password confirmation doesn't match."
      }
      return <Text style={{color: 'red'}}>{errorMessage}</Text>
    }
    return <></>
  }

  return <View style={styles.column}>
    <View>
      <TextInput
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
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        secureTextEntry={true}
        borderColor={(formik.touched.password && formik.errors.password) ? theme.colors.error : null}
        onChangeText={formik.handleChange('password')}
      />
      <PasswordErrorMessage formik={formik}/>
    </View>
    <View>
      <TextInput
        style={styles.input}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirm}
        secureTextEntry={true}
        borderColor={(formik.touched.passwordConfirm && formik.errors.passwordConfirm) ? theme.colors.error : null}
        onChangeText={formik.handleChange('passwordConfirm')}
      />
      <PasswordConfirmErrorMessage formik={formik}/>
    </View>
    <CustomButton text="Sign Up" onPress={formik.handleSubmit}/>
  </View>
}

const SignUpPage = () => {
  const [signUp] = useSignUp();
  return <View style={styles.background}>
    <View style={styles.container}>
      <SignUpContainer handleSignUp={signUp}/>
    </View>
  </View>
};

export default SignUpPage;