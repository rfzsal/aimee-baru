import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const Divider = ({ line }) => {
  const { colors } = useTheme();

  return (
    <View>
      {line ? (
        <View
          style={[styles.dividerLine, { backgroundColor: colors.background }]}
        />
      ) : (
        <View
          style={[styles.dividerBox, { backgroundColor: colors.background }]}
        />
      )}
    </View>
  );
};

Divider.propTypes = {
  line: propTypes.bool,
};

Divider.defaultProps = {
  line: false,
};

export default Divider;

const styles = StyleSheet.create({
  dividerLine: { height: 1, marginVertical: 16 },
  dividerBox: { height: 24, marginVertical: 16 },
});
