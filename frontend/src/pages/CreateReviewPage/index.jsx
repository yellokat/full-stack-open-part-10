import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import theme from "../../theme";
import useSignIn from "../../hooks/useSignIn";
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
  column: {
    flexDirection: "column",
    gap: 20,
  }
})

export const CreateReviewContainer = ({handleCreateReview}) => {
  const initialValues = {
    repositoryOwnerName: '',
    repositoryName: '',
    rating: 0,
    review: ''
  };

  const validationSchema = yup.object().shape({
    repositoryOwnerName: yup.string().required('Repository owner name is required.'),
    repositoryName: yup.string().required('Repository name is required.'),
    rating: yup.number().required('Rating is required.').min(0).max(100),
    review: yup.string().optional(),
  });

  const onSubmit = async (values) => {
    const {repositoryOwnerName, repositoryName, rating, review} = values;
    try {
      await handleCreateReview({
        repositoryOwnerName,
        repositoryName,
        rating:Number(rating),
        review
      })
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
      <CreateReviewForm/>
    </Formik>
  );
};

const CreateReviewForm = () => {
  const formik = useFormikContext();

  const RepositoryOwnerNameErrorMessage = ({formik}) => {
    if (formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName) {
      return <Text style={{color: 'red'}}>{formik.errors.repositoryOwnerName}</Text>
    }
    return <></>
  }

  const RepositoryNameErrorMessage = ({formik}) => {
    if (formik.touched.repositoryName && formik.errors.repositoryName) {
      return <Text style={{color: 'red'}}>{formik.errors.repositoryName}</Text>
    }
    return <></>
  }

  const RatingErrorMessage = ({formik}) => {
    if (formik.touched.rating && formik.errors.rating) {
      let errorMessage = formik.errors.rating;
      if (formik.errors.rating.includes('must be a `number` type')){
        errorMessage = "Rating must be a number.";
      }
      return <Text style={{color: 'red'}}>{errorMessage}</Text>
    }
    return <></>
  }

  const ReviewErrorMessage = ({formik}) => {
    if (formik.touched.review && formik.errors.review) {
      return <Text style={{color: 'red'}}>{formik.errors.review}</Text>
    }
    return <></>
  }

  return <View style={styles.column}>
    <View>
      <TextInput
        style={styles.input}
        placeholder="Repository Owner Name"
        value={formik.values.repositoryOwnerName}
        borderColor={(formik.touched.repositoryOwnerName && formik.errors.repositoryOwnerName) ? theme.colors.error : null}
        onChangeText={formik.handleChange('repositoryOwnerName')}
      />
      <RepositoryOwnerNameErrorMessage formik={formik}/>
    </View>
    <View>
      <TextInput
        style={styles.input}
        placeholder="Repository Name"
        value={formik.values.repositoryName}
        borderColor={(formik.touched.repositoryName && formik.errors.repositoryName) ? theme.colors.error : null}
        onChangeText={formik.handleChange('repositoryName')}
      />
      <RepositoryNameErrorMessage formik={formik}/>
    </View>
    <View>
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={formik.values.rating}
        borderColor={(formik.touched.rating && formik.errors.rating) ? theme.colors.error : null}
        onChangeText={formik.handleChange('rating')}
      />
      <RatingErrorMessage formik={formik}/>
    </View>
    <View>
      <TextInput
        style={styles.input}
        placeholder="Review"
        value={formik.values.review}
        borderColor={(formik.touched.review && formik.errors.review) ? theme.colors.error : null}
        onChangeText={formik.handleChange('review')}
      />
      <ReviewErrorMessage formik={formik}/>
    </View>
    <CustomButton text="Create Review" onPress={formik.handleSubmit} />
  </View>
}

const CreateReviewPage = () => {
  const [signIn] = useSignIn();
  return <View style={styles.background}>
    <View style={styles.container}>
      <CreateReviewContainer handleSignIn={signIn}/>
    </View>
  </View>
};

export default CreateReviewPage;