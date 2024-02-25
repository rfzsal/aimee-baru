import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useTheme, Button } from 'react-native-paper';

import Divider from '../../components/Divider';
import MenuList from '../../components/MenuList';
import SafeAreaView from '../../components/SafeAreaView';
import { useAuth } from '../../hooks/useAuth';
import Container from '../../layout/Container';
import ProfileAvatar from '../../views/Profile/ProfileAvatar';
import { doc, getDoc } from "firebase/firestore";
import {  db  } from "../../../firebase"

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const auth = useAuth();
  const { user, role } = useAuth();
  const [userData, setUserData] = useState("");

  const getUser = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const documentSnapshot = await getDoc(userRef);
  
      if (documentSnapshot.exists()) {
        setUserData(documentSnapshot.data());
      }
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching user data:', error);
    }
  };
  
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStatusBarBackgroundColor(colors.surface);
      setStatusBarStyle('dark');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container mt={16}>
          <ProfileAvatar
            name={ userData.userName || auth.user.displayName || auth.user.email}
            avatar={userData.userImg || 'https://firebasestorage.googleapis.com/v0/b/aimee-6d10e.appspot.com/o/default%2FDesain%20tanpa%20judul%20(5).png?alt=media&token=9b9a50d3-6c63-465c-9372-6dfe5c0cb48f'} 
            status={role}
            toSelectRole={() => navigation.navigate('SelectRole')}
          />
          <Divider line />
        </Container>

        <Container mb={8}>
          <Text style={styles.sectionHeader}>Account</Text>
        </Container>
        <MenuList text="Profile Settings" icon="account-outline" onPress={() =>
            navigation.navigate('EditProfile')}/>
        <MenuList text="Change Password" icon="lock-outline" onPress={() =>
            navigation.navigate('ChangePassword')}/>
        <MenuList text="My Startup Match" icon="puzzle-check-outline" onPress={() =>
            navigation.navigate('StartupMatch')}/>
        {/* <MenuList
          text="My Startup"
          icon="lightbulb-on-outline"
          info={<Text style={{ color: colors.primary }}>Register now !</Text>}
        /> */}
        {/* <MenuList text="Favorites" icon="bookmark-outline" />
        <MenuList text="My Courses" icon="book-outline" />
        <MenuList text="Badge and Certificate" icon="trophy-variant-outline" /> */}

        <Divider />

        <Container mb={8}>
          <Text style={styles.sectionHeader}>General</Text>
        </Container>
        <MenuList text="Dashboard Tableau" icon="chart-box-outline" onPress={() =>
            navigation.navigate('Dashboard')}/>
        <MenuList text="Help Center" icon="help-circle-outline" onPress={() => Linking.openURL('mailto:aimee@alphabetincubator.id')}/>
        <MenuList text="About App" icon="alert-circle-outline" onPress={() =>
            navigation.navigate('AboutApp')}/>
        <MenuList
          text="Rate AIMEE App"
          icon="star-outline"
          info={<Text style={{ color: colors.disabled }}>v 2.0.0</Text>}
          onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.aimee')}
        />

        <Divider />

        <Button
          onPress={() => auth.logout()}
          mode="contained"
          style={[
            styles.logoutButton,
            {
              backgroundColor: colors.error,
            },
          ]}
        >
          Logout
        </Button>
      </ScrollView>

      {auth.loading && <Spinner visible />}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  sectionHeader: { fontSize: 16, fontWeight: 'bold' },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
