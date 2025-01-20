import { Colors } from "@/constants/Colors";
import { fontStyles } from "@/constants/FontStyles";
import { Link } from "expo-router";
import { FlatList, ListRenderItem, StyleSheet, Text, View, ViewStyle } from "react-native";

interface IHorizontalList<T> {
  title: string;
  items: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  style?: ViewStyle;
}

export default function HorizontalList<T>({
  title,
  items,
  renderItem,
  keyExtractor,
  style,
}: IHorizontalList<T>) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Link href={`/(tabs)/search/${title}`} style={styles.showMore}>
          Show more
        </Link>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width: 24 }}></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: Colors.accent,
    ...fontStyles.poppinsSemiBold18,
  },
  showMore: {
    textDecorationLine: "underline",
    color: Colors.accent,
    ...fontStyles.poppinsRegular12,
  },
});
