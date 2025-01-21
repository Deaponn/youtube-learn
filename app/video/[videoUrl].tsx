import { Colors } from "@/constants/Colors";
import { fontStyles } from "@/constants/FontStyles";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import Video, { VideoRef } from "react-native-video";
import PersonIcon from "@/assets/icons/person-icon.svg";
import ViewsIcon from "@/assets/icons/views-icon.svg";
import LikesIcon from "@/assets/icons/likes-icon.svg";
import DoubleToggle from "@/components/DoubleToggle";
import useApiRequest from "@/hooks/useApiRequest";
import {
  buildVideoDetailsQuery,
  buildVideoStatisticsQuery,
  VideoDetailsResponse,
  VideoStatisticsResponse,
} from "@/helpers/buildQueryUrl";

export default function VideoPlayer() {
  const { videoUrl } = useLocalSearchParams();

  const [viewsCount, setViewsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [videoTitle, setVideoTitle] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");
  const [channelName, setChannelName] = useState("Loading...");

  const statisticsLoaded = useApiRequest<VideoStatisticsResponse>(
    buildVideoStatisticsQuery(videoUrl as string),
    (results) => {
      setViewsCount(results.items[0].statistics.viewCount);
      setLikesCount(results.items[0].statistics.likeCount);
    }
  );

  const detailsLoaded = useApiRequest<VideoDetailsResponse>(
    buildVideoDetailsQuery(videoUrl as string),
    (results) => {
      setVideoTitle(results.items[0].snippet.title);
      setDescription(results.items[0].snippet.description);
      setChannelName(results.items[0].snippet.channelTitle);
    }
  );

  const videoRef = useRef<VideoRef>(null);
  const background = require("@/assets/video/broadchurch.mp4");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.videoContainer}>
        <Video
          source={background}
          ref={videoRef}
          onBuffer={(ev) => console.log("buffering...", ev.isBuffering)}
          onError={(error) => console.log(error)}
          style={styles.backgroundVideo}
        />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {detailsLoaded ? videoTitle : "Loading..."}
      </Text>
      <View style={styles.channelInfo}>
        <View style={styles.channelIcon}>
          <PersonIcon color="#FFF" width={20} height={20} style={{ margin: "auto" }} />
        </View>
        <Text style={styles.channelName}>{detailsLoaded ? channelName : "Loading..."}</Text>
      </View>
      <DoubleToggle
        leftTitle="Details"
        rightTitle="Notes"
        leftElement={
          <ScrollView>
            <View style={{ padding: 4 }}>
              <Text style={styles.smallText}>Description</Text>
              <Text style={styles.description}>{detailsLoaded ? description : "Loading..."}</Text>
              <Text style={styles.smallText}>Statistics</Text>
              <View style={styles.statistics}>
                <View style={styles.statisticsTextContainer}>
                  <ViewsIcon color={Colors.light} width={20} height={20} />
                  <Text style={styles.statisticsText}>
                    {statisticsLoaded ? viewsCount : "Loading..."} views
                  </Text>
                </View>
                <View style={styles.statisticsTextContainer}>
                  <LikesIcon color={Colors.light} width={20} height={20} />
                  <Text style={styles.statisticsText}>
                    {statisticsLoaded ? likesCount : "Loading..."} likes
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        }
        rightElement={<Text>Not implemented</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  videoContainer: {
    marginTop: StatusBar.currentHeight,
    marginBottom: 20,
    width: "100%",
    aspectRatio: "16 / 9",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    width: 361,
    marginBottom: 16,
    marginLeft: 16,
    color: Colors.accent,
    ...fontStyles.poppinsSemiBold18,
  },
  channelInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginLeft: 24,
    marginBottom: 19,
  },
  channelIcon: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: Colors.accent,
    marginRight: 12,
  },
  channelName: {
    color: Colors.accent,
    ...fontStyles.poppinsBold14,
  },
  smallText: {
    marginTop: 16,
    color: Colors.accent,
    ...fontStyles.poppinsSemiBold10,
  },
  description: {
    color: Colors.accent,
    ...fontStyles.poppinsRegular12,
  },
  statistics: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statisticsTextContainer: {
    width: 136,
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.accent,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
  },
  statisticsText: {
    marginLeft: "auto",
    marginRight: "auto",
    color: Colors.light,
    ...fontStyles.poppinsSemiBold10,
  },
});
