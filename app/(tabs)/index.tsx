import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Main view of the app.</Text>
      <Link href="/video/1">View first video details</Link>
      <Link href="/video/2">View second video details</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
