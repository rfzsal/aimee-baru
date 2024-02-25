import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Image, SafeAreaView} from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import Swiper from 'react-native-deck-swiper';;
import { db } from '../../../firebase';
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

const MatchingPage = ({ route, navigation }) => {
  const {
    matchName,
    matchprovinsi,
    matchsektorIndustri,
    matchModelBisnis,
    matchId,
  } = route.params;
  const { colors } = useTheme();
  const [startup, setStartup] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const swipeRef = useRef(null);
  const provinsi = new Map([
    ['Kalimantan Selatan', 0],
    ['Aceh', 1],
    ['Bali', 2],
    ['Banten', 3],
    ['Bengkulu', 4],
    ['DI Yogyakarta', 5],
    ['DKI Jakarta', 6],
    ['Gorontalo', 7],
    ['Jambi', 8],
    ['Jawa Barat', 9],
    ['Jawa Tengah', 10],
    ['Jawa Timur', 11],
    ['Kalimantan Barat', 12],
    ['Kalimantan Selatan', 13],
    ['Kalimantan Tengah', 14],
    ['Kalimantan Timur', 15],
    ['Kalimantan Utara', 16],
    ['Kepulauan Bangka Belitung', 17],
    ['Kepulauan Riau', 18],
    ['Lampung', 19],
    ['Maluku', 20],
    ['Maluku Utara', 21],
    ['Nusa Tenggara Barat', 22],
    ['Nusa Tenggara Timur', 23],
    ['Riau', 24],
    ['Sulawesi Barat', 25],
    ['Sulawesi Selatan', 26],
    ['Sulawesi Tengah', 27],
    ['Sulawesi Tenggara', 28],
    ['Sulawesi Utara', 29],
    ['Sumatera Selatan', 30],
    ['Sumatera Utara', 31]
]);
const industrySector = new Map([
    ['Agriculture', 0],
    ['Aquaculture', 1],
    ['Beauty', 2],
    ['Blockchain', 3],
    ['Consultant Services', 4],
    ['Digital Business Development', 5],
    ['EduTech', 6],
    ['Electronic', 7],
    ['Energy Distribution', 8],
    ['Farms', 9],
    ['Fashion', 10],
    ['Fisheries', 11],
    ['Food and Beverage', 12],
    ['Food Processing', 13],
    ['Graphic Design and Creative', 14],
    ['Green Technology', 15],
    ['Herbs', 16],
    ['Hospitality', 17],
    ['Internet', 18],
    ['Open Journal System', 19],
    ['Petshop', 20],
    ['Production', 21],
    ['Retail', 22],
    ['Services', 23],
    ['Sport and Music', 24],
    ['Technology and Information', 25],
    ['Textile', 26]
]);

  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, 'InvestorList', '3lPt5XZIAQO7Eohz8JVGlNpTr9o1');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dt = docSnap.data();
          fetch('https://aimee.pythonanywhere.com/api/' + provinsi.get(matchprovinsi) + '/' + industrySector.get(matchsektorIndustri))
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setStartup(data);
          })
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchDoc();
  }, []);

  const swipeLeftHandler = async (index) => {
    if(!startup[index]) return;

    const userSkipped = startup[index]
    console.log(`${matchName} skipped on ${userSkipped.name}`);

    setDoc(doc(db, 'users', matchId, "skipped", userSkipped.id), userSkipped)

  }

  const swipeRightHandler = async (index) => {
    if(!startup[index]) return;

    const userMatched = startup[index]
    console.log(`${matchName} matched with ${userMatched.name}`);

    setDoc(doc(db, 'users', matchId, "matched", userMatched.id), userMatched)

  }

    return (
      <>
        <Appbar.Header
          style={{
            backgroundColor: colors.surface,
          }}
        >
          <Appbar.Content title="Matchmaking" />
          <Appbar.Action icon="puzzle-check" size={30} onPress={() =>
            navigation.navigate('StartupMatch')}/>
        </Appbar.Header>
        <SafeAreaView style={styles.container}>
        <View style={styles.flex}>
          {errorMessage ? (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
          ) : (
            <Swiper ref={swipeRef}
            containerStyle={{backgroundColor: "transparent"}}
            cards={startup}
            renderCard={(card) => card ? (card&&
              <View key={card.id} style={styles.card}>
                <Image style={styles.image} source={{ uri: card.image }} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{card.name}</Text>
                  <Text style={styles.text}>{card.provinsi}</Text>
                  <Text style={styles.title}>Industry Sector</Text>
                  <Text style={styles.text}>{card.sektorIndustri}</Text>
                  <Text style={styles.title}>Business Model</Text>
                  <Text style={styles.text}>{card.modelBisnis}</Text>
                  <Text style={styles.title}>Required Funds</Text>
                  <Text style={styles.text}>{card.pendanaan}</Text>
                </View>
              </View>
            ) || null : (
              <View style={styles.card}>
                <Text style={styles.message}>No more Startup</Text>
              </View>
            )}
            backgroundColor={'#fff'}
            stackSize={5}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(index) => {
              console.log("Skip")
              swipeLeftHandler(index)
            }}
            onSwipedRight={(index)=> {
              console.log("Yeah")
              swipeRightHandler(index)
            }}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => swipeRef.current.swipeLeft()}>
            <AntDesign name='closecircleo' size={24} color="red"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => swipeRef.current.swipeRight()}>
            <AntDesign name='checkcircleo' size={24} color="green"/>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
        
      </>
)};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "40%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingBottom: 10,
  },
  message: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'lightgrey',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    marginTop: -20,
    marginBottom: -10,
  },
  flex: {
    flex: 1,
  },
  card: {
    position: 'relative',
    borderRadius: 20,
    borderWidth: 2,
    height: "90%",
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 3,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "white",
    marginVertical: 5,
  },
  text: {
    fontSize: 18,
    color: 'lightgrey',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: "#fff",
  },
  image: {
    position: 'absolute',
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
    top: 0,
  },
  errorMessage: {
    fontSize: 24,
    color: 'red',
  },
  errorMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MatchingPage;