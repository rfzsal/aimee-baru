import propTypes from 'prop-types';
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';


const ProfileAvatar = ({ name, avatar, status, toSelectRole }) => {
  const { colors } = useTheme();
  const [loadImageError, setLoadImageError] = useState(false);
  
  return (
    <TouchableOpacity onPress={toSelectRole} activeOpacity={0.8}>

    <View style={styles.container}>
      {loadImageError && <Avatar.Text label={name[0]} size={64} />}
      {!loadImageError && (
        <Avatar.Image
          onError={() => setLoadImageError(true)}
          source={{ uri: avatar }}
          size={64}
        />
      )}

      <View style={styles.innerContainer}>
        <Text style={styles.nameText}>{name}</Text>

        {status && (
          <View
            style={[
              styles.chipContainer,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <Text style={[styles.chipText, { color: colors.surface }]}>
              {status}
            </Text>
          </View>
        )}
      </View>
    </View>
    </TouchableOpacity>

  );
};

ProfileAvatar.propTypes = {
  name: propTypes.string,
  avatar: propTypes.string,
  status: propTypes.string,
};

export default ProfileAvatar;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  innerContainer: { marginLeft: 8, bottom: 2 },
  nameText: { fontSize: 18, fontWeight: 'bold' },
  chipContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 2,
  },
  chipText: { fontSize: 12 },
});
