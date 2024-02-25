import propTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const Container = ({ children, mt, mb }) => {
  return (
    <View style={[styles.container, { marginTop: mt, marginBottom: mb }]}>
      {children}
    </View>
  );
};

Container.propTypes = {
  children: propTypes.node,
  mt: propTypes.number,
  mb: propTypes.number,
};

export default Container;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
});
