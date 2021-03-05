import React, {useEffect, useState, useReducer, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Button,
  Platform,
  ActivityIndicator,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
// npm install --save expo-linear-gradient

import Input from "../../components/shop/UI/Input";
import Card from "../../components/shop/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../storage/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSingup, setIsSignup] = useState(false);
  const[error, setError]=useState()
  const dispatch = useDispatch();

  useEffect(()=>{
     if(error){
         Alert.alert('An error occurred!', error, [{text: 'Okay'}]);
     } 
  },[error]);

  const authHandler = async () => {
    let action;
    if (isSingup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
        await dispatch(action);
        props.navigation.navigate('Shop');
    } catch (error) {
        setError(error.message);
        setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[Colors.primary, Colors.accent]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.kboard}
          keyboardVerticalOffset={Platform.OS === "android" ? 0 : 130}
        >
          <Card style={styles.authContainer}>
            <ScrollView>
              <Input
                id="email"
                label="Email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address!"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password!"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <View style={styles.btnContainer}>
                {isLoading ? (
                  <ActivityIndicator size='small' color={Colors.primary}/>
                ) : (
                  <Button
                    title={isSingup ? "Sign UP" : "Login"}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.btnContainer}>
                <Button
                  title={`Switch to ${isSingup ? "Login" : "Sign Up"}`}
                  color={Colors.accent}
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                />
              </View>
            </ScrollView>
          </Card>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  kboard: {
    width: "80%",
  },
  authContainer: {
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
