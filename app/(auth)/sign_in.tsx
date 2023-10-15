import { Alert, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Logo from "@assets/images/app_icons/logo.svg";
import { fontFamily } from "@constants/typography";
import { Button, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { supabase } from "@lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useAuthStore } from "../../src/zustand/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSession, setIsAuth, session } = useAuthStore();

  const storeData = async (access_token: string) => {
    try {
      await AsyncStorage.setItem("token", access_token);
    } catch (e) {
      console.log(e);
    }
  };

  async function signUpWithEmail() {
    setLoading(true);
    await supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then((data) => {
        setIsAuth(true);
        setSession(data?.data?.session as Session);
        storeData(data.data.session?.access_token as string);
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
        <Text style={style.title}>Welcome Back</Text>
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
        <Button
          mode="contained"
          onPress={signUpWithEmail}
          style={style.button}
          loading={loading === true}
        >
          {loading === true ? "" : "Login"}
        </Button>
        <Text style={style.SignInLink}>
          Don't have an account ?{" "}
          <Link
            href={"/(auth)/sign_up"}
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
