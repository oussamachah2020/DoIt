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
import { Link } from "expo-router";
import { supabase } from "@lib/supabase";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    await supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => Alert.alert(err.message));
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
        <Text style={style.title}>Welcome to DO IT</Text>
        <Text style={style.subTitle}>create an account and Join us now!</Text>
      </View>
      <View style={style.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          right={<TextInput.Icon icon="eye" />}
        />
        <Button mode="contained" onPress={signUpWithEmail} style={style.button}>
          Press me
        </Button>
        <Text style={style.SignInLink}>
          Already have an account ?{" "}
          <Link
            href={"/(auth)/sign_in"}
            style={{
              textDecorationLine: "underline",
              color: "#E26310",
              fontWeight: "900",
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
    color: "#fff",
    fontFamily: fontFamily.semiBold,
    fontSize: 25,
    textAlign: "center",
  },
  subTitle: {
    color: "#fff",
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
    backgroundColor: "#E26310",
    borderRadius: 5,
    paddingVertical: 5,
  },
  SignInLink: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});
