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
  const [visible, setVisile] = useState(true);

  const togglePasswordVisibility = () => {
    setVisile(!visible);
  };
  const { setSession, setIsAuth, session } = useAuthStore();

  const storeData = async (session: Session) => {
    try {
      await AsyncStorage.setItem("session", JSON.stringify(session));
    } catch (e) {
      console.log(e);
    }
  };

  async function Login() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data) {
      setIsAuth(true);
      setSession(data?.session);
      storeData(data.session as Session);
    } else {
      console.error(error);
    }
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
        <Text style={style.subTitle}>
          Continue your journey of productivity
        </Text>
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
          onPress={Login}
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
              color: "#2F89FC",
              fontFamily: fontFamily.semiBold,
            }}
          >
            Sign Up
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
