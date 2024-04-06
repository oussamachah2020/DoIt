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
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { verifyEmail } from "@loaders/auth";

export default function AccountVerification() {
  const [code, setCode] = useState<string>("");
  const { email } = useLocalSearchParams<{ email: string }>();
  const [loading, setLoading] = useState(false);

  function verify() {
    verifyEmail(code, email)
      .then((res) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Email verified !",
          textBody: `You'll be redirected to the login screen !`,
        });

        setTimeout(() => {
          router.replace("/(auth)/sign_in");
          Dialog.hide();
        }, 2000);
      })
      .catch((err) => console.error(err));
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
        <Text style={style.title}>One step Left</Text>
        <Text style={style.subTitle}>
          Enter the received code to verify your email
        </Text>
      </View>
      <View style={style.form}>
        <TextInput
          label="verification code"
          value={code}
          onChangeText={(text) => setCode(text)}
          contentStyle={{
            backgroundColor: "#F5F5F5",
          }}
        />

        <Button
          mode="contained"
          onPress={verify}
          style={style.button}
          loading={loading === true}
          disabled={!code}
        >
          {loading === true ? (
            <ActivityIndicator size={"small"} color="#fff" />
          ) : (
            "Verify Account"
          )}
        </Button>
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
    fontSize: 16,
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
