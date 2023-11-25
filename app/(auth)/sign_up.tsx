import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "@assets/images/app_icons/logo.svg";
import { fontFamily } from "@constants/typography";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { Link, router } from "expo-router";
import { supabase } from "@lib/supabase";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { createAccount } from "../../src/loaders/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisile] = useState(true);

  const togglePasswordVisibility = () => {
    setVisile(!visible);
  };

  function signUpWithEmail() {
    setLoading(true);

    createAccount(email, password)
      .then(() => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Account created !",
          textBody: `Verification code was sent to ${email}`,
          button: "Verify Account",
          onPressButton() {
            router.push({
              pathname: "/(auth)/email_verification",
              params: { email },
            });
            this.autoClose = true;
          },
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <View
      style={{
        marginTop: 100,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View style={style.top}>
        <Logo style={{ marginBottom: 10 }} />
        <Text style={style.title}>Welcome Back</Text>
        <Text style={style.subTitle}>Stay Organized, Stay Productive!</Text>
      </View>
      <View style={style.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          contentStyle={{
            backgroundColor: "#F5F5F5",
          }}
        />
        <TextInput
          label="Password"
          secureTextEntry={visible}
          value={password}
          onChangeText={(text) => setPassword(text)}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={togglePasswordVisibility}
              style={{
                backgroundColor: "#F5F5F5",
              }}
              containerColor="#F5F5F5"
            />
          }
          style={{
            backgroundColor: "#F5F5F5",
          }}
        />
        <Button
          mode="contained"
          onPress={signUpWithEmail}
          style={style.button}
          loading={loading === true}
          disabled={!email || !password || password.length < 8}
        >
          {loading === true ? "" : "Create Account"}
        </Button>
        <Text style={style.SignInLink}>
          Have an account ?{" "}
          <Link
            href={"/(auth)/sign_in"}
            style={{
              textDecorationLine: "underline",
              color: "#2F89FC",
              fontFamily: fontFamily.semiBold,
            }}
          >
            Sign In
          </Link>
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontFamily: fontFamily.semiBold,
    fontSize: 25,
    textAlign: "center",
  },
  subTitle: {
    color: "#000",
    fontFamily: fontFamily.Medium,
    fontSize: 18,
    textAlign: "center",
  },
  form: {
    marginTop: 50,
    marginHorizontal: 20,
    gap: 30,
  },
  button: {
    backgroundColor: "#2F89FC",
    borderRadius: 5,
    paddingVertical: 5,
  },
  SignInLink: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
});
