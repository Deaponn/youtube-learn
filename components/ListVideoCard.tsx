import { VideoResponseData } from "@/app/(tabs)/_layout";
import { Colors } from "@/constants/Colors";
import { fontStyles } from "@/constants/FontStyles";
import { Link } from "expo-router";
import { Text, View, Image, StyleSheet } from "react-native";

interface IListVideoCard {
  item: VideoResponseData;
  size: "small" | "big";
}

export default function ListVideoCard({ item, size }: IListVideoCard) {
  const date = new Date(Date.parse(item.snippet.publishedAt));
  const [day, month, year] = [date.getDay(), date.getMonth(), date.getFullYear()];

  return (
    <Link
      href={`/video/${item.id.videoId}`}
      style={size === "small" ? styles.containerSmall : styles.containerBig}
    >
      <View style={styles.innerContainer}>
        <Image
          src={item.snippet.thumbnails.high.url}
          style={size === "small" ? styles.thumbnailSmall : styles.thumbnailBig}
        />
        {size === "big" ? (
          <Text style={styles.channelTitle} numberOfLines={1}>
            {item.snippet.channelTitle}
          </Text>
        ) : null}
        <Text style={styles.titleText} numberOfLines={2}>
          {item.snippet.title}
        </Text>
        <Text style={styles.dateText}>{`${day < 10 ? "0" + day : day}.${
          month + 1 < 10 ? "0" + (month + 1) : month + 1
        }.${year}`}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  containerSmall: {
    width: 180,
    height: 159,
  },
  containerBig: {
    width: "100%",
    height: 300,
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnailSmall: {
    width: 180,
    height: 112,
    borderRadius: 16,
  },
  thumbnailBig: {
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 16,
  },
  channelTitle: {
    color: Colors.accent,
    ...fontStyles.poppinsBold12,
  },
  titleText: {
    color: Colors.accent,
    ...fontStyles.poppinsMedium12,
  },
  dateText: {
    marginLeft: "auto",
    color: Colors.accent,
    ...fontStyles.poppinsRegular10,
  },
});
