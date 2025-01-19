import { Link } from "expo-router";
import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { VideosContext } from "@/app/(tabs)/_layout";

export default function Index() {
  const videos = useContext(VideosContext);

  if (videos.react.length === 0) return <><Text>Loading...</Text></>

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Main view of the app. {videos.javascript.length} {videos.typescript[0].snippet.title}</Text>
      <Link href="/video/1">View first video details</Link>
      <Link href="/video/2">View second video details</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
