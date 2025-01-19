import { Link } from "expo-router";
import { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { VideosContext } from "@/app/(tabs)/_layout";
import Searchbar from "@/components/Searchbar";
import SettingsIcon from "@/assets/icons/settings-icon.svg";

export default function Index() {
  const videos = useContext(VideosContext);
  const [search, setSearch] = useState<string>("");

  if (videos.react.length === 0) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Searchbar
        search={search}
        setSearch={(text) => setSearch(text)}
        rightButton={<SettingsIcon />}
        style={{
          marginTop: 40
        }}
      />
      <Text>
        Main view of the app. {videos.javascript.length} {videos.typescript[0].snippet.title}
      </Text>
      <Link href="/video/1">View first video details</Link>
      <Link href="/video/2">View second video details</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
