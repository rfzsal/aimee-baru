import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ToastAndroid,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { TextInput, Button, useTheme, Colors } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import SafeAreaView from '../../components/SafeAreaView';
import { useAuth } from '../../hooks/useAuth';
import Container from '../../layout/Container';

const Login = ({ navigation }) => {
  const { colors } = useTheme();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;

    const res = await auth.login(email, password);
    if (res?.error)
      ToastAndroid.show('Invalid username or password', ToastAndroid.SHORT);
  };

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
        <Container mt={64}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../../assets/aimee.png')}
            />
          </View>
        </Container>

        <Container mt={8}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.passwordInput}
          />

          <Button
            onPress={handleLogin}
            mode="contained"
            style={styles.loginButton}
          >
            Login
          </Button>

          <Text style={[styles.or, {textAlign: "center"}]}>or</Text>

          <Button
            mode="contained"
            style={styles.loginButton}
            onPress={auth.signIn}
          >
           <AntDesign name='google' size={17} color="white"/>  Login with Google
          </Button>
        </Container>

        <Container mt={24}>
          <Text
            style={[
              styles.textRegister,
              {
                color: Colors.grey600,
              },
            ]}
          >
            Don't have an account?
          </Text>
          <View style={styles.registerButton}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  styles.registerButtonText,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                Register Now!
              </Text>
            </TouchableOpacity>
          </View>
        </Container>

        <Container mt={5}>
          <View style={styles.registerButton}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  styles.registerButtonText,
                  {
                    color: "red",
                  },
                ]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>

      {auth.loading && <Spinner visible />}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  or : {marginTop: 10, marginBottom: 0, fontSize: 20},
  imageContainer: { flex: 1, alignItems: 'center' },
  image: { height: 100, resizeMode: 'contain', right: 1 },
  passwordInput: { marginTop: 8 },
  loginButton: { marginTop: 16},
  textRegister: { textAlign: 'center' },
  registerButton: { alignSelf: 'center' },
  registerButtonText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: 'center',
  },
});
