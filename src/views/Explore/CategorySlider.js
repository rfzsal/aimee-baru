import propTypes from 'prop-types';
import { useState } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { useTheme, TouchableRipple, Colors } from 'react-native-paper';

const Item = ({ item, selected, onPress }) => {
  const { colors } = useTheme();

  const backgroundColor =
    selected === item ? colors.primary : colors.background;
  const borderColor = selected === item ? colors.primary : colors.disabled;
  const color = selected === item ? colors.surface : colors.text;

  return (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <TouchableRipple
        onPress={onPress}
        rippleColor={Colors.grey300}
        borderless
      >
        <Text style={[styles.itemText, { color }]}>{item}</Text>
      </TouchableRipple>
    </View>
  );
};

const CategorySlider = ({ data }) => {
  const [selected, setSelected] = useState(data[0]);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <Item
            item={item}
            selected={selected}
            onPress={() => setSelected(item)}
          />
        );
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => String(item + index)}
      contentContainerStyle={styles.flatListInnerContainer}
      style={styles.flatList}
    />
  );
};

CategorySlider.propTypes = {
  data: propTypes.arrayOf(propTypes.string).isRequired,
};

export default CategorySlider;

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  itemText: { padding: 16 },
  flatListInnerContainer: { paddingHorizontal: 8 },
  flatList: { marginBottom: 24, marginTop: 16 },
});
