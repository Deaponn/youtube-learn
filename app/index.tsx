import { fontStyles } from "@/constants/FontStyles";
import { Link } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={fontStyles.poppinsMid}>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/(tabs)"}>Login</Link>
    </View>
  );
}
