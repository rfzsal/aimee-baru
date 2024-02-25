import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaView = ({ children }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: colors.surface,
        },
        styles.container,
      ]}
    >
      {children}
    </View>
  );
};

export default SafeAreaView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
