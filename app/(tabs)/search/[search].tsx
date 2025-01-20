import Searchbar from "@/components/Searchbar";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { VideoResponseData } from "@/app/(tabs)/_layout";
import ListVideoCard from "@/components/ListVideoCard";
import { fontStyles } from "@/constants/FontStyles";
import { Colors } from "@/constants/Colors";

// TODO: add custom sorting
// TODO: switch from fetchMockData to fetchData

export default function Search() {
  const { search } = useLocalSearchParams();

  const [searchPhrase, setSearchPhrase] = useState<string>(search as string);
  const [searchResults, setSearchResults] = useState<VideoResponseData[]>([]);
  const [resultsCount, setResultsCount] = useState<number>(1157); // TODO: set searchCount dynamically

  useEffect(() => {
    setSearchPhrase(search as string);
  }, [search]);

  useEffect(() => {
    async function fetchVideos() {
      const queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.EXPO_PUBLIC_API_KEY}&q=${search}&type=video`;
      const response = await fetch(queryUrl);
      const json = await response.json();
      setSearchResults(json.items as VideoResponseData[]);
    }

    async function fetchMockedVideos() {
      const allResults: any = require("@/mockSearchData.json");
      setSearchResults(allResults.react as VideoResponseData[]);
    }

    // fetchVideos();
    fetchMockedVideos();
  }, [search]);

  return (
    <View style={styles.container}>
      <Searchbar
        search={searchPhrase}
        setSearch={(text) => setSearchPhrase(text)}
        placeholder="Search videos"
        style={{
          marginTop: 40,
        }}
      />
      <View style={styles.resultsCountContainer}>
        <Text style={{...fontStyles.poppinsRegular10, color: Colors.accent}}>{resultsCount} results found for: </Text>
        <Text style={{...fontStyles.poppinsSemiBold10, color: Colors.accent}}>"{searchPhrase}"</Text>
      </View>
      <View style={styles.sortContainer}>
        <Text style={{...fontStyles.poppinsRegular12, color: Colors.accent}}>Sort by: </Text>
        <Text style={{...fontStyles.poppinsSemiBold12, color: Colors.accent}}>Most popular</Text>
      </View>
      <FlatList
        data={searchResults}
        renderItem={(props) => <ListVideoCard {...props} size="big" />}
        keyExtractor={(item) => item.snippet.title}
        ItemSeparatorComponent={() => <View style={{ height: 24 }}></View>}
        style={styles.list}
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
  resultsCountContainer: {
    height: 24,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  sortContainer: {
    height: 24,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  list: {
    width: "100%",
  },
});
