import { Colors } from "@/constants/Colors";
import { fontStyles } from "@/constants/FontStyles";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import Logo from "@/assets/logo.svg";
import AppIcon from "@/assets/app-icon.svg";

export default function Index() {
  return (
    <View style={styles.view}>
      <Logo height={116} />
      <AppIcon height={128} />
      <Text style={styles.welcomeMessage}>
        Welcome to the best YouTube-based learning application.
      </Text>
      <Link href={"/(tabs)"} style={styles.loginButton}>
        Log in as guest
      </Link>
      <Text style={styles.disclaimer}>
        By continuing you agree with{"\n"}
        <Link href={"https://www.wikipedia.org"} style={styles.disclaimerLink}>
          Terms and Conditions
        </Link>{" "}
        and{" "}
        <Link href={"https://www.wikipedia.org"} style={styles.disclaimerLink}>
          Privacy Policy
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  welcomeMessage: {
    color: Colors.light,
    width: 327,
    ...fontStyles.poppinsSemiBold22,
  },
  loginButton: {
    color: Colors.light,
    backgroundColor: Colors.accent,
    width: 327,
    height: 48,
    borderRadius: 12,
    textAlign: "center",
    textAlignVertical: "center",
    ...fontStyles.poppinsSemiBold16,
  },
  disclaimer: {
    color: Colors.light,
    width: 274,
    textAlign: "center",
    ...fontStyles.poppinsRegular13,
  },
  disclaimerLink: {
    color: Colors.accent,
    textDecorationLine: "underline",
  },
});
