import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Choose the appropriate icon set
import { useAuth } from '../../hooks/useAuth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, fbStorage } from '../../../firebase';

const CustomButton = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Icon name={iconName} size={40} color="#fff" />
    </View>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const RoleUsers = ({ navigation }) => {
  const { user, updateRole } = useAuth();
  const userRef = doc(db, 'users', user.uid);
  // Fungsi untuk menangani navigasi
  const navigateToHome = () => {
    // Gunakan nama halaman yang sesuai dengan konfigurasi navigasi Anda
    navigation.navigate('Home');
  };
  // Fungsi untuk menangani navigasi ke halaman AddStartup
  const navigateToAddStartup = async () => {
    try {
      updateRole('Startupreneur');
    } catch (error) {}
    navigation.navigate('Home');
  };
  const navigateToInvestor = async () => {
    try {
      updateRole('Investor');
    } catch (error) {}
    navigation.navigate('Home');
  };
  const navigateToDigitalTalent = async () => {
    try {
      await updateDoc(userRef, {
        role: 'Digital Talent',
      });
    } catch (error) {}
    navigation.navigate('AddDigitalTalent');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/aimee.png')} // Ganti dengan path yang benar
        style={styles.logo}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.quote}>
          "Start your own business not just as a job - but as a way of life"
        </Text>
        <Text style={styles.author}>- Richard Branson -</Text>
      </View>
      <View style={styles.buttonGroup}>
        <CustomButton
          title="Startup"
          iconName="rocket"
          onPress={navigateToAddStartup}
        />
        <CustomButton
          title="Investor"
          iconName="hand-coin"
          onPress={navigateToInvestor}
        />
      </View>
      <View>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Select your role 🚀{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gold',
  },
  logo: {
    width: '50%', // Takes up 80% of the screen width
    height: undefined, // Ensures that the image aspect ratio is not distorted
    aspectRatio: 1, // Assuming the logo is square, change as needed
    resizeMode: 'contain', // Ensures the image is scaled to fit within the view
    alignSelf: 'center', // Centers the logo horizontally
  },
  quote: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  author: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: 150, // Square dimensions
    height: 150, // Square dimensions
    borderRadius: 10, // Adjust as needed
    margin: 10,
  },
  iconContainer: {
    marginBottom: 10, // Space between icon and text
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default RoleUsers;
