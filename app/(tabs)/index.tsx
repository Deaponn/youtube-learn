import { useContext, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { VideosContext } from "@/app/(tabs)/_layout";
import Searchbar from "@/components/Searchbar";
import SettingsIcon from "@/assets/icons/settings-icon.svg";
import HorizontalList from "@/components/HorizontalList";
import { Colors } from "@/constants/Colors";
import ListVideoCard from "@/components/ListVideoCard";

export default function Index() {
  const videos = useContext(VideosContext);
  const [search, setSearch] = useState<string>("");

  // TODO: better loader
  if (videos.react.length === 0) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Searchbar
        search={search}
        setSearch={(text) => setSearch(text)}
        placeholder="Search videos"
        rightButton={<SettingsIcon />}
        style={{
          marginTop: 40,
        }}
      />
      <FlatList
        data={[
          { title: "React Native", items: videos.reactNative },
          { title: "React", items: videos.react },
          { title: "Typescript", items: videos.typescript },
          { title: "Javascript", items: videos.javascript },
        ]}
        renderItem={({ item: { title, items } }) => (
          <HorizontalList
            title={title}
            items={items}
            renderItem={(props) => <ListVideoCard {...props} size="small" />}
            keyExtractor={(item) => item.id.videoId}
            style={{ height: 218, marginTop: 18 }}
          />
        )}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 2, backgroundColor: Colors.accent }}></View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
});
