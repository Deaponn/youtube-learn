import { VideoResponseData } from "@/app/(tabs)/_layout";
import { Colors } from "@/constants/Colors";
import { fontStyles } from "@/constants/FontStyles";
import { Text, View, Image, StyleSheet } from "react-native";

interface IListVideoCard {
  item: VideoResponseData;
}

export default function ListVideoCard({ item }: IListVideoCard) {
  const date = new Date(Date.parse(item.snippet.publishedAt));
  const [day, month, year] = [date.getDay(), date.getMonth(), date.getFullYear()];

  return (
    <View style={styles.container}>
      <Image src={item.snippet.thumbnails.default.url} style={styles.thumbnail} />
      <Text style={styles.titleText} numberOfLines={2}>{item.snippet.title}</Text>
      <Text style={styles.dateText}>{`${day < 10 ? "0" + day : day}.${
        month < 10 ? "0" + month : month
      }.${year}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 159,
    marginLeft: 24,
  },
  thumbnail: {
    width: 180,
    height: 112,
    borderRadius: 16
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
