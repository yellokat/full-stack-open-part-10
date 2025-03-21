import Main from './src/Main';
import {NativeRouter} from 'react-router-native';
import {StatusBar} from "react-native";
import createApolloClient from "./src/utils/apolloClient";
import {ApolloProvider} from "@apollo/client";

import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return <>
    <NativeRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main/>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>;
    <StatusBar style="auto"/>
  </>
};

export default App;