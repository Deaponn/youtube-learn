import { Colors } from "@/constants/Colors";
import { TextInput, StyleSheet, View, ViewStyle } from "react-native";
import SearchIcon from "@/assets/icons/search-icon.svg";
import { fontStyles } from "@/constants/FontStyles";

interface ISearchbar {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  rightButton?: JSX.Element;
  style?: ViewStyle;
}

export default function Searchbar({
  search,
  setSearch,
  placeholder,
  rightButton,
  style,
}: ISearchbar) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <View
        style={rightButton === undefined ? styles.inputContainerWide : styles.inputContainerSlim}
      >
        <SearchIcon color={Colors.accent} height={24} />
        <TextInput
          placeholder={placeholder || "Search..."}
          style={styles.input}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      {rightButton ? rightButton : null}
    </View>
  );
}

const inputContainer: ViewStyle = {
  height: 44,
  borderRadius: 16,
  borderWidth: 2,
  borderColor: Colors.accent,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingLeft: 6,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainerSlim: {
    width: 297,
    ...inputContainer,
  },
  inputContainerWide: {
    width: 345,
    ...inputContainer,
  },
  input: {
    flex: 1,
    color: Colors.accent,
    ...fontStyles.poppinsRegular16
  },
});
