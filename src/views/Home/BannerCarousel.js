import propTypes from 'prop-types';
import { useState } from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

const Banner = ({ item, width }) => {
  const { colors } = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadImageError, setLoadImageError] = useState(false);

  return (
    <View style={styles.bannerContainer}>
      <Image
        source={{
          uri: item.cover,
        }}
        onLoad={() => {
          setImageLoaded(true);
          setLoadImageError(false);
        }}
        onError={() => {
          setImageLoaded(false);
          setLoadImageError(true);
        }}
        style={{ width, height: width / 2 }}
      />

      {(!imageLoaded || loadImageError) && (
        <View
          style={[
            styles.imagePlaceholder,
            {
              backgroundColor: colors.disabled,
            },
          ]}
        />
      )}
    </View>
  );
};

const BannerCarousel = ({ data, mt }) => {
  const width = Dimensions.get('window').width;

  return (
    <Carousel
      data={data}
      autoPlayInterval={3000}
      scrollAnimationDuration={1500}
      autoPlay
      loop
      width={width}
      height={width / 2}
      renderItem={({ item }) => <Banner item={item} width={width} />}
      style={{ marginTop: mt }}
    />
  );
};

BannerCarousel.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      cover: propTypes.string,
      link: propTypes.string,
    })
  ).isRequired,
  mt: propTypes.number,
};

export default BannerCarousel;

const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
