import {fireEvent, render, screen, waitFor, within} from "@testing-library/react-native";
import SignInPage, {SignInContainer} from "../pages/SignInPage/SignInPage";
import {useFormik} from "formik";
import * as yup from "yup";


describe.only('SignInForm', () => {
  it('renders repository information correctly', async () => {
    // setup form state
    const mockFunction = jest.fn();
    render(<SignInContainer handleSignIn={mockFunction}/>);

    // screen should display 2 text inputs and a submit button
    const usernameInput = screen.getByTestId('usernameInput')
    const passwordInput = screen.getByTestId('passwordInput')
    const loginButton = screen.getByTestId('signInButton')
    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();

    // try to log in
    fireEvent.changeText(usernameInput, 'kalle')
    fireEvent.changeText(passwordInput, 'password')
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalledWith(
        {
          username: 'kalle',
          password: 'password'
        }
      )
    })
  });
});